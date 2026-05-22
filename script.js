console.log("JS is running");

/**
 * DON DON DONKI RESEARCH — script.js
 */

/* 1. FADE-IN ON SCROLL */
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
fadeElements.forEach(el => fadeObserver.observe(el));

/* 2. NAVBAR — active link & mobile toggle */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = 'var(--yellow)';
  });
  // Progress bar
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* 3. PROGRESS BAR */
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position:fixed;top:60px;left:0;height:3px;background:var(--yellow);z-index:999;transition:width 0.1s linear;width:0%;pointer-events:none;';
document.body.appendChild(progressBar);

/* ============================================================
   STORE FLOORPLAN — zone data & slide panel
   ============================================================ */

const fpZoneData = {
  entrance: {
    badge: '🚪 Zone 1 — Entrance',
    img: 'images/entrance.jpg',
    caption: 'Store entrance, [Your Store Name / Location]',
    title: 'First Impressions & Foreign Market Entry',
    body: `
      <p>When customers first see a Donki store, the signs and displays are designed to grab attention. Bright colours, bold phrases like “survival price” to signal very cheap deals, and visible products such as fruits and vegetables create an immediate sense of value and excitement. This is done on purpose to show that the store offers low prices and a different shopping experience from typical retailers.
When Donki enters a new market, these first impressions are important. In Singapore, this style matched well with customers who enjoy new and visually appealing shopping experiences. In Malaysia, however, the same approach received mixed reactions, as some customers found it exciting while others found it confusing or overwhelming.
These early signals also show who the store is targeting. The language used, types of promotions, and products placed at the front all matter, and in Malaysia, these were not always adjusted well to local preferences.</p>
    `,
    compare: {
      sg: { verdict: 'success', text: 'Yellow signage and jingle became iconic. Social media shareability drove footfall before stores even opened.' },
      my: { verdict: 'fail',    text: 'Signage and branding remained largely Japan-centric, missing an opportunity to signal cultural inclusion to Malaysian shoppers.' }
    }
  },
  food: {
    badge: '🍱 Zone 2 — Food Hall',
    img: 'images/food-hall.jpg',
    caption: 'Food Hall & Dining Area — Don Don Donki',
    title: 'The Food Hall: Japan on a Plate',
    body: `
      <p>The food hall is a central part of the Don Don Donki experience. It offers fresh Japanese produce, ready-to-eat meals, specialty snacks, and imported drinks, creating a strong “Japan-like” atmosphere. For many customers, this section is the main reason they visit and return.
In Singapore, the food hall became a popular destination where people could try Japanese-style convenience meals and buy imported products not found in regular supermarkets. The experience stayed interesting because the products were regularly updated.
In Malaysia, the food hall faced a major issue due to limited halal certification. Since about 63% of the population is Muslim, the lack of widely available halal options made it difficult for the store to attract a broad customer base.</p>
    `,
    compare: {
      sg: { verdict: 'success', text: 'Dedicated halal sections and Japanese ready-meals drove strong repeat visits. Food hall became a social experience, not just a grocery run.' },
      my: { verdict: 'fail',    text: 'Insufficient halal certification excluded the majority Muslim demographic from the most engaging part of the store. A significant structural failure.' }
    }
  },
  snacks: {
    badge: '🍫 Zone 3 — Snacks & Imports',
    img: 'images/snacks.jpg',
    caption: 'Japanese Snack & Import Aisle — Don Don Donki',
    title: 'Japanese Snacks: The Impulse Engine',
    body: `
      <p>The snack and import aisle is designed to encourage quick, unplanned purchases. Shelves are packed with Japanese products like Hokkaido rolls, mochi waffles, and cream daifuku, many of which are not commonly found in local supermarkets. This creates a sense of discovery, where customers feel like they might find something new each time they visit.
The way products are displayed is very dense, with items stacked closely together and surrounded by bold price tags and signs. Instead of looking messy, this makes the section feel exciting and draws attention to the products.
This area also shows why customers are willing to spend more on Japanese snacks. Many people are attracted to the unique flavours and authentic feel, but this interest can vary depending on the country and local preferences.</p>
    `,
    compare: {
      sg: { verdict: 'success', text: 'Japanese snack imports became a key driver of basket size. Customers bought familiar items and explored new ones — the discovery loop worked perfectly.' },
      my: { verdict: 'fail',    text: 'Pricing of imported snacks felt unjustified relative to local alternatives. The "Japan premium" was harder to sell in a more price-sensitive market.' }
    }
  },
  signage: {
    badge: '📢 Zone 4 — Layout & Signage',
    img: 'images/signage.jpg',
    caption: 'Store Layout and In-Store Signage — Don Don Donki',
    title: 'Controlled Chaos: The Layout Strategy',
    body: `
      <p>Donki’s store layout is very different from typical supermarkets. Instead of neat and organised aisles, products are packed closely together, shelves are stacked high, and signs are placed everywhere. Bright, handwritten-style signs like "Soft Bites” and phrases such as “soft, fluffy and moist” are used to grab attention and make products stand out.
This layout is designed to keep customers in the store longer and encourage them to explore. As people move through the aisles, they are more likely to notice unexpected items and make extra purchases.
However, this approach does not work the same everywhere. In places like Japan and Singapore, customers enjoy this busy and exciting style. In Malaysia, some shoppers prefer clearer and more organised layouts, so this style can feel confusing or overwhelming.</p>
`,
    compare: {
      sg: { verdict: 'success', text: 'The chaotic layout became a brand feature. "You never know what you\'ll find" became a genuine reason to return. Extended dwell times translated into higher basket values.' },
      my: { verdict: 'fail',    text: 'The same layout was perceived as disorganised and hard to navigate. Without cultural context for the format, it read as poor design rather than deliberate strategy.' }
    }
  },
  cosmetics: {
    badge: '💄 Zone 5 — Cosmetics & Lifestyle',
    img: 'images/cosmetics.jpg',
    caption: 'Cosmetics & Lifestyle Section — Don Don Donki',
    title: 'Japanese Beauty: A Cross-Border Winner',
    body: `
      <p>The cosmetics and lifestyle section is one of Donki’s strongest advantages across different countries. Japanese beauty products such as skincare, makeup, haircare, and personal hygiene items have a strong global reputation, and Donki offers them at competitive prices compared to department stores and specialty beauty shops.

These products are often cheaper and more convenient to purchase than buying them directly in Japan, since customers can access a similar range without the costs and effort of travelling. This makes Donki an attractive option for people who want Japanese beauty products but cannot easily source them from Japan itself.

This section usually performs well in many markets because demand for Japanese beauty products is less affected by cultural differences than food.

However, local preferences still matter. Factors such as shade ranges, formulas suited to different skin tones, and products that match local beauty standards all influence how well this section appeals to customers outside Japan.</p>
    `,
    compare: {
      sg: { verdict: 'success', text: 'Japanese cosmetics were a top-performing category. Strong pre-existing demand for J-beauty brands, combined with competitive pricing, drove high conversion in this section.' },
      my: { verdict: 'fail',    text: 'While cosmetics performed relatively better than food, limited product range diversity and the absence of shades suited to Malaysian skin tones reduced the section\'s full potential.' }
    }
  },
  checkout: {
    badge: '🏷️ Zone 6 — Checkout & Pricing',
    img: 'images/checkout.jpg',
    caption: 'Checkout Area & Price Tags — Don Don Donki',
    title: 'The Moment of Truth: Price Perception',
    body: `
      <p>The checkout experience is where Donki's pricing strategy faces its ultimate test. After the sensory journey through the store, the basket reaches the till, and whether the total feels reasonable or excessive depends almost entirely on the consumer's economic context.
Donki’s handwritten price tags are iconic, a deliberate aesthetic choice that signals “discount” and “deal” even when prices are not dramatically below market rate. These tags often include promotional language such as “promo”, alongside a “usual” price to reinforce the sense of savings. Phrases like “good deal”, “recommended product”, and “Don Miss Out” are also commonly used to create urgency and encourage impulse buying. The psychology of these cues strengthens the perception of value, even when actual discounts may be modest.
But perception only goes so far. In Singapore, where median wages are significantly higher and the cost of living is already elevated, Donki's prices feel genuinely competitive. In Malaysia, the same absolute price points represent a larger proportion of disposable income, and the discount framing is less convincing when local alternatives offer comparable products for less.</p>
    `,
    compare: {
      sg: { verdict: 'success', text: 'Handwritten price tags and "discount" framing resonated. Shoppers felt they were getting Japanese quality at a fair price.' },
      my: { verdict: 'fail',    text: 'The same prices felt expensive relative to local purchasing power. The "discount" framing did not overcome the reality of Malaysia\'s lower median wage and stronger local competition.' }
    }
  }
};

