const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

// Execute the shipped inline script. Only DOM, storage, timers and HTTP are
// controlled here; no quote-state implementation is duplicated in the tests.
function loadPage(filename = 'booking.html', storage) {
  const html = readFileSync(join(__dirname, '../public', filename), 'utf8');
  const elements = {};
  for (const match of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)) {
    const tag = match[0];
    const classes = new Set((tag.match(/class="([^"]*)"/)?.[1] || '').split(/\s+/));
    const el = new EventTarget();
    Object.assign(el, {
      value: tag.match(/\bvalue="([^"]*)"/)?.[1] || '',
      disabled: /\sdisabled(?:\s|>)/.test(tag),
      innerHTML: '', innerText: '', textContent: '',
      classList: {
        add: (...names) => names.forEach((name) => classes.add(name)),
        remove: (...names) => names.forEach((name) => classes.delete(name)),
        contains: (name) => classes.has(name),
        toggle(name, force) {
          const add = force === undefined ? !classes.has(name) : force;
          if (add) classes.add(name); else classes.delete(name);
          return add;
        },
      },
    });
    elements[match[1]] = el;
  }
  if (elements.destination) elements.destination.value = 'yosemite';
  const makeStorage = () => {
    const data = new Map();
    return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)) };
  };
  const sessionStorage = storage?.sessionStorage || makeStorage();
  const localStorage = storage?.localStorage || makeStorage();
  const requests = [];
  const timers = [];
  const context = vm.createContext({
    document: { getElementById: (id) => { assert.ok(elements[id], `Missing DOM element: ${id}`); return elements[id]; } },
    name: elements.name, email: elements.email,
    window: { location: { href: '' } }, sessionStorage, localStorage,
    setTimeout: (callback) => timers.push(callback),
    fetch: (url, options) => new Promise((resolve, reject) => {
      requests.push({
        url, options, payload: JSON.parse(options.body),
        respond(data, ok = true) { resolve({ ok, json: async () => data }); },
        reject,
      });
    }),
  });
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  for (const script of scripts) if (script[1].trim()) vm.runInContext(script[1], context, { filename });
  return {
    elements, requests, sessionStorage, localStorage, context,
    edit(id, value, event = 'input') { elements[id].value = value; elements[id].dispatchEvent(new Event(event)); },
    check: () => vm.runInContext('checkAvailability()', context),
    submit: () => vm.runInContext('submitBooking()', context),
    runTimers: () => timers.forEach((callback) => callback()),
  };
}

const available = (price = 180) => ({ available: true, pricePerPerson: price, remainingSeats: 42, currency: 'USD', note: null });
function bookingPage() {
  const page = loadPage();
  page.edit('date', '2026-12-01');
  page.edit('name', 'Demo Guest');
  page.edit('email', 'demo@example.test');
  return page;
}
async function acceptQuote(page, price = 180) {
  const pending = page.check();
  page.requests.at(-1).respond(available(price));
  await pending;
}

test('check button uses the availability endpoint and enables a current quote', async () => {
  const page = bookingPage();
  assert.equal(page.elements.submitBtn.disabled, true);
  page.elements.checkBtn.dispatchEvent(new Event('click', { cancelable: true }));
  assert.equal(page.requests[0].url, '/.netlify/functions/availability');
  assert.equal(page.requests[0].options.method, 'POST');
  assert.deepEqual(page.requests[0].payload, { destination: 'yosemite', date: '2026-12-01', groupSize: 8 });
  page.requests[0].respond(available());
  await new Promise(setImmediate);
  assert.equal(page.elements.submitBtn.disabled, false);
  assert.match(page.elements.availability.innerHTML, /\$180/);
});

