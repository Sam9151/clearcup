(function () {
  var STORAGE_KEY = 'clearcup_lang';

  var redirectMap = {
    fr: '/',
    de: 'de/index.html',
    en: 'en/index.html'
  };

  function detectBrowserLang() {
    var lang = (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
    if (lang.startsWith('de')) return 'de';
    if (lang.startsWith('en')) return 'en';
    return 'fr';
  }

  function closeLangPopup(defaultLang) {
    var overlay = document.getElementById('lang-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 300ms ease';
      setTimeout(function () { overlay.remove(); }, 300);
    }
    localStorage.setItem(STORAGE_KEY, defaultLang || 'fr');
  }

  function initLangPopup() {
    if (localStorage.getItem(STORAGE_KEY)) return;

    var overlay = document.getElementById('lang-overlay');
    if (!overlay) return;

    var closeBtn = document.getElementById('lang-close');
    var langBtns = document.querySelectorAll('.lang-popup-btn');

    var detectedLang = detectBrowserLang();
    langBtns.forEach(function (btn) {
      if (btn.dataset.lang === detectedLang) {
        btn.classList.add('active');
      }
    });

    overlay.setAttribute('aria-hidden', 'false');
    overlay.style.display = 'flex';

    if (closeBtn) {
      closeBtn.addEventListener('click', function () { closeLangPopup('fr'); });
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLangPopup('fr');
    });

    langBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chosen = btn.dataset.lang;
        localStorage.setItem(STORAGE_KEY, chosen);
        if (chosen !== 'fr') {
          window.location.href = redirectMap[chosen];
        } else {
          closeLangPopup('fr');
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLangPopup('fr');
    });
  }

  document.addEventListener('DOMContentLoaded', initLangPopup);
})();
