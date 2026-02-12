/* ===========
   Data
=========== */
const projects = [
  {
    title: "Mindful Academy",
    subtitle: "Course platform redesign",
    tag: "Kajabi",
    filter: "kajabi",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    desc: "A clean, conversion-focused course site with streamlined navigation, improved program pages, and stronger CTAs.",
    link: "https://example.com"
  },
  {
    title: "Elevate Coaching",
    subtitle: "Landing page + brand refresh",
    tag: "Wix",
    filter: "wix",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    desc: "A warm, modern homepage with clear offers, testimonials, and a frictionless contact path.",
    link: "https://example.com"
  },
  {
    title: "Scale Pro Funnels",
    subtitle: "Analytics dashboard UI",
    tag: "Kajabi",
    filter: "kajabi",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    desc: "A focused interface for reporting, tracking performance, and increasing signups from key pages.",
    link: "https://example.com"
  },
  {
    title: "Launch Master",
    subtitle: "Campaign toolkit site",
    tag: "Squarespace",
    filter: "squarespace",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    desc: "A polished marketing site built for clarity: offers, benefits, FAQs, and a clear booking flow.",
    link: "https://example.com"
  },
  {
    title: "Artisan Collective",
    subtitle: "Portfolio + shop concept",
    tag: "Shopify",
    filter: "shopify",
    img: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1600&q=80",
    desc: "A visual-first storefront layout with featured collections and an easy-to-browse product structure.",
    link: "https://example.com"
  },
  {
    title: "Studio Minimal",
    subtitle: "Architecture site",
    tag: "Wix",
    filter: "wix",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    desc: "A minimal, high-end feel with strong typography and gallery sections that keep the focus on the work.",
    link: "https://example.com"
  },
  {
    title: "Luxe Botanics",
    subtitle: "Brand shop product pages",
    tag: "Shopify",
    filter: "shopify",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80",
    desc: "Improved product page layout, stronger imagery hierarchy, and clearer value messaging.",
    link: "https://example.com"
  },
  {
    title: "Urban Threads",
    subtitle: "Lookbook landing pages",
    tag: "Squarespace",
    filter: "squarespace",
    img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
    desc: "Lookbook-driven visuals paired with lightweight navigation and fast-loading sections.",
    link: "https://example.com"
  },
  {
    title: "Noir Architecture",
    subtitle: "Modern brochure site",
    tag: "Wix",
    filter: "wix",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    desc: "A sleek, dark-leaning concept with a bright content rhythm to keep it readable and premium.",
    link: "https://example.com"
  },
  {
    title: "Serenity Wellness",
    subtitle: "Service website refresh",
    tag: "Kajabi",
    filter: "kajabi",
    img: "https://images.unsplash.com/photo-1722094250550-4993fa28a51b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "A calm, client-friendly layout with a simple services flow and clear booking next steps.",
    link: "https://example.com"
  }
];

/* ===========
   Helpers
=========== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ===========
   Mobile Nav
=========== */
const navToggle = $("#navToggle");
const mobileNav = $("#mobileNav");

function setMobileNav(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMobileNav(!isOpen);
});

$$(".mobile-nav a").forEach(a => {
  a.addEventListener("click", () => setMobileNav(false));
});

/* ===========
   Projects Render
=========== */
const grid = $("#projectGrid");

function spanClass(i) {
  // A simple pattern to mimic the mixed card sizes in your screenshot.
  const pattern = ["span-6", "span-6", "span-4", "span-8", "span-6", "span-6", "span-4", "span-8", "span-6", "span-6"];
  return pattern[i % pattern.length] || "span-6";
}

function renderProjects(filter = "all") {
  grid.innerHTML = "";

  const filtered = filter === "all"
    ? projects
    : projects.filter(p => p.filter === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `card ${spanClass(i)}`;
    card.setAttribute("data-filter", p.filter);
    card.setAttribute("data-title", p.title);
    card.setAttribute("aria-label", `Open project: ${p.title}`);

    card.innerHTML = `
      <img src="${p.img}" alt="" loading="lazy" />
      <div class="card-overlay">
        <div class="tag">${p.tag}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-sub">${p.subtitle}</div>
      </div>
    `;

    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "span-12";
    empty.style.padding = "16px";
    empty.style.textAlign = "center";
    empty.style.color = "rgba(11,18,32,.70)";
    empty.style.fontWeight = "700";
    empty.textContent = "No projects found for that filter.";
    grid.appendChild(empty);
  }
}

renderProjects();

/* ===========
   Filters
=========== */
const chips = $$(".chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => {
      c.classList.remove("is-active");
      c.setAttribute("aria-selected", "false");
    });
    chip.classList.add("is-active");
    chip.setAttribute("aria-selected", "true");

    const filter = chip.dataset.filter;
    renderProjects(filter);
  });
});

/* ===========
   Modal
=========== */
const modal = $("#projectModal");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalTag = $("#modalTag");
const modalVisit = $("#modalVisit");

let lastFocusedEl = null;

function openModal(project) {
  lastFocusedEl = document.activeElement;

  modalImg.src = project.img;
  modalImg.alt = `${project.title} preview image`;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalTag.textContent = project.tag;
  modalVisit.href = project.link;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // focus close button for accessibility
  const closeBtn = modal.querySelector("[data-close='true']");
  closeBtn && closeBtn.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedEl) lastFocusedEl.focus();
}

modal.addEventListener("click", (e) => {
  const t = e.target;
  if (t && t.dataset && t.dataset.close === "true") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

/* ===========
   Contact Form
=========== */
const form = $("#contactForm");
const toast = $("#toast");

function setError(fieldName, message) {
  const el = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (el) el.textContent = message || "";
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const budget = String(data.get("budget") || "").trim();
  const message = String(data.get("message") || "").trim();

  let ok = true;
  setError("name", "");
  setError("email", "");
  setError("budget", "");
  setError("message", "");

  if (name.length < 2) { setError("name", "Please enter your name."); ok = false; }
  if (!isEmailValid(email)) { setError("email", "Please enter a valid email."); ok = false; }
  if (!budget) { setError("budget", "Please choose a budget range."); ok = false; }
  if (message.length < 10) { setError("message", "Please add a few details (at least 10 characters)."); ok = false; }

  if (!ok) return;

  // Demo success (replace with real integration)
  toast.hidden = false;
  form.reset();

  setTimeout(() => {
    toast.hidden = true;
  }, 3500);
});

/* ===========
   Footer Year
=========== */
$("#year").textContent = new Date().getFullYear();
