/* =====================================================================
   João Victor — Portfólio  ·  tema Terminal / IDE
   ===================================================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const langToggle = document.getElementById("langToggle");

let currentLang = "pt";

/* ---------- menu mobile ---------- */
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "≡";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "≡";
    });
  });
}

/* ---------- alternância de idioma ---------- */
function updateLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-pt][data-en]").forEach((element) => {
    const text = element.dataset[lang];
    if (text) element.textContent = text;
  });

  if (langToggle) {
    langToggle.innerHTML =
      lang === "pt"
        ? '<span class="lang-bracket">[</span>EN<span class="lang-bracket">]</span>'
        : '<span class="lang-bracket">[</span>PT<span class="lang-bracket">]</span>';
    langToggle.setAttribute(
      "aria-label",
      lang === "pt" ? "Change language to English" : "Mudar idioma para português",
    );
  }
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    updateLanguage(currentLang === "pt" ? "en" : "pt");
  });
}

/* ---------- reveal on scroll ---------- */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("active"));
}

/* ---------- about background reveal ---------- */
const aboutSection = document.querySelector(".about-premium");

if (aboutSection && "IntersectionObserver" in window) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) aboutSection.classList.add("active-about");
      });
    },
    { threshold: 0.3 },
  );
  aboutObserver.observe(aboutSection);
}

/* ---------- scroll-spy: aba de navegação ativa ---------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

if (sections.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );
  sections.forEach((section) => spy.observe(section));
}

/* ---------- relógio ao vivo na status bar ---------- */
const clock = document.getElementById("sbClock");

if (clock) {
  const tick = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}:${ss}`;
  };
  tick();
  setInterval(tick, 1000);
}
