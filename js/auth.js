// Authentication module for Admin access
const ADMIN_PASSWORD = "MUKHAMMADSALIMARIPOV";
const AUTH_SESSION_KEY = "muhammadsalim_admin_auth";

// Check if current user is logged in as admin in this session
function isAdminAuthenticated() {
  return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
}

// Set admin authentication status
function setAdminAuthenticated(status) {
  if (status) {
    sessionStorage.setItem(AUTH_SESSION_KEY, "true");
  } else {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }
}

// Log out admin
function logoutAdmin() {
  setAdminAuthenticated(false);
  if (window.showToast) {
    const lang = getCurrentLanguage();
    showToast(lang === 'uzb' ? "Admindan chiqildi" : "Вы вышли из режима администратора", "info");
  }
  setTimeout(() => {
    window.location.href = "index.html";
  }, 400);
}

// Build and inject password modal into DOM if not present
function ensureAdminModal() {
  if (document.getElementById("admin-password-modal")) {
    return;
  }

  const modalHtml = `
    <div id="admin-password-modal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
      <div class="modal-box">
        <button type="button" class="modal-close-btn" id="admin-modal-close" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="modal-icon-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h3 id="admin-modal-title" class="modal-title" data-i18n="modal_admin_title">Вход для администратора</h3>
        <p class="modal-desc" data-i18n="modal_admin_subtitle">Для доступа к управлению проектами требуется пароль</p>

        <form id="admin-password-form" class="modal-form" onsubmit="handleAdminPasswordSubmit(event)">
          <div class="input-group">
            <div class="password-input-wrapper">
              <input 
                type="password" 
                id="admin-password-input" 
                class="form-control" 
                placeholder="Введите пароль администратора" 
                data-i18n-ph="modal_password_placeholder"
                autocomplete="current-password"
                required
              />
              <button type="button" class="password-toggle-btn" id="toggle-password-visibility" aria-label="Toggle password visibility">
                <svg id="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <div id="admin-modal-error" class="modal-error-msg hidden"></div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" id="admin-modal-cancel" data-i18n="modal_btn_cancel">Отмена</button>
            <button type="submit" class="btn btn-primary" id="admin-modal-submit" data-i18n="modal_btn_submit">
              <span>Войти</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Bind close buttons
  document.getElementById("admin-modal-close").addEventListener("click", closeAdminModal);
  document.getElementById("admin-modal-cancel").addEventListener("click", closeAdminModal);

  // Close on backdrop click
  document.getElementById("admin-password-modal").addEventListener("click", (e) => {
    if (e.target.id === "admin-password-modal") {
      closeAdminModal();
    }
  });

  // Toggle password visibility
  document.getElementById("toggle-password-visibility").addEventListener("click", () => {
    const input = document.getElementById("admin-password-input");
    const isPass = input.type === "password";
    input.type = isPass ? "text" : "password";
    const eyeIcon = document.getElementById("eye-icon");
    if (isPass) {
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  });
}

// Open modal
function openAdminModal() {
  if (isAdminAuthenticated()) {
    window.location.href = "admin.html";
    return;
  }

  ensureAdminModal();
  const modal = document.getElementById("admin-password-modal");
  const input = document.getElementById("admin-password-input");
  const errorBox = document.getElementById("admin-modal-error");

  if (errorBox) {
    errorBox.textContent = "";
    errorBox.classList.add("hidden");
  }
  if (input) {
    input.value = "";
    input.classList.remove("input-error");
  }

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  // Re-apply language translations to modal
  if (window.applyTranslations) {
    applyTranslations();
  }

  setTimeout(() => {
    input.focus();
  }, 100);
}

// Close modal
function closeAdminModal() {
  const modal = document.getElementById("admin-password-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
}

// Handle password form submission
function handleAdminPasswordSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("admin-password-input");
  const errorBox = document.getElementById("admin-modal-error");
  const entered = input.value.trim();
  const lang = (window.getCurrentLanguage && getCurrentLanguage()) || 'ru';
  const dict = translations[lang] || translations.ru;

  if (!entered) {
    errorBox.textContent = dict.modal_error_empty;
    errorBox.classList.remove("hidden");
    input.classList.add("input-error");
    return;
  }

  if (entered === ADMIN_PASSWORD) {
    // Password is correct
    setAdminAuthenticated(true);
    errorBox.classList.add("hidden");
    input.classList.remove("input-error");
    input.classList.add("input-success");

    if (window.showToast) {
      showToast(dict.modal_success, "success");
    }

    setTimeout(() => {
      closeAdminModal();
      window.location.href = "admin.html";
    }, 600);
  } else {
    // Wrong password
    errorBox.textContent = dict.modal_error_wrong;
    errorBox.classList.remove("hidden");
    input.classList.add("input-error");

    // Shake animation
    const modalBox = document.querySelector(".modal-box");
    modalBox.classList.add("shake-animation");
    setTimeout(() => modalBox.classList.remove("shake-animation"), 500);

    input.select();
  }
}

// Global hook: bind any button with .admin-only-btn
document.addEventListener("DOMContentLoaded", () => {
  ensureAdminModal();
  document.querySelectorAll(".admin-only-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openAdminModal();
    });
  });
});
