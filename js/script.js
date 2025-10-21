const swiper = new Swiper(".testimonial-swiper", {
  direction: "vertical",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,

  pagination: {
    el: ".testimonial-pagination",
    clickable: true,
  },
});

document
  .getElementById("nav-up")
  .addEventListener("click", () => swiper.slidePrev());
document
  .getElementById("nav-down")
  .addEventListener("click", () => swiper.slideNext());

// Theme

const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", savedTheme);
updateButtonText(savedTheme);

toggleBtn.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateButtonText(newTheme);
});

function updateButtonText(theme) {
  if (theme === "dark") {
    toggleBtn.textContent = "☀️ ";
    toggleBtn.classList.remove("btn-secondary");
    toggleBtn.classList.add("btn-light");
  } else {
    toggleBtn.textContent = "🌙 ";
    toggleBtn.classList.remove("btn-light");
    toggleBtn.classList.add("btn-secondary");
  }
}

//Language translation
const langButtons = document.querySelectorAll(".lang-option");
const langDropdown = document.getElementById("languageDropdown");
const htmlEl = document.documentElement;

let currentLang = localStorage.getItem("lang") || "en";
loadLanguage(currentLang);

langButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedLang = btn.dataset.lang;
    localStorage.setItem("lang", selectedLang);
    loadLanguage(selectedLang);
  });
});

async function loadLanguage(lang) {
  try {
    const res = await fetch("./js/translations.json");
    const translations = await res.json();
    applyTranslations(translations[lang]);
    langDropdown.textContent = lang.toUpperCase();
    document.body.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    htmlEl.setAttribute("lang", lang);
  } catch (err) {
    console.error("Error loading translations:", err);
  }
}

function applyTranslations(langData) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = langData[key];
    if (text) el.textContent = text;
  });
}
