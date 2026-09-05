/* =========================================================
   DON DON DONKI RESEARCH
   Main JavaScript
========================================================= */


/* =========================================================
   SCROLL REVEAL
========================================================= */

const fadeElements = document.querySelectorAll(".fade-up");

const fadeObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        fadeObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  }
);

fadeElements.forEach((element) => {
  fadeObserver.observe(element);
});


/* =========================================================
   NAVIGATION
========================================================= */

const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {

  navToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

  });

}


document.querySelectorAll(".nav-links a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

  });

});


/* =========================================================
   READING PROGRESS BAR
========================================================= */

const progressBar = document.createElement("div");

progressBar.style.cssText = `
  position: fixed;
  top: 62px;
  left: 0;
  width: 0%;
  height: 3px;
  background: var(--yellow);
  z-index: 2000;
  pointer-events: none;
`;

document.body.appendChild(progressBar);


window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const percentage =
    documentHeight > 0
      ? (scrollTop / documentHeight) * 100
      : 0;

  progressBar.style.width = `${percentage}%`;

});


/* =========================================================
   STORE FLOORPLAN
========================================================= */

const fpZoneData = {

  entrance: {

    badge: "Zone 01 — Entrance",

    title: "First Impressions Are Part of the Product",

    body: `
      <p>
        Donki's entrance is designed to communicate energy,
        value and difference immediately. Bright signage, large
        product displays and bold promotional language make the
        store visually different from a conventional supermarket.
      </p>

      <p>
        This creates attention before the customer has even entered.
        However, attention is only the first stage of the business
        model. The important question is whether attention becomes
        purchase and eventually repeat purchasing.
      </p>
    `,

    compare: {
      sg: `
        Singapore's dense urban retail environment can make a
        visually distinctive store a useful destination in itself.
      `,

      my: `
        In Malaysia, attention still matters, but the store must
        compete with many established malls and supermarket formats.
      `
    }

  },


  food: {

    badge: "Zone 02 — Food Hall",

    title: "Food Creates Frequency",

    body: `
      <p>
        Imported snacks are useful for discovery, but fresh food
        and ready-to-eat products can create a much stronger reason
        to return regularly.
      </p>

      <p>
        This creates an important distinction between a tourist
        customer and a routine customer. The first may visit once;
        the second can generate substantially more lifetime value.
      </p>

      <p>
        In markets where halal requirements are commercially
        important, the size and accessibility of the halal assortment
        also becomes part of product-market fit.
      </p>
    `,

    compare: {
      sg: `
        A broad Japanese food proposition can appeal to consumers
        already familiar with Japanese cuisine.
      `,

      my: `
        The key question is whether halal and local food adaptation
        is sufficient to make the food proposition relevant to the
        wider Malaysian market.
      `
    }

  },


  snacks: {

    badge: "Zone 03 — Japanese Imports",

    title: "Japanese Imports Drive Differentiation",

    body: `
      <p>
        Japanese snacks, drinks and lifestyle products are difficult
        for conventional supermarkets to replicate at the same depth.
        This gives Donki a genuine differentiation advantage.
      </p>

      <p>
        However, differentiation does not automatically equal
        repeat purchasing. A customer may be excited by a product
        once but decide that the price is too high for regular
        consumption.
      </p>

      <p>
        The strongest strategy is therefore to combine exclusive
        discovery products with affordable, frequently purchased
        products.
      </p>
    `,

    compare: {
      sg: `
        Strong Japanese-product familiarity can increase the
        likelihood that customers recognise brands and products.
      `,

      my: `
        Imported-product pricing needs to be compared against
        local alternatives rather than judged purely by Japanese
        retail prices.
      `
    }

  },


  signage: {

    badge: "Zone 04 — Layout & Signage",

    title: "Controlled Chaos Has a Cost",

    body: `
      <p>
        Donki's compressed display strategy creates a treasure-hunt
        experience. Customers are encouraged to browse rather than
        simply find one item and leave.
      </p>

      <p>
        But the same design can reduce shopping efficiency.
        Traditional supermarkets optimise for navigation and speed;
        Donki often optimises for discovery.
      </p>

      <p>
        The optimal balance may therefore depend on the customer
        segment. A store targeting tourists and discovery shoppers
        can tolerate more complexity than a store trying to become
        an everyday neighbourhood grocery destination.
      </p>
    `,

    compare: {
      sg: `
        The distinctive layout can function as entertainment and
        contribute to the store's brand identity.
      `,

      my: `
        A more locally adapted balance between discovery and
        navigation may be required in some Malaysian catchments.
      `
    }

  },


  cosmetics: {

    badge: "Zone 05 — Beauty & Lifestyle",

    title: "Beauty Can Travel Better Than Food",

    body: `
      <p>
        Japanese beauty products have strong international
        differentiation because consumers often seek specific
        Japanese brands, formulas and product reputations.
      </p>

      <p>
        Cosmetics can therefore be less dependent on local food
        preferences than groceries. However, product range,
        shades, formulations and price points still need to reflect
        the local customer.
      </p>

      <p>
        This makes beauty an example of a category where Donki's
        Japanese identity can remain highly visible while the
        assortment is still localised.
      </p>
    `,

    compare: {
      sg: `
        High-density urban consumers and strong beauty retail demand
        create a potentially attractive environment.
      `,

      my: `
        Product selection should account for local beauty preferences
        rather than assuming Japanese assortment automatically fits.
      `
    }

  },


  checkout: {

    badge: "Zone 06 — Checkout",

    title: "The Checkout Tests the Value Proposition",

    body: `
      <p>
        Promotional price tags can make products appear inexpensive,
        but consumers ultimately compare the total basket against
        their alternatives.
      </p>

      <p>
        This is why Donki's pricing strategy should focus on
        high-frequency key-value items. Customers need to encounter
        enough visibly competitive prices to believe the overall
        store represents good value.
      </p>

      <p>
        Premium or exclusive products can then support margin where
        differentiation is strong.
      </p>
    `,

    compare: {
      sg: `
        Higher purchasing power can make imported Japanese products
        more accessible to a larger share of consumers.
      `,

      my: `
        The same imported price can represent a greater share of
        household spending, increasing the importance of local
        price benchmarking.
      `
    }

  }

};


