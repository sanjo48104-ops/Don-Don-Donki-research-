console.log("DON DON DONKI RESEARCH — JS running");

/* Scroll reveal */

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
},{
  threshold:.1,
  rootMargin:"0px 0px -30px 0px"
});

document.querySelectorAll(".fade-up").forEach(el => {
  fadeObserver.observe(el);
});


/* Progress bar */

const progressBar = document.createElement("div");

progressBar.style.cssText =
  "position:fixed;top:60px;left:0;height:3px;background:var(--yellow);z-index:1100;width:0;transition:width .1s linear;pointer-events:none";

document.body.appendChild(progressBar);


/* Navigation */

const navLinks = document.querySelector(".nav-links");
const navToggle = document.getElementById("navToggle");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width =
    (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";

  let current = "";

  sections.forEach(section => {
    if(window.scrollY >= section.offsetTop - 100){
      current = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.style.color =
      a.getAttribute("href") === "#" + current
        ? "var(--yellow)"
        : "";
  });

},{
  passive:true
});


/* Mobile navigation */

navToggle?.addEventListener("click", () => {

  navLinks.classList.toggle("open");

  const spans = navToggle.querySelectorAll("span");
  const open = navLinks.classList.contains("open");

  spans[0].style.transform =
    open ? "rotate(45deg) translate(5px,5px)" : "";

  spans[1].style.opacity =
    open ? "0" : "1";

  spans[2].style.transform =
    open ? "rotate(-45deg) translate(5px,-5px)" : "";

});

navAnchors.forEach(a => {

  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });

});


/* Hero tape animation */

document.querySelectorAll(".hero-tape").forEach(t => {
  t.innerHTML += t.innerHTML;
});


/* Interactive floorplan */

const zoneData = {

  entrance:{
    badge:"ZONE 1 — ENTRANCE",
    img:"images/entrance.jpg",
    caption:"Store entrance",
    title:"First Impressions & Market Entry",

    body:
      "The entrance communicates Donki's identity immediately through bright signs, dense displays and deal-oriented language. This creates attention, but the same first impression needs to communicate value and relevance in each market.",

    sg:
      "Strong brand recognition can make the unusual entrance feel exciting and familiar.",

    my:
      "The opportunity is to keep the distinctive Japanese identity while making local value and relevance clearer."
  },

  food:{
    badge:"ZONE 2 — FOOD HALL",
    img:"images/food-hall.jpg",
    caption:"Food hall and dining area",
    title:"Food: From Japan to Everyday Consumption",

    body:
      "Food can combine Donki's Japanese differentiation with repeat purchasing. It is therefore strategically different from novelty snacks: the goal is not only to make customers curious, but to make the store useful for regular consumption.",

    sg:
      "Japanese ready-to-eat food and imported groceries can support both experience and repeat visits.",

    my:
      "Halal accessibility and local food preferences become important conditions for broad market reach."
  },

  snacks:{
    badge:"ZONE 3 — SNACKS & IMPORTS",
    img:"images/snacks.jpg",
    caption:"Japanese snack aisle",
    title:"Japanese Snacks: The Impulse Engine",

    body:
      "Unusual snacks are powerful discovery products. They create a reason to browse, buy something unplanned and potentially share the experience. However, novelty alone does not guarantee long-term customer value.",

    sg:
      "The discovery proposition can support impulse purchasing and repeat exploration.",

    my:
      "Imported price premiums can reduce the chance that novelty turns into a regular purchasing habit."
  },

  signage:{
    badge:"ZONE 4 — LAYOUT & SIGNAGE",
    img:"images/signage.jpg",
    caption:"Store layout and signage",
    title:"Controlled Chaos",

    body:
      "Dense displays, handwritten-style signs and unexpected product adjacencies make the shopping journey distinctive. The strategic question is whether customers interpret this complexity as entertainment or as friction.",

    sg:
      "The format can function as a recognisable part of the Donki brand.",

    my:
      "Clearer navigation may be needed in parts of the store where customers are shopping for practical everyday products."
  },

  cosmetics:{
    badge:"ZONE 5 — COSMETICS",
    img:"images/cosmetics.jpg",
    caption:"Cosmetics and lifestyle section",
    title:"Japanese Beauty: A Portable Advantage",

    body:
      "Japanese beauty products provide differentiation that can travel across borders. Localisation still matters through product range, shades, formulas and price positioning.",

    sg:
      "J-beauty can benefit from existing familiarity and strong demand for Japanese brands.",

    my:
      "A broader locally relevant assortment can help Japanese beauty appeal to more customers."
  },

  checkout:{
    badge:"ZONE 6 — CHECKOUT",
    img:"images/checkout.jpg",
    caption:"Checkout and price tags",
    title:"The Moment of Truth: Price Perception",

    body:
      "At checkout, the customer's entire shopping journey becomes a bill. Promotional signs can create value perception, but the final price still has to make sense relative to local incomes and alternatives.",

    sg:
      "Higher purchasing power can make imported products easier to perceive as acceptable value.",

    my:
      "A larger relative price burden can make local competitors more difficult to beat on everyday products."
  }

};