/* Open panel */
function openFpPanel(zoneKey) {
  const data = fpZoneData[zoneKey];
  if (!data) return;

  // Populate panel
  document.getElementById('fpPanelBadge').textContent   = data.badge;
  document.getElementById('fpPanelTitle').textContent   = data.title;
  document.getElementById('fpPanelBody').innerHTML      = data.body;
  document.getElementById('fpPanelCaption').textContent = data.caption;

  const img = document.getElementById('fpPanelImg');
  img.src = data.img;
  img.alt = data.caption;

  // Build compare rows
  const compareEl = document.getElementById('fpPanelCompare');
  compareEl.innerHTML = `
    <div class="fp-compare-row">
      <div class="fp-compare-sg">
        <span class="fp-compare-flag">🇸🇬</span>
        <span class="fp-compare-verdict success">✓ Singapore</span>
        <p>${data.compare.sg.text}</p>
      </div>
      <div class="fp-compare-my">
        <span class="fp-compare-flag">🇲🇾</span>
        <span class="fp-compare-verdict fail">✗ Malaysia</span>
        <p>${data.compare.my.text}</p>
      </div>
    </div>
  `;

  // Open
  document.getElementById('fpPanel').classList.add('open');
  document.getElementById('fpDim').classList.add('visible');
  document.body.style.overflow = 'hidden';

  // Mark active zone
  document.querySelectorAll('.fp-zone').forEach(z => z.classList.remove('active'));
  document.querySelector(`[data-zone="${zoneKey}"]`)?.classList.add('active');
}

