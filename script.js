const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const cursorGlow = document.getElementById("cursorGlow");
const langToggle = document.getElementById("langToggle");

let currentLang = "pt";

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "×" : "☰";
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

function updateLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-pt][data-en]").forEach((element) => {
    const text = element.dataset[lang];
    if (text) {
      element.textContent = text;
    }
  });

  if (langToggle) {
    langToggle.textContent = lang === "pt" ? "EN" : "PT";
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

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}

const aboutSection = document.querySelector(".about-premium");

if (aboutSection && "IntersectionObserver" in window) {
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("active-about");
        }
      });
    },
    { threshold: 0.35 },
  );

  aboutObserver.observe(aboutSection);
}

window.addEventListener(
  "scroll",
  () => {
    if (!aboutSection || window.innerWidth < 900) return;

    const rect = aboutSection.getBoundingClientRect();
    const progress = Math.min(
      Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0),
      1,
    );

    const bgLayer = aboutSection.querySelector(".about-bg-layer");
    if (bgLayer) {
      bgLayer.style.transform = `scale(${1.06 - 0.04 * progress}) translateY(${18 * progress}px)`;
    }
  },
  { passive: true },
);

window.addEventListener(
  "mousemove",
  (event) => {
    if (!cursorGlow || window.innerWidth < 900) return;

    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

    document.querySelectorAll(".tilt-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const rotateX = (y / rect.height - 0.5) * -8;
        const rotateY = (x / rect.width - 0.5) * 8;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      } else {
        card.style.transform = "";
      }
    });
  },
  { passive: true },
);
