// Main application logic: Theme, Language, Toasts, Navbar

const THEME_KEY = 'muhammadsalim_portfolio_theme';
const LANG_KEY = 'muhammadsalim_portfolio_lang';

// Current language getter & setter
function getCurrentLanguage() {
  return localStorage.getItem(LANG_KEY) || 'ru';
}

function setLanguage(lang) {
  if (lang !== 'ru' && lang !== 'uzb') lang = 'ru';
  localStorage.setItem(LANG_KEY, lang);
  applyTranslations();
  updateLangButton();
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

// Current theme getter & setter
function getCurrentTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  // Default to dark mode for developer portfolio
  return 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeButton();
}

function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

// Update Theme UI button
function updateThemeButton() {
  const theme = getCurrentTheme();
  const lang = getCurrentLanguage();
  const dict = translations[lang] || translations.ru;
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');

  themeToggles.forEach(btn => {
    const icon = btn.querySelector('.theme-icon');
    const label = btn.querySelector('.theme-label');

    if (theme === 'dark') {
      if (icon) {
        icon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      }
      if (label) label.textContent = dict.theme_light;
    } else {
      if (icon) {
        icon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
      if (label) label.textContent = dict.theme_dark;
    }
  });
}

// Update Language UI button
function updateLangButton() {
  const currentLang = getCurrentLanguage();
  const langToggles = document.querySelectorAll('.lang-toggle-btn');

  langToggles.forEach(btn => {
    const uzbTag = btn.querySelector('.lang-uzb');
    const ruTag = btn.querySelector('.lang-ru');

    if (uzbTag && ruTag) {
      if (currentLang === 'uzb') {
        uzbTag.classList.add('active');
        ruTag.classList.remove('active');
      } else {
        ruTag.classList.add('active');
        uzbTag.classList.remove('active');
      }
    } else {
      btn.textContent = currentLang === 'uzb' ? 'UZB' : 'RU';
    }
  });
}

// Apply translations across all marked elements
function applyTranslations() {
  const lang = getCurrentLanguage();
  const dict = translations[lang] || translations.ru;

  // Inner text or HTML
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key]) {
      el.setAttribute('title', dict[key]);
    }
  });

  updateThemeButton();
}

// Toast notification helper
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} slide-in`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-text">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('slide-out');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Apply theme
  const initialTheme = getCurrentTheme();
  setTheme(initialTheme);

  // Apply language
  applyTranslations();
  updateLangButton();

  // Bind theme toggles
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Bind language toggles
  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = getCurrentLanguage();
      setLanguage(current === 'ru' ? 'uzb' : 'ru');
    });
  });

  // Mobile menu setup
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('visible');
      document.body.classList.add('modal-open');
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.remove('visible');
      document.body.classList.remove('modal-open');
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Demo contact form handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lang = getCurrentLanguage();
      const dict = translations[lang] || translations.ru;
      showToast(dict.contact_success, 'success');
      contactForm.reset();
    });
  }
});
