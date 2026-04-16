// ClearCup — interactivité

// ── Google Analytics (chargé uniquement sur consentement) ──
function loadGA() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-PBNKMQ23LS';
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-PBNKMQ23LS');
}

// ── Curseur personnalisé ──
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
    document.body.classList.remove('cursor-hidden');
  });

  document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'a, button, .card, .step-card, .btn-primary, .btn-submit, .legal-link, .insta-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ── Modale légale ──
const legalModal   = document.getElementById('legal-modal');
const legalContent = document.getElementById('legal-content');
const legalClose   = document.getElementById('legal-close');

const legalTexts = {
  mentions: `
    <h1>Mentions légales</h1>
    <h2>Éditeur du site</h2>
    <p>ClearCup<br>Fribourg, Suisse<br>Email : info@clearcup.ch</p>
    <h2>Responsable de la publication</h2>
    <p>L'équipe ClearCup — info@clearcup.ch</p>
    <h2>Hébergement</h2>
    <p>Ce site est hébergé par GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA).</p>
    <h2>Propriété intellectuelle</h2>
    <p>L'ensemble des contenus présents sur ce site (textes, images, visuels, logo) sont la propriété exclusive de ClearCup et sont protégés par les lois suisses sur la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.</p>
    <h2>Limitation de responsabilité</h2>
    <p>ClearCup s'efforce de maintenir les informations de ce site à jour et exactes, mais ne saurait être tenu responsable d'éventuelles erreurs ou omissions.</p>
  `,
  confidentialite: `
    <h1>Politique de confidentialité</h1>
    <h2>Données collectées</h2>
    <p>Ce site collecte des données de navigation anonymes via Google Analytics 4 (fréquentation, pages visitées, durée de visite) uniquement si vous avez donné votre consentement.</p>
    <h2>Finalité du traitement</h2>
    <p>Les données collectées sont utilisées exclusivement pour mesurer l'audience du site et améliorer l'expérience utilisateur. Aucune donnée personnelle n'est vendue ou transmise à des tiers à des fins commerciales.</p>
    <h2>Cookies</h2>
    <p>Ce site utilise un cookie de préférence pour mémoriser votre choix concernant Google Analytics. Vous pouvez modifier votre choix à tout moment en vidant le stockage local de votre navigateur.</p>
    <h2>Vos droits</h2>
    <p>Conformément à la Loi fédérale suisse sur la protection des données (LPD) et au RGPD européen, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à info@clearcup.ch.</p>
    <h2>Contact</h2>
    <p>Pour toute question relative à la protection de vos données : info@clearcup.ch</p>
  `
};

function openLegal(type) {
  legalContent.innerHTML = legalTexts[type];
  legalModal.classList.remove('hidden', 'is-closing');
  requestAnimationFrame(() => legalModal.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
}

function closeLegal() {
  legalModal.classList.remove('is-open');
  legalModal.classList.add('is-closing');
  legalModal.addEventListener('transitionend', () => {
    legalModal.classList.add('hidden');
    legalModal.classList.remove('is-closing');
    document.body.style.overflow = '';
  }, { once: true });
}

document.querySelectorAll('.legal-link').forEach(btn => {
  btn.addEventListener('click', () => openLegal(btn.dataset.modal));
});

legalClose.addEventListener('click', closeLegal);

legalModal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLegal();
});

// ── Cookie banner ──
const cookieBanner = document.getElementById('cookie-banner');
const consent = localStorage.getItem('cc_consent');

if (consent === 'accepted') {
  loadGA();
} else if (!consent) {
  cookieBanner.classList.remove('hidden');
}

document.getElementById('cookie-accept')?.addEventListener('click', () => {
  localStorage.setItem('cc_consent', 'accepted');
  loadGA();
  cookieBanner.classList.add('hidden');
});

document.getElementById('cookie-refuse')?.addEventListener('click', () => {
  localStorage.setItem('cc_consent', 'refused');
  cookieBanner.classList.add('hidden');
});

// Smooth scroll pour tous les liens d'ancre
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Autofocus sur le premier champ si on va vers #contact
    if (this.getAttribute('href') === '#contact') {
      const firstField = document.getElementById('prenom');
      if (firstField) setTimeout(() => firstField.focus(), 600);
    }
  });
});