// Missing itinerary invalidation would leave Confirm enabled with a stale price.
for (const [field, value] of [['destination', 'lasvegas'], ['date', '2026-12-02'], ['groupSize', '30']]) {
  for (const event of ['input', 'change']) {
    test(`${field} ${event} invalidates the quote until a fresh check`, async () => {
      const page = bookingPage();
      await acceptQuote(page);
      page.edit(field, value, event);
      assert.equal(page.elements.submitBtn.disabled, true);
      assert.equal(page.elements.availability.classList.contains('hidden'), true);
      assert.equal(page.elements['step-availability'].classList.contains('active'), false);
      await acceptQuote(page, 144);
      assert.equal(page.elements.submitBtn.disabled, false);
      assert.match(page.elements.availability.innerHTML, /\$144/);
    });
  }
}

test('guest and contact edits preserve a valid itinerary quote and guest validation', async () => {
  const page = bookingPage();
  await acceptQuote(page);
  for (const [field, value] of [['name', 'Other Guest'], ['email', 'other@example.test'], ['phone', '555-0100'], ['school', 'Demo School'], ['notes', 'Synthetic note']]) {
    page.edit(field, value);
    assert.equal(page.elements.submitBtn.disabled, false);
  }
  page.edit('name', '');
  assert.equal(page.elements.submitBtn.disabled, true);
  await page.submit();
  assert.match(page.elements.confirmation.innerText, /required/i);
  assert.equal(page.requests.length, 1);
  page.edit('name', 'Other Guest');
  assert.equal(page.elements.submitBtn.disabled, false);
});

test('normalized group size still matches its accepted numeric quote', async () => {
  const page = bookingPage();
  await acceptQuote(page);
  page.elements.groupSize.value = '08'; // no event: same normalized itinerary
  const submitted = page.submit();
  assert.equal(page.requests.at(-1).url, '/.netlify/functions/submitBooking');
  page.requests.at(-1).respond({ ok: true, reference: 'DEMO-NORMALIZED', message: 'Demo confirmed' });
  await submitted;
});

test('editing a pending itinerary cannot accept its obsolete success', async () => {
  const page = bookingPage();
  const pending = page.check();
  page.edit('destination', 'lasvegas');
  page.requests[0].respond(available());
  await pending;
  assert.equal(page.elements.submitBtn.disabled, true);
  assert.equal(page.elements.availability.classList.contains('hidden'), true);
});

test('changing away and back cannot revive an obsolete response', async () => {
  const page = bookingPage();
  const pending = page.check();
  page.edit('groupSize', '30');
  page.edit('groupSize', '8');
  page.requests[0].respond(available());
  await pending;
  assert.equal(page.elements.submitBtn.disabled, true);
  assert.equal(page.elements.availability.classList.contains('hidden'), true);
});

// Generation identity must protect both display and button state, even when
// two requests have identical inputs or the older failure is a network error.
for (const outcome of ['success', 'unavailable', 'http-error', 'network-error', 'json-error']) {
  test(`older ${outcome} cannot replace a newer successful quote`, async () => {
    const page = bookingPage();
    const older = page.check();
    // Attach immediately so the baseline rejection is observed by this test.
    const observedOlder = older.catch((error) => error);
    await acceptQuote(page, 144);
    if (outcome === 'success') page.requests[0].respond(available(180));
    if (outcome === 'unavailable') page.requests[0].respond({ available: false });
    if (outcome === 'http-error') page.requests[0].respond({ error: 'Synthetic HTTP failure' }, false);
    if (outcome === 'network-error') page.requests[0].reject(new Error('Synthetic network failure'));
    if (outcome === 'json-error') page.requests[0].respond(Promise.reject(new Error('Synthetic JSON failure')));
    const result = await observedOlder;
    assert.equal(result, undefined, 'stale failures must be handled');
    assert.equal(page.elements.submitBtn.disabled, false);
    assert.match(page.elements.availability.innerHTML, /\$144/);
    assert.doesNotMatch(page.elements.availability.innerHTML, /\$180|Not available/);
  });
}

test('obsolete success cannot replace the latest unavailable result', async () => {
  const page = bookingPage();
  const older = page.check();
  const newer = page.check();
  page.requests[1].respond({ available: false });
  await newer;
  page.requests[0].respond(available());
  await older;
  assert.equal(page.elements.submitBtn.disabled, true);
  assert.match(page.elements.availability.innerHTML, /Not available/);
});