function openFpPanel(zoneKey) {

  const data = fpZoneData[zoneKey];

  if (!data) return;


  const panel = document.getElementById("fpPanel");
  const dim = document.getElementById("fpDim");

  const badge = document.getElementById("fpPanelBadge");
  const title = document.getElementById("fpPanelTitle");
  const body = document.getElementById("fpPanelBody");
  const compare = document.getElementById("fpPanelCompare");


  badge.textContent = data.badge;

  title.textContent = data.title;

  body.innerHTML = data.body;


  compare.innerHTML = `

    <div class="fp-compare-row">

      <div class="fp-compare-sg">

        <span class="fp-compare-verdict success">
          🇸🇬 Singapore
        </span>

        <p>${data.compare.sg}</p>

      </div>


      <div class="fp-compare-my">

        <span class="fp-compare-verdict fail">
          🇲🇾 Malaysia
        </span>

        <p>${data.compare.my}</p>

      </div>

    </div>

  `;


  panel.classList.add("open");

  dim.classList.add("visible");

  document.body.style.overflow = "hidden";

}


function closeFpPanel() {

  document.getElementById("fpPanel")
    .classList.remove("open");

  document.getElementById("fpDim")
    .classList.remove("visible");

  document.body.style.overflow = "";

}


document.querySelectorAll(".fp-zone").forEach((zone) => {

  zone.addEventListener("click", () => {

    openFpPanel(zone.dataset.zone);

  });

});


document.getElementById("fpPanelClose")
  .addEventListener("click", closeFpPanel);

document.getElementById("fpDim")
  .addEventListener("click", closeFpPanel);


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeFpPanel();

  }

});


/* =========================================================
   BREAK-EVEN CALCULATOR
========================================================= */

const rentInput =
  document.getElementById("rentInput");

const labourInput =
  document.getElementById("labourInput");