// Burger menu mobile
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

const menuInner = mobileMenu ? mobileMenu.querySelector('.mobile-menu-inner') : null;

function openMenu() {
  mobileMenu.classList.remove('hidden');
  mobileMenu.classList.remove('is-closing');
  requestAnimationFrame(() => {
    mobileMenu.classList.add('is-open');
  });
  burgerBtn.classList.add('open');
  burgerBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  mobileMenu.classList.add('is-closing');
  mobileMenu.addEventListener('transitionend', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('is-closing');
  }, { once: true });
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
}

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Reveal scroll (IntersectionObserver)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Ripple effect sur .btn-submit
document.querySelectorAll('.btn-submit').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Navbar hide/show + Sticky CTA mobile
const navbar = document.getElementById('navbar');
const stickyCta = document.getElementById('sticky-cta');
const contactSection = document.getElementById('contact');
let lastScrollY = window.scrollY;
let contactVisible = false;

if (stickyCta && contactSection) {
  new IntersectionObserver((entries) => {
    contactVisible = entries[0].isIntersecting;
    if (contactVisible) stickyCta.classList.add('hidden-cta');
  }, { threshold: 0.1 }).observe(contactSection);
}

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 80;

  navbar.classList.toggle('nav-hidden', scrollingDown);

  if (stickyCta && !contactVisible) {
    stickyCta.classList.toggle('hidden-cta', !scrollingDown);
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// ── Compteurs animés ──
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function runCounter(el) {
  const duration = 1600;
  const start = performance.now();

  if (el.dataset.counter !== undefined) {
    const to     = parseInt(el.dataset.to);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    (function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value    = Math.round(easeOutCubic(progress) * to);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    })(start);
  }

  if (el.dataset.counterRange !== undefined) {
    const to1    = parseInt(el.dataset.to1);
    const to2    = parseInt(el.dataset.to2);
    const suffix = el.dataset.suffix || '';
    (function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = easeOutCubic(progress);
      const v1       = Math.round(eased * to1);
      const v2       = Math.round(eased * to2);
      el.textContent = v1 + '–' + v2 + suffix;
      if (progress < 1) requestAnimationFrame(update);
    })(start);
  }
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter], [data-counter-range]').forEach(el => {
  counterObserver.observe(el);
});

// Active nav link au scroll (desktop)
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
});

document.querySelectorAll('section[id]').forEach(s => activeObserver.observe(s));

// ── Validation inline formulaire ──
function validateField(input, errorId, checkFn) {
  const error = document.getElementById(errorId);
  const valid = checkFn(input.value.trim());
  input.classList.toggle('is-valid', valid);
  input.classList.toggle('is-error', !valid);
  if (error) error.classList.toggle('visible', !valid);
  return valid;
}

const validations = [
  { id: 'prenom',       error: 'error-prenom',       check: v => v.length >= 2 },
  { id: 'nom',          error: 'error-nom',           check: v => v.length >= 2 },
  { id: 'etablissement',error: 'error-etablissement', check: v => v.length >= 2 },
  { id: 'email',        error: 'error-email',         check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
];

validations.forEach(({ id, error, check }) => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('blur', () => validateField(input, error, check));
  input.addEventListener('input', () => {
    if (input.classList.contains('is-error')) validateField(input, error, check);
  });
});

// Gestion du formulaire Formspree (AJAX)
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

function showFeedback(el) {
  // Cache les deux messages
  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');
  // Force reflow pour relancer les animations CSS
  void el.offsetWidth;
  el.classList.remove('hidden');
}

function setLoading(on) {
  const submitBtn = document.getElementById('btn-submit');
  const text = document.getElementById('btn-submit-text');
  const dots = document.getElementById('btn-submit-dots');
  submitBtn.disabled = on;
  text.classList.toggle('hidden', on);
  dots.classList.toggle('hidden', !on);
}

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    setLoading(true);
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        setLoading(false);
        showFeedback(successMsg);
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      setLoading(false);
      showFeedback(errorMsg);
    }
  });
}
