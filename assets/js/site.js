document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const progressBar = document.querySelector(".scroll-progress span");

const updateScrollState = () => {
  const top = window.scrollY;
  header?.classList.toggle("is-scrolled", top > 24);

  if (progressBar) {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(100, (top / available) * 100) : 0;
    progressBar.style.width = `${progress}%`;
  }
};

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

if (nav && navToggle) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

const revealItems = document.querySelectorAll(
  "[data-reveal], .feature-card, .workflow-step, .resource-link, .card, .steps li"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const productVisual = document.querySelector(".hero-product");
const productWindow = document.querySelector(".product-window");
const canTilt = window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (productVisual && productWindow && canTilt) {
  productVisual.addEventListener("pointermove", (event) => {
    const bounds = productVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    productWindow.style.transform = `translate(-50%, -50%) rotateY(${x * 8 - 8}deg) rotateX(${-y * 7 + 3}deg)`;
  });

  productVisual.addEventListener("pointerleave", () => {
    productWindow.style.transform = "translate(-50%, -50%) rotateY(-8deg) rotateX(3deg)";
  });
}

const faqInput = document.querySelector("#faq-search");
const faqItems = [...document.querySelectorAll(".faq-list details")];
const faqCount = document.querySelector("#faq-count");
const faqEmpty = document.querySelector("#faq-empty");

if (faqInput && faqItems.length) {
  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const updateFaq = () => {
    const term = normalize(faqInput.value);
    let visible = 0;

    faqItems.forEach((item) => {
      const matches = !term || normalize(item.textContent || "").includes(term);
      item.hidden = !matches;
      if (matches) visible += 1;
    });

    if (faqCount) {
      faqCount.textContent = term
        ? `${visible} ${visible === 1 ? "resposta encontrada" : "respostas encontradas"}`
        : `${faqItems.length} perguntas`;
    }
    faqEmpty?.classList.toggle("is-visible", visible === 0);
  };

  faqInput.addEventListener("input", updateFaq);
  updateFaq();
}

const tocLinks = [...document.querySelectorAll(".toc a[href^='#']")];
const tocTargets = tocLinks
  .map((link) => {
    const href = link.getAttribute("href");
    return href ? document.getElementById(decodeURIComponent(href.slice(1))) : null;
  })
  .filter(Boolean);

if (tocLinks.length && tocTargets.length && "IntersectionObserver" in window) {
  const tocObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

      if (!visible) return;
      tocLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
  );

  tocTargets.forEach((target) => tocObserver.observe(target));
}
