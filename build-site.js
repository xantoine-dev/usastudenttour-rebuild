const fs = require('fs');
const path = require('path');

const siteRoot = path.join(__dirname, 'site');
const assetSrc = path.join(__dirname, 'assets');
const assetDest = path.join(siteRoot, 'assets');

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Student Tours', href: '/student-tours-list/' },
  { label: 'Educational Tours', href: '/educational-tours/' },
  { label: 'Group Travel', href: '/student-group-travel-private-tours/' },
  { label: 'Vacation Packages', href: '/student-vacation-packages/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact-us/' },
  { label: 'Book Now', href: '/booking/' },
];

const palette = {
  blue: '#1f73b7',
  orange: '#f05a28',
  dark: '#1f2933',
  light: '#f6f8fb',
  border: '#d9e2ec',
};

const cityCards = [
  {
    title: 'New York',
    desc: 'Iconic skyline, day and overnight trips, hop-on hop-off passes, Harlem gospel tours.',
    href: '/student-tours-from-new-york/',
  },
  {
    title: 'Washington D.C.',
    desc: 'History and monuments, DC and Boston day trips, east-to-west coast packages.',
    href: '/student-tours-from-washington-dc/',
  },
  {
    title: 'San Francisco',
    desc: 'Bay views, Yosemite overnights, Silicon Valley, Highway 1 coastal drives.',
    href: '/student-tours-from-san-francisco/',
  },
  {
    title: 'Los Angeles',
    desc: 'Hollywood, Santa Monica, Southern California sunshine and studio tours.',
    href: '/student-tours-from-los-angeles/',
  },
  {
    title: 'Berkeley',
    desc: 'Summer student tours, Silicon Valley, factory outlets, California coast trips.',
    href: '/student-tours-from-berkeley/',
  },
  {
    title: 'Davis',
    desc: 'Guided overnights to Yosemite and Los Angeles, custom packages to NY/Hawaii.',
    href: '/student-tours-from-davis/',
  },
];

const blogPosts = [
  'An Interview with Tour Guide Rick Spear – San Francisco\'s Wine Country',
  'Big Island Action Great for Big, Big Fun',
  'Los Angeles Activity Tips from a Pasadena Native',
  'A Hawaiian Getaway – Free and Nearly Free Activities in Oahu and Maui',
  'Above the 86th Floor — The Empire State Building',
];

