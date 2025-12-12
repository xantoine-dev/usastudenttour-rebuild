const crypto = require('crypto');

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}');
    const required = ['name', 'email', 'destination', 'date', 'groupSize'];
    const missing = required.filter((f) => !payload[f]);
    if (missing.length) {
      return { statusCode: 400, body: JSON.stringify({ error: `Missing: ${missing.join(', ')}` }) };
    }

    const reference = `UST-${Date.now().toString(36)}-${crypto.randomBytes(2).toString('hex')}`.toUpperCase();

    // In production, save to DB and send email. Here we just echo back.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ok: true,
        reference,
        message: 'Reservation received. We will confirm availability and follow up by email.',
      }),
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }
};