/* Close panel */
function closeFpPanel() {
  document.getElementById('fpPanel').classList.remove('open');
  document.getElementById('fpDim').classList.remove('visible');
  document.body.style.overflow = '';
  document.querySelectorAll('.fp-zone').forEach(z => z.classList.remove('active'));
}

/* Attach listeners */
document.querySelectorAll('.fp-zone').forEach(zone => {
  zone.setAttribute('tabindex', '0');
  zone.setAttribute('role', 'button');
  zone.addEventListener('click', () => openFpPanel(zone.dataset.zone));
  zone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFpPanel(zone.dataset.zone); }
  });
});

document.getElementById('fpPanelClose').addEventListener('click', closeFpPanel);
document.getElementById('fpDim').addEventListener('click', closeFpPanel);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFpPanel(); });

/* 5. SG vs MY COMPARE TOGGLE */
function showCompare(country) {
  const panelSG = document.getElementById('panel-sg');
  const panelMY = document.getElementById('panel-my');
  const btnSG = document.getElementById('btnSG');
  const btnMY = document.getElementById('btnMY');
  if (country === 'sg') {
    panelSG.classList.remove('hidden'); panelMY.classList.add('hidden');
    btnSG.classList.add('active'); btnMY.classList.remove('active');
  } else {
    panelMY.classList.remove('hidden'); panelSG.classList.add('hidden');
    btnMY.classList.add('active'); btnSG.classList.remove('active');
  }
}

/* 6. BAR CHART — animate on scroll */
const barChartWrapper = document.querySelector('.bar-chart-wrapper');
if (barChartWrapper) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 150);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  barObserver.observe(barChartWrapper);
}

/* 7. LOC CARD icon bounce on hover */
document.querySelectorAll('.loc-card').forEach(card => {
  const icon = card.querySelector('.loc-card-icon');
  card.addEventListener('mouseenter', () => { icon.style.transform = 'scale(1.2) rotate(-5deg)'; icon.style.transition = 'transform 0.3s ease'; });
  card.addEventListener('mouseleave', () => { icon.style.transform = ''; });
});

/* 8. HERO TAPE — duplicate for seamless loop */
document.querySelectorAll('.hero-tape').forEach(tape => { tape.innerHTML += tape.innerHTML; });

/* 9. CONSOLE EASTER EGG */
console.log('%c ◆ DON DON DONKI RESEARCH ', 'background:#FFD200;color:#0e0e0e;font-family:monospace;font-size:14px;font-weight:bold;padding:8px 16px;border-radius:4px;');

// Force-show sources section in case observer missed it
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('#sources .fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }, 500);
});