const otherInput =
  document.getElementById("otherInput");

const marginInput =
  document.getElementById("marginInput");

const visitorInput =
  document.getElementById("visitorInput");

const basketInput =
  document.getElementById("basketInput");


const fixedCostOutput =
  document.getElementById("fixedCostOutput");

const revenueOutput =
  document.getElementById("revenueOutput");

const grossProfitOutput =
  document.getElementById("grossProfitOutput");

const breakEvenOutput =
  document.getElementById("breakEvenOutput");

const breakEvenVisitorsOutput =
  document.getElementById("breakEvenVisitorsOutput");

const calcStatus =
  document.getElementById("calcStatus");


function formatMoney(value) {

  if (!Number.isFinite(value)) {
    return "$0";
  }

  if (value >= 1000000) {

    return "$" +
      (value / 1000000)
        .toFixed(1) +
      "m";

  }

  if (value >= 1000) {

    return "$" +
      (value / 1000)
        .toFixed(0) +
      "k";

  }

  return "$" +
    Math.round(value)
      .toLocaleString();

}


function updateCalculator() {

  const rent =
    Number(rentInput.value) || 0;

  const labour =
    Number(labourInput.value) || 0;

  const other =
    Number(otherInput.value) || 0;

  const margin =
    (Number(marginInput.value) || 0) / 100;

  const visitors =
    Number(visitorInput.value) || 0;

  const basket =
    Number(basketInput.value) || 0;


  const fixedCosts =
    rent +
    labour +
    other;


  const revenue =
    visitors *
    basket;


  const grossProfit =
    revenue *
    margin;


  const breakEvenSales =
    margin > 0
      ? fixedCosts / margin
      : 0;


  const breakEvenVisitors =
    basket > 0
      ? breakEvenSales / basket
      : 0;


  fixedCostOutput.textContent =
    formatMoney(fixedCosts);

  revenueOutput.textContent =
    formatMoney(revenue);

  grossProfitOutput.textContent =
    formatMoney(grossProfit);

  breakEvenOutput.textContent =
    formatMoney(breakEvenSales);

  breakEvenVisitorsOutput.textContent =
    Math.ceil(breakEvenVisitors)
      .toLocaleString();


  if (revenue >= breakEvenSales) {

    calcStatus.textContent =
      "Above hypothetical break-even";

    calcStatus.classList.remove("warning");

  } else {

    calcStatus.textContent =
      "Below hypothetical break-even";

    calcStatus.classList.add("warning");

  }

}


[
  rentInput,
  labourInput,
  otherInput,
  marginInput,
  visitorInput,
  basketInput
].forEach((input) => {

  input.addEventListener(
    "input",
    updateCalculator
  );

});


updateCalculator();


/* =========================================================
   NAV ACTIVE SECTION
========================================================= */

const sections =
  document.querySelectorAll("section[id]");

const navAnchors =
  document.querySelectorAll(".nav-links a");


function updateActiveNav() {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop;

    if (
      window.scrollY >=
      sectionTop - 130
    ) {

      current =
        section.getAttribute("id");

    }

  });


  navAnchors.forEach((anchor) => {

    anchor.style.color = "";

    if (
      anchor.getAttribute("href") ===
      `#${current}`
    ) {

      anchor.style.color =
        "var(--yellow)";

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveNav
);

updateActiveNav();


/* =========================================================
   CARD MICRO-INTERACTIONS
========================================================= */

document
  .querySelectorAll(".stat-card, .product-card, .country-card")
  .forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.style.transition =
          "transform .3s ease";

      }
    );

  });


/* =========================================================
   HERO TAPE
========================================================= */

document
  .querySelectorAll(".hero-tape")
  .forEach((tape) => {

    tape.innerHTML +=
      tape.innerHTML;

  });


/* =========================================================
   CONSOLE
========================================================= */

console.log(
  "%c ◆ DON DON DONKI RESEARCH ",
  `
    background:#FFD200;
    color:#0e0e0e;
    font-family:monospace;
    font-size:14px;
    font-weight:bold;
    padding:8px 16px;
  `
);