/* Open floorplan panel */

function openFpPanel(key){

  const d = zoneData[key];

  if(!d) return;

  document.getElementById("fpPanelBadge").textContent =
    d.badge;

  document.getElementById("fpPanelTitle").textContent =
    d.title;

  document.getElementById("fpPanelBody").innerHTML =
    `<p>${d.body}</p>`;

  document.getElementById("fpPanelCaption").textContent =
    d.caption;

  const img =
    document.getElementById("fpPanelImg");

  img.src = d.img;
  img.alt = d.caption;

  document.getElementById("fpPanelCompare").innerHTML = `

    <div>
      <b>🇸🇬 SINGAPORE</b>
      <p>${d.sg}</p>
    </div>

    <div>
      <b>🇲🇾 MALAYSIA</b>
      <p>${d.my}</p>
    </div>

  `;

  document.getElementById("fpPanel")
    .classList.add("open");

  document.getElementById("fpDim")
    .classList.add("visible");

  document.body.style.overflow = "hidden";

  document.querySelectorAll(".fp-zone")
    .forEach(z => z.classList.remove("active"));

  document
    .querySelector(`[data-zone="${key}"]`)
    ?.classList.add("active");

}


/* Close floorplan panel */

function closeFpPanel(){

  document.getElementById("fpPanel")
    .classList.remove("open");

  document.getElementById("fpDim")
    .classList.remove("visible");

  document.body.style.overflow = "";

  document.querySelectorAll(".fp-zone")
    .forEach(z => z.classList.remove("active"));

}


/* Floorplan listeners */

document.querySelectorAll(".fp-zone").forEach(zone => {

  zone.tabIndex = 0;
  zone.setAttribute("role","button");

  zone.addEventListener("click", () => {
    openFpPanel(zone.dataset.zone);
  });

  zone.addEventListener("keydown", e => {

    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      openFpPanel(zone.dataset.zone);
    }

  });

});

document
  .getElementById("fpPanelClose")
  ?.addEventListener("click", closeFpPanel);

document
  .getElementById("fpDim")
  ?.addEventListener("click", closeFpPanel);

document.addEventListener("keydown", e => {

  if(e.key === "Escape"){
    closeFpPanel();
  }

});


/* Singapore / Malaysia experience toggle */

document.querySelectorAll(".toggle-btn").forEach(btn => {

  btn.addEventListener("click", () => {

    const country = btn.dataset.country;

    document
      .querySelectorAll(".toggle-btn")
      .forEach(b => {
        b.classList.toggle("active", b === btn);
      });

    document
      .getElementById("experience-sg")
      .classList.toggle("hidden", country !== "sg");

    document
      .getElementById("experience-my")
      .classList.toggle("hidden", country !== "my");

  });

});


/* Hypothetical break-even calculator */

const fixedCost =
  document.getElementById("fixedCost");

const margin =
  document.getElementById("margin");

const basket =
  document.getElementById("basket");

const beSales =
  document.getElementById("beSales");

const beTransactions =
  document.getElementById("beTransactions");


function updateBreakEven(){

  if(!fixedCost || !margin || !basket) return;

  const fixed =
    Number(fixedCost.value) || 0;

  const m =
    (Number(margin.value) || 1) / 100;

  const avg =
    Number(basket.value) || 1;

  const sales =
    fixed / m;

  const transactions =
    Math.ceil(sales / avg);

  beSales.textContent =
    "S$" + Math.round(sales).toLocaleString();

  beTransactions.textContent =
    "≈ " + transactions.toLocaleString() +
    " transactions/month";

}


[fixedCost, margin, basket].forEach(el => {

  el?.addEventListener("input", updateBreakEven);

});

updateBreakEven();


/* Make sources visible after loading */

window.addEventListener("load", () => {

  document
    .querySelectorAll("#sources .fade-up")
    .forEach(el => {
      el.classList.add("visible");
    });

});