const pages = [
  {
    path: '/',
    title: 'USA Student Tour | Educational & Student Travel',
    description:
      'USA Student Tour specializes in educational tours and custom holiday packages for student, scholar, and executive groups across the U.S. and Canada.',
    hero: {
      title: 'Plan a student tour',
      subtitle:
        'Educational and fun trips for student, scholar, and executive groups — custom itineraries from coast to coast.',
      ctaText: 'Plan my trip',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        heading: 'Why travel with us',
        body:
          'For over 20 years, USA Student Tour (a California Tours company) has delivered educational programs, university campus tours, and custom student group travel across the United States and Canada with certified guides and safety-first planning.',
      },
      {
        type: 'cards',
        heading: 'Departures',
        body: 'Choose a departure city to see day trips, overnights, and private programs.',
        items: cityCards,
      },
      {
        type: 'pillars',
        items: [
          {
            title: 'Educational Tours',
            desc: 'University campus tours, music programs, tech and innovation, media and film.',
            href: '/educational-tours/',
          },
          {
            title: 'Group Travel',
            desc: 'Custom private tours for college and high school groups of 20+ with chaperones.',
            href: '/student-group-travel-private-tours/',
          },
          {
            title: 'Vacation Packages',
            desc: 'Fixed and custom packages to 30+ destinations — extra student/teacher savings.',
            href: '/student-vacation-packages/',
          },
        ],
      },
      {
        type: 'cta',
        heading: 'Need a custom quote?',
        body: 'Tell us your group size, dates, destinations, and interests — we will design an itinerary and budget that fits.',
        ctaText: 'Request a quote',
        ctaHref: '/contact-us/',
      },
    ],
  },
  {
    path: '/contact-us/',
    title: 'Contact Us | USA Student Tour',
    description:
      'Phone, email, and quote request form for USA Student Tour. Share group size, dates, background, and special requests.',
    hero: {
      title: 'Contact us',
      subtitle: 'Quote requests, custom itineraries, and support.',
      ctaText: 'Submit a request',
      ctaHref: '#quote-form',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'columns',
        heading: 'Get in touch',
        columns: [
          {
            title: 'Call or email',
            body: 'Toll Free: 877-338-3883\nPhone: 415-393-4211\nEmail: info@usastudenttour.com\n2560 Ninth Street, Suite 319B, Berkeley, CA 94710',
          },
          {
            title: 'Quote request',
            body: 'Include number of travelers, travel dates, group background, and any special requests.',
          },
        ],
      },
      {
        type: 'form',
        id: 'quote-form',
        heading: 'Email contact form',
        fields: [
          { label: 'Name', type: 'text', name: 'name', required: true },
          { label: 'Email', type: 'email', name: 'email', required: true },
          { label: 'Phone', type: 'tel', name: 'phone' },
          { label: 'Number of travelers', type: 'number', name: 'travelers' },
          { label: 'Travel dates', type: 'text', name: 'dates' },
          { label: 'Group background', type: 'textarea', name: 'background' },
          { label: 'Special requests', type: 'textarea', name: 'requests' },
        ],
        submit: 'Send request',
      },
    ],
  },
  {
    path: '/booking/',
    title: 'Booking | USA Student Tour',
    description: 'Access the California Tours booking engine.',
    hero: {
      title: 'Booking engine',
      subtitle: 'Secure booking powered by California Tours.',
      ctaText: 'Open booking',
      ctaHref: '#booking',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'embed',
        id: 'booking',
        heading: 'Start your booking',
        body: 'This placeholder represents the booking engine. Embed your booking widget or iframe here.',
      },
    ],
  },
  // City hub pages
  {
    path: '/student-tours-from-new-york/',
    title: 'New York Student Tours | USA Student Tour',
    description:
      'Student tours from New York: Brooklyn Bridge, Harlem gospel, Manhattan city tours, and east coast overnights.',
    hero: {
      title: 'New York student tours',
      subtitle:
        'Day trips and overnight experiences from New York: Brooklyn Bridge, Harlem gospel, Manhattan city, and more.',
      ctaText: 'See tours',
      ctaHref: '#tours',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'Famous for its towering skyscrapers, shopping districts, and food, New York is a lively departure city for students. Explore Brooklyn Bridge, Manhattan by helicopter, or quick trips to DC and Boston. Travel to San Francisco, Los Angeles, Las Vegas, and Hawaii with custom packages.',
      },
      { type: 'notice', body: 'No tours are currently scheduled. Please contact us to arrange your tour.' },
      {
        type: 'tour-cards',
        id: 'tours',
        heading: 'Sample tours from New York',
        items: [
          {
            title: '48 Hours Hop On Hop Off',
            blurb: 'Budget-friendly 2-day pass to see NYC at your pace with dozens of stops.',
            href: '/student-tours-from-new-york/new-york-48-hours-hop-on-hop-off-tour/',
          },
          {
            title: '72 Hours Hop On Hop Off',
            blurb: 'Three full days to explore NYC neighborhoods, museums, and landmarks.',
            href: '/student-tours-from-new-york/new-york-72-hours-hop-on-hop-off-tour/',
          },
          {
            title: 'Manhattan City Tour',
            blurb: 'Harbor cruise, lunch in Little Italy, and walking tours of Grant\'s Tomb, Wall Street, Rockefeller Center.',
            href: '/student-tours-from-new-york/manhattan-city-tour/',
          },
          {
            title: 'Brooklyn Bridge Tour',
            blurb: 'Guided walk across the bridge plus time in DUMBO for photos, shopping, and treats.',
            href: '/student-tours-from-new-york/brooklyn-bridge-tour/',
          },
          {
            title: 'Harlem Gospel Tour (Sundays)',
            blurb: 'Harlem neighborhood walk, Apollo Theater views, and authentic church service with gospel music.',
            href: '/student-tours-from-new-york/harlem-gospel-tour/',
          },
        ],
      },
    ],
  },
  {
    path: '/student-tours-from-washington-dc/',
    title: 'Washington D.C. Student Tours | USA Student Tour',
    description:
      'Student tours from Washington D.C.: monuments, DC and Boston day trips, east/west coast packages.',
    hero: {
      title: 'Washington D.C. student tours',
      subtitle:
        'Patriotic monuments, National Mall, cherry blossoms, plus packages to New York, Grand Canyon, Hollywood, Hawaii.',
      ctaText: 'Plan from DC',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'Washington D.C. is the heart of American politics and history. We plan day and overnight trips from DC, plus complete vacation packages to both coasts.',
      },
      { type: 'notice', body: 'No tours are currently scheduled. Please contact us to arrange your tour.' },
    ],
  },
  {
    path: '/student-tours-from-san-francisco/',
    title: 'Student Tours from San Francisco | USA Student Tour',
    description:
      'Day and overnight tours from San Francisco: Yosemite, Silicon Valley, Highway 1, Los Angeles, and more.',
    hero: {
      title: 'San Francisco student tours',
      subtitle: 'Golden Gate views, Yosemite overnights, Silicon Valley, and coast drives on Highway 1.',
      ctaText: 'Plan from SF',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'From the Golden Gate Bridge to Chinatown and the Haight, San Francisco is packed with sights. We offer day trips to Berkeley, Monterey, and Carmel, overnights to Los Angeles and Yosemite, plus independent packages to Las Vegas, Los Angeles, New York, and Hawaii.',
      },
    ],
  },
  {
    path: '/student-tours-from-los-angeles/',
    title: 'Los Angeles Student Tours | USA Student Tour',
    description: 'Hollywood, Santa Monica, and SoCal experiences for student groups.',
    hero: {
      title: 'Los Angeles student tours',
      subtitle: 'Hollywood, Santa Monica beach, and Southern California sunshine.',
      ctaText: 'Plan from LA',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'notice', body: 'We are rebuilding this page. Please contact us to plan Los Angeles departures.' },
    ],
  },
  {
    path: '/student-tours-from-berkeley/',
    title: 'Student Tours from Berkeley | USA Student Tour',
    description:
      'Summer student tours from Berkeley: Silicon Valley, outlets, Highway 1, Yosemite, Los Angeles, and more.',
    hero: {
      title: 'Berkeley student tours',
      subtitle: 'Day trips to Silicon Valley and coastal drives, overnights to Yosemite and Los Angeles.',
      ctaText: 'Plan from Berkeley',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'See Northern California with guided day trips to Silicon Valley, outlet shopping, and coastal Highway 1. Overnight options include Yosemite and Los Angeles. Custom packages available to New York, Hawaii, Las Vegas, or Los Angeles.',
      },
    ],
  },
  {
    path: '/student-tours-from-davis/',
    title: 'Student Tours from Davis | USA Student Tour',
    description:
      'Guided overnight student tours from Davis and Sacramento: Yosemite, Los Angeles, and custom packages.',
    hero: {
      title: 'Davis student tours',
      subtitle: 'Guided overnights to Yosemite and Los Angeles, plus custom vacations to New York, Hawaii, and Las Vegas.',
      ctaText: 'Plan from Davis',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'Join classmates on guided bus tours to Yosemite National Park and Los Angeles. Custom holiday packages available to New York, Hawaii, and Las Vegas/Grand Canyon.',
      },
    ],
  },
  {
    path: '/student-tours-from/',
    title: 'Student Tours From | USA Student Tour',
    description: 'Find student tours from your city: SF, LA, Davis, Berkeley, DC, New York.',
    hero: {
      title: 'Student tours from your city',
      subtitle: 'Browse departures from San Francisco, Los Angeles, Davis, Berkeley, Washington D.C., and New York.',
      ctaText: 'Browse all cities',
      ctaHref: '/student-tours-list/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'cards', heading: 'Cities', items: cityCards },
    ],
  },
  {
    path: '/student-tours-list/',
    title: 'Student Tours List | USA Student Tour',
    description: 'All student tour departure cities with quick links to book.',
    hero: {
      title: 'Student tours list',
      subtitle: 'Pick a city to see available day and overnight programs.',
      ctaText: 'Choose a city',
      ctaHref: '#cities',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'cards', id: 'cities', items: cityCards },
    ],
  },
  {
    path: '/educational-tours/',
    title: 'Educational Tours | USA Student Tour',
    description:
      'Educational tour programs for domestic and international student groups: campus tours, science, technology, business, media, and more.',
    hero: {
      title: 'Educational tours',
      subtitle: 'Interactive programs designed for learning, culture, and fun.',
      ctaText: 'Plan an educational tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'For over 20 years, USA Student Tour has led educational tours with certified guides. Accommodations, transportation, sightseeing, meals, and specialty activities are arranged with safety, budget, and learning goals in mind.',
      },
      {
        type: 'list',
        heading: 'Program focus areas',
        items: [
          'University campus tours',
          'Music programs',
          'Technology and innovation',
          'Media, film, and broadcasting',
          'Science, golf, and specialty interests',
        ],
      },
    ],
  },
  {
    path: '/student-group-travel-private-tours/',
    title: 'Student Group Travel Private Tours | USA Student Tour',
    description:
      'Custom private tours for college and high school student groups of 20+ with dedicated program managers and certified guides.',
    hero: {
      title: 'Private group travel',
      subtitle: 'Custom itineraries for student groups of 20+ with chaperones.',
      ctaText: 'Design my group tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'We design custom programs for college and high school groups across the U.S. and Canada. A dedicated program manager partners with you to meet objectives, budget, and safety requirements.',
      },
      {
        type: 'list',
        heading: 'What you get',
        items: [
          'Custom itineraries and logistics',
          'Certified, experienced tour directors',
          'Options from major U.S. and Canadian cities',
          'Support for education leaders and chaperones',
        ],
      },
    ],
  },
  {
    path: '/student-vacation-packages/',
    title: 'Student Vacation Packages | USA Student Tour',
    description:
      'Fixed and custom student vacation packages across 30+ North American destinations; discounts for students and teachers.',
    hero: {
      title: 'Student vacation packages',
      subtitle: 'See 30+ North American destinations with fixed or customized packages.',
      ctaText: 'Browse packages',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'Explore the USA and Canada with student-friendly vacation packages. Fixed departures with the flexibility to customize — see the sights, sample the food and culture, and make lasting memories.',
      },
      {
        type: 'list',
        heading: 'Popular focuses',
        items: ['New York', 'California', 'San Francisco', 'Los Angeles', 'National Parks'],
      },
    ],
  },
  {
    path: '/usa-vacation-packages/',
    title: 'USA Vacation Packages | USA Student Tour',
    description:
      'USA Vacation by California Tours: 30+ destinations with fixed departures and custom options; student/teacher discounts available.',
    hero: {
      title: 'USA vacation packages',
      subtitle: 'Guided packages to 30+ destinations with optional customization.',
      ctaText: 'Request package info',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'USA Vacation by California Tours offers fixed departures and customizable packages to over thirty destinations. Student, teacher, and university administrator travelers receive an 8% discount on mainland USA packages. Napa and Las Vegas packages require travelers to be 21+.',
      },
    ],
  },
  {
    path: '/student-tour-reviews/',
    title: 'Student Tour Reviews | USA Student Tour',
    description: 'What travelers say about USA Student Tour.',
    hero: {
      title: 'Student tour reviews',
      subtitle: 'Feedback from student groups and educators.',
      ctaText: 'Share your review',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'lede', body: 'Reviews will be featured here. Submit yours via the contact form.' },
    ],
  },
  {
    path: '/blog/',
    title: 'USA Student Tour Blog',
    description: 'Travel stories, tips, and interviews from USA Student Tour.',
    hero: {
      title: 'USA Student Tour Blog',
      subtitle: 'Explore… your journey starts here.',
      ctaText: 'Read articles',
      ctaHref: '#posts',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'posts', id: 'posts', posts: blogPosts },
    ],
  },
  {
    path: '/about-us/',
    title: 'About Us | USA Student Tour',
    description:
      'USA Student Tour is a California Tours company and full-service destination management company for student travelers.',
    hero: {
      title: 'About USA Student Tour',
      subtitle: 'A California Tours company providing student travel across the U.S. and Canada.',
      ctaText: 'Contact the team',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      {
        type: 'lede',
        body:
          'USA Student Tour is a full-service destination management company and tour operator. We provide cost-effective services from major cities in the United States and Canada for business, leisure, and student travelers.',
      },
    ],
  },
  // Tour detail pages
  {
    path: '/student-tours-from-new-york/new-york-48-hours-hop-on-hop-off-tour/',
    title: '48 Hours Hop On Hop Off Tour | New York',
    description: 'Budget-friendly 2-day Hop On Hop Off tour of New York City for students.',
    hero: {
      title: '48 Hours Hop On Hop Off',
      subtitle: 'See NYC at your own pace with a 2-day pass and dozens of stops.',
      ctaText: 'Request this tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'lede', body: 'Explore New York City on a budget with a two-day hop-on hop-off pass. Get off at any stop to eat, shop, and explore before hopping back on.' },
      { type: 'list', heading: 'Highlights', items: ['2-day all-loops pass', 'Flexibility to explore at your pace', 'Budget-friendly for students'] },
    ],
  },
  {
    path: '/student-tours-from-new-york/new-york-72-hours-hop-on-hop-off-tour/',
    title: '72 Hours Hop On Hop Off Tour | New York',
    description: 'Three-day Hop On Hop Off tour of New York City for students.',
    hero: {
      title: '72 Hours Hop On Hop Off',
      subtitle: 'Three full days to experience New York neighborhoods and landmarks.',
      ctaText: 'Request this tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'lede', body: 'Enjoy three days of hop-on hop-off access around New York City. Stop for food, shopping, museums, and landmarks at your own pace.' },
      { type: 'list', heading: 'Highlights', items: ['3-day all-loops pass', 'Flexible stops across NYC', 'Great for first-time visitors'] },
    ],
  },
  {
    path: '/student-tours-from-new-york/manhattan-city-tour/',
    title: 'Manhattan City Tour | New York',
    description: 'Guided Manhattan city tour with harbor cruise, Little Italy lunch, and walking tours.',
    hero: {
      title: 'Manhattan City Tour',
      subtitle: 'Harbor cruise, Little Italy lunch, and walking tours of Manhattan icons.',
      ctaText: 'Request this tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'lede', body: 'Take an in-depth tour of Manhattan with a harbor cruise, lunch in Little Italy, and walking tours of Grant\'s Tomb, Wall Street, and Rockefeller Center.' },
      { type: 'list', heading: 'Includes', items: ['Guided Manhattan tour', 'Harbor cruise', 'Little Italy lunch'] },
      { type: 'list', heading: 'From', items: ['$95 per student'] },
    ],
  },
  {
    path: '/student-tours-from-new-york/brooklyn-bridge-tour/',
    title: 'Brooklyn Bridge Tour | New York',
    description: 'Guided walking tour across the Brooklyn Bridge with time in DUMBO.',
    hero: {
      title: 'Brooklyn Bridge Tour',
      subtitle: 'Guided walk across the bridge plus time to explore DUMBO.',
      ctaText: 'Request this tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'lede', body: 'Walk the Brooklyn Bridge with a guide, learn its history, and explore DUMBO with time for photos, shopping, and dessert stops.' },
      { type: 'list', heading: 'Includes', items: ['Guided bridge walk', 'DUMBO exploration time'] },
    ],
  },
  {
    path: '/student-tours-from-new-york/harlem-gospel-tour/',
    title: 'Harlem Gospel Tour (Sundays) | New York',
    description: 'Sunday Harlem neighborhood tour plus authentic church service with gospel music.',
    hero: {
      title: 'Harlem Gospel Tour – Sundays',
      subtitle: 'Harlem neighborhood walk and authentic gospel church service.',
      ctaText: 'Request this tour',
      ctaHref: '/contact-us/',
      image: '/assets/images/homegrid.png',
    },
    sections: [
      { type: 'lede', body: 'Tour Harlem landmarks including 125th Street and Apollo Theater, then attend a local church service to experience gospel music firsthand.' },
      { type: 'list', heading: 'Includes', items: ['Harlem neighborhood tour', 'Sunday gospel church service'] },
    ],
  },
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function rel(pathname) {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function renderSection(section) {
  switch (section.type) {
    case 'lede':
      return `<section class="section lede"><p>${section.body}</p></section>`;
    case 'notice':
      return `<section class="section notice"><p>${section.body}</p></section>`;
    case 'cards': {
      const items = (section.items || []).map(
        (item) => `
          <article class="card">
            <h3>${item.title}</h3>
            ${item.desc ? `<p>${item.desc}</p>` : ''}
            ${item.href ? `<a class="link" href="${item.href}">View details</a>` : ''}
          </article>`
      );
      return `<section class="section cards" ${section.id ? `id="${section.id}"` : ''}>
        ${section.heading ? `<div class="section-header"><h2>${section.heading}</h2>${section.body ? `<p>${section.body}</p>` : ''}</div>` : ''}
        <div class="card-grid">${items.join('\n')}</div>
      </section>`;
    }
    case 'pillars': {
      const items = (section.items || []).map(
        (item) => `
          <article class="card pillar">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a class="link" href="${item.href}">Learn more</a>
          </article>`
      );
      return `<section class="section cards">
        <div class="card-grid pillars">${items.join('\n')}</div>
      </section>`;
    }
    case 'cta':
      return `<section class="section cta">
        <div class="cta-inner">
          <div>
            <h2>${section.heading}</h2>
            <p>${section.body}</p>
          </div>
          <a class="button" href="${section.ctaHref}">${section.ctaText}</a>
        </div>
      </section>`;
    case 'columns': {
      const cols = section.columns
        .map(
          (col) => `
            <div class="column">
              <h3>${col.title}</h3>
              <p>${(col.body || '').replace(/\n/g, '<br>')}</p>
            </div>`
        )
        .join('\n');
      return `<section class="section columns">
        <h2>${section.heading}</h2>
        <div class="column-grid">${cols}</div>
      </section>`;
    }
    case 'form': {
      const fields = section.fields
        .map((f) => {
          if (f.type === 'textarea') {
            return `<label>${f.label}<textarea name="${f.name}" ${f.required ? 'required' : ''}></textarea></label>`;
          }
          return `<label>${f.label}<input type="${f.type}" name="${f.name}" ${f.required ? 'required' : ''}></label>`;
        })
        .join('\n');
      return `<section class="section form" id="${section.id || ''}">
        <h2>${section.heading}</h2>
        <form>
          ${fields}
          <button type="submit">${section.submit || 'Submit'}</button>
        </form>
      </section>`;
    }
    case 'embed':
      return `<section class="section embed" id="${section.id || ''}">
        <h2>${section.heading}</h2>
        <div class="embed-box">${section.body}</div>
      </section>`;
    case 'list': {
      const items = (section.items || []).map((item) => `<li>${item}</li>`).join('');
      return `<section class="section list">
        <h2>${section.heading}</h2>
        <ul>${items}</ul>
      </section>`;
    }
    case 'tour-cards': {
      const items = (section.items || []).map(
        (item) => `
          <article class="card">
            <h3>${item.title}</h3>
            <p>${item.blurb || ''}</p>
            <a class="link" href="${item.href}">View tour</a>
          </article>`
      );
      return `<section class="section cards" ${section.id ? `id="${section.id}"` : ''}>
        <div class="section-header"><h2>${section.heading || 'Tours'}</h2></div>
        <div class="card-grid">${items.join('\n')}</div>
      </section>`;
    }
    case 'posts': {
      const posts = (section.posts || []).map((p) => `<li>${p}</li>`).join('');
      return `<section class="section list" ${section.id ? `id="${section.id}"` : ''}>
        <h2>Latest posts</h2>
        <ul>${posts}</ul>
      </section>`;
    }
    default:
      return '';
  }
}

function renderPage(page) {
  const hero = page.hero || {};
  const heroStyle = hero.image ? `style="background-image: linear-gradient(90deg, rgba(31,115,183,0.78), rgba(31,115,183,0.55)), url('${hero.image}');"` : '';

  const sectionsHtml = (page.sections || []).map(renderSection).join('\n');

  const mobileScript = `
    <script>
      (() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const toggle = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.site-header nav ul');
        const sync = () => {
          document.body.classList.toggle('is-mobile', mq.matches);
          if (!mq.matches) document.body.classList.remove('nav-open');
        };
        mq.addEventListener('change', sync);
        sync();
        if (toggle && nav) {
          toggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
          });
        }
      })();
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title}</title>
  ${page.description ? `<meta name="description" content="${page.description}">` : ''}
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="logo">
      <a href="/"><img src="/assets/images/usa_st_logo_horiz.png" alt="USA Student Tour"></a>
    </div>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav aria-label="Primary">
      <ul id="primary-nav">
        ${navLinks.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
      </ul>
    </nav>
    <a class="book-now" href="/booking/"><img src="/assets/images/booknow.png" alt="Book Now"></a>
  </header>

  <section class="hero" ${heroStyle}>
    <div class="hero-content">
      <p class="eyebrow">USA Student Tour</p>
      <h1>${hero.title || ''}</h1>
      <p class="subtitle">${hero.subtitle || ''}</p>
      ${hero.ctaText ? `<a class="button" href="${hero.ctaHref || '#'}">${hero.ctaText}</a>` : ''}
    </div>
  </section>

  <main class="page">
    ${sectionsHtml}
  </main>

  <footer class="site-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="/assets/images/usa_st_logo_horiz.png" alt="USA Student Tour" />
        <p>California Tours company · California Seller of Travel #2065568-40-163</p>
      </div>
      <div class="footer-links">
        <a href="/student-tour-reviews/">Tour Reviews</a>
        <a href="/blog/">Blog</a>
        <a href="/about-us/">About Us</a>
      </div>
      <div class="footer-social">
        <img src="/assets/images/socialicons.png" alt="Social icons" />
      </div>
      <div class="footer-seals">
        <img src="/assets/images/trustwave.png" alt="Trusted Commerce" />
        <img src="/assets/images/godaddy.gif" alt="SSL Secure" />
      </div>
    </div>
    <p class="footer-copy">© ${new Date().getFullYear()} USA Student Tour · All rights reserved.</p>
  </footer>
  ${mobileScript}
</body>
</html>`;
}

function build() {
  ensureDir(siteRoot);
  pages.forEach((page) => {
    const outPath = path.join(siteRoot, page.path === '/' ? 'index.html' : path.join(page.path, 'index.html'));
    ensureDir(path.dirname(outPath));
    const html = renderPage(page);
    fs.writeFileSync(outPath, html);
    console.log('wrote', outPath);
  });

  // copy assets into the site root so they serve at /assets/...
  ensureDir(assetDest);
  fs.cpSync(assetSrc, assetDest, { recursive: true });
  // create a simple favicon to avoid 404s
  const faviconSrc = path.join(assetSrc, 'images', 'usa_st_logo_horiz.png');
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, path.join(siteRoot, 'favicon.ico'));
  }
  console.log('copied assets to', assetDest);
}

build();