test('older completion leaves the latest request loading until it resolves', async () => {
  const page = bookingPage();
  const older = page.check();
  const newer = page.check();
  page.requests[0].respond(available());
  await older;
  assert.equal(page.elements.submitBtn.disabled, true);
  assert.equal(page.elements.availability.classList.contains('hidden'), false);
  assert.match(page.elements.availability.innerHTML, /checking/i);
  page.requests[1].respond(available(144));
  await newer;
  assert.match(page.elements.availability.innerHTML, /\$144/);
});

for (const failure of ['network', 'json']) {
  test(`latest ${failure} failure clears loading, keeps Confirm disabled, and allows retry`, async () => {
    const page = bookingPage();
    const pending = page.check();
    if (failure === 'network') page.requests[0].reject(new Error('Synthetic network failure'));
    else page.requests[0].respond(Promise.reject(new Error('Synthetic JSON failure')));
    await assert.doesNotReject(pending);
    assert.equal(page.elements.submitBtn.disabled, true);
    assert.equal(page.elements.availability.classList.contains('hidden'), false);
    assert.match(page.elements.availability.innerHTML, /try again/i);
    assert.doesNotMatch(page.elements.availability.innerHTML, /checking/i);
    await acceptQuote(page);
    assert.equal(page.elements.submitBtn.disabled, false);
  });
}

for (const [field, value] of [['destination', 'lasvegas'], ['date', '2026-12-02'], ['groupSize', '30']]) {
  test(`submit guard rejects stale ${field} even without an edit event`, async () => {
    const page = bookingPage();
    await acceptQuote(page);
    page.elements[field].value = value;
    // The old implementation incorrectly starts a booking request. Resolve it
    // so this regression reports an assertion failure rather than hanging.
    const submitted = page.submit();
    if (page.requests.length > 1) page.requests[1].respond({ ok: true, reference: 'DEMO-STALE', message: 'Demo confirmed' });
    await submitted;
    assert.equal(page.requests.length, 1, 'stale itinerary must not reach submitBooking');
    assert.equal(page.elements.submitBtn.disabled, true);
    assert.match(page.elements.confirmation.innerText, /availability/i);
  });
}

test('persisted confirmation keeps the quote accepted at submission across later edits/checks', async () => {
  const page = bookingPage();
  await acceptQuote(page);
  page.edit('destination', 'lasvegas');
  page.edit('groupSize', '30');
  await acceptQuote(page, 144);
  const submitted = page.submit();
  assert.equal(page.requests[2].url, '/.netlify/functions/submitBooking');
  assert.deepEqual(page.requests[2].payload, {
    name: 'Demo Guest', email: 'demo@example.test', phone: '', school: '', notes: '',
    destination: 'lasvegas', date: '2026-12-01', groupSize: 30,
  });
  page.edit('destination', 'yosemite');
  await acceptQuote(page, 180);
  page.requests[2].respond({ ok: true, reference: 'DEMO-CURRENT', message: 'Demo confirmed' });
  await submitted;
  const expected = {
    reference: 'DEMO-CURRENT', destination: 'lasvegas', date: '2026-12-01',
    groupSize: 30, email: 'demo@example.test', name: 'Demo Guest', pricePerPerson: 144,
  };
  assert.deepEqual(JSON.parse(page.sessionStorage.getItem('demoBooking')), expected);
  assert.deepEqual(JSON.parse(page.localStorage.getItem('demoBookings')), [expected]);
  page.runTimers();
  assert.equal(page.context.window.location.href, '/confirm.html');
  const confirmation = loadPage('confirm.html', page);
  assert.equal(confirmation.elements.refText.textContent, 'Reference: DEMO-CURRENT');
  assert.equal(confirmation.elements.dest.textContent, 'lasvegas');
  assert.equal(confirmation.elements.dateVal.textContent, '2026-12-01');
  assert.equal(confirmation.elements.group.textContent, 30);
  assert.equal(confirmation.elements.emailVal.textContent, 'demo@example.test');
});
