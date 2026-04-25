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
    <h1 id="legal-modal-title">Mentions légales</h1>
    <h2>Éditeur du site</h2>
    <p>ClearCup<br>Fribourg, Suisse<br>Email : info@clearcup.ch</p>
    <h2>Responsable de la publication</h2>
    <p>L'équipe ClearCup — info@clearcup.ch</p>
    <h2>Hébergement</h2>
    <p>Ce site est hébergé par GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA).</p>
  `,
  confidentialite: `
    <h1 id="legal-modal-title">Politique de confidentialité</h1>
    <p>Conformément à la Loi fédérale suisse sur la protection des données (nLPD) et au Règlement général européen sur la protection des données (RGPD), nous vous informons ci-dessous de manière transparente sur le traitement de vos données personnelles.</p>

    <h2>Responsable du traitement</h2>
    <p>ClearCup<br>Fribourg, Suisse<br>Email : info@clearcup.ch</p>

    <h2>Données collectées</h2>
    <p><strong>Formulaire d'inscription :</strong> si vous saisissez votre adresse email, celle-ci est collectée et conservée afin de vous informer du lancement du produit ou de vous envoyer des communications liées à ClearCup. Vous pouvez demander sa suppression à tout moment.</p>
    <p><strong>Données de navigation (Google Analytics 4) :</strong> uniquement si vous avez donné votre consentement, nous collectons des données anonymisées de navigation (pages visitées, durée de visite, source du trafic, type d'appareil). Aucun identifiant personnel direct n'est collecté via cet outil.</p>

    <h2>Finalité du traitement</h2>
    <p>Les adresses email collectées sont utilisées exclusivement pour vous informer du lancement et des actualités de ClearCup. Les données de navigation sont utilisées pour mesurer l'audience du site et améliorer l'expérience utilisateur.</p>

    <h2>Services tiers et transfert à l'étranger</h2>
    <p>Ce site intègre <strong>Google Analytics 4</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Si vous avez accepté les cookies analytiques, des données de navigation sont transmises à Google et peuvent être traitées sur des serveurs situés hors de Suisse, notamment aux États-Unis. Google LLC adhère au Data Privacy Framework UE–États-Unis. Pour en savoir plus : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>
    <p>Ce site est hébergé par <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). Lors de chaque visite, votre adresse IP est traitée par GitHub à des fins techniques. Pour en savoir plus : <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">politique de confidentialité de GitHub</a>.</p>

    <h2>Durée de conservation</h2>
    <p>Les adresses email sont conservées jusqu'à votre désinscription ou demande de suppression. Les données Google Analytics sont conservées 14 mois sur les serveurs de Google, conformément aux paramètres de rétention configurés.</p>

    <h2>Cookies et stockage local</h2>
    <p>Ce site utilise le stockage local de votre navigateur (localStorage) pour mémoriser votre choix concernant Google Analytics. Aucun cookie tiers n'est déposé sans votre consentement préalable. Vous pouvez modifier votre choix à tout moment en vidant le stockage local de votre navigateur.</p>

    <h2>Comment refuser le traitement par Google Analytics</h2>
    <p>Vous pouvez retirer votre consentement à tout moment via la bannière de cookies ou en installant l'<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">extension de désactivation de Google Analytics</a> pour votre navigateur.</p>

    <h2>Vos droits</h2>
    <p>Conformément à la nLPD et au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, d'opposition et de portabilité de vos données. Pour exercer ces droits, contactez-nous à info@clearcup.ch. Vous avez également le droit de déposer une réclamation auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT).</p>

    <h2>Contact</h2>
    <p>Pour toute question relative à la protection de vos données : info@clearcup.ch</p>
  `
};

const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function trapFocus(e) {
  const focusable = Array.from(legalModal.querySelectorAll(focusableSelectors));
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
}

function openLegal(type) {
  legalContent.innerHTML = legalTexts[type];
  legalModal.classList.remove('hidden', 'is-closing');
  requestAnimationFrame(() => legalModal.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  legalModal.addEventListener('keydown', trapFocus);
  setTimeout(() => legalClose.focus(), 350);
}

function closeLegal() {
  legalModal.classList.remove('is-open');
  legalModal.classList.add('is-closing');
  legalModal.removeEventListener('keydown', trapFocus);
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

legalModal.addEventListener('click', (e) => {
  if (e.target === legalModal) closeLegal();
});

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

// ── Word reveal ──
document.querySelectorAll('[data-word-reveal]').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) =>
    `<span class="word-wrap"><span class="word" style="transition-delay:${i * 50}ms">${w}</span></span>`
  ).join(' ');
});

const wordRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('words-revealed');
      wordRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-word-reveal]').forEach(el => wordRevealObserver.observe(el));

// ── Variable font weight reveal ──
const vfObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vf-revealed');
      vfObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-vf-reveal]').forEach(el => vfObserver.observe(el));

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

// Navbar hide/show au scroll
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 80;
  navbar.classList.toggle('nav-hidden', scrollingDown);
  lastScrollY = currentScrollY;
}, { passive: true });

// ── Compteurs animés ──
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function runCounter(el) {
  if (el.dataset.counter !== undefined) {
    const to     = parseInt(el.dataset.to);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) { el.textContent = prefix + to + suffix; return; }
    const duration = 1600;
    const start = performance.now();
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
    if (prefersReducedMotion) { el.textContent = to1 + '–' + to2 + suffix; return; }
    const duration = 1600;
    const start = performance.now();
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
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'true' : 'false');
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
  input.setAttribute('aria-invalid', valid ? 'false' : 'true');
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

// ── Dark mode easter egg ──
const darkEgg      = document.getElementById('dark-egg');
const darkToast    = document.getElementById('dark-toast');
const darkIconMoon = document.getElementById('dark-icon-moon');
const darkIconSun  = document.getElementById('dark-icon-sun');
const navLogo      = document.querySelector('.nav-logo img');
let toastTimer;

function updateDarkIcon(on) {
  if (!darkIconMoon || !darkIconSun) return;
  darkIconMoon.classList.toggle('hidden', on);
  darkIconSun.classList.toggle('hidden', !on);
}

function updateLogo(on) {
  if (!navLogo) return;
  navLogo.src = on ? 'ASSET_CC/logo-dark.svg' : 'ASSET_CC/logo.svg';
}

function setDarkMode(on) {
  document.body.classList.add('dark-transitioning');
  document.body.classList.toggle('dark', on);
  localStorage.setItem('cc_dark', on ? '1' : '0');

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = on ? '#0B0B14' : '#FFFFFF';

  setTimeout(() => document.body.classList.remove('dark-transitioning'), 600);

  updateDarkIcon(on);
  updateLogo(on);

  clearTimeout(toastTimer);
  darkToast.textContent = on ? '🌙 Mode nuit activé' : '☀️ Mode jour activé';
  darkToast.classList.remove('hidden');
  requestAnimationFrame(() => requestAnimationFrame(() => darkToast.classList.add('is-visible')));
  toastTimer = setTimeout(() => {
    darkToast.classList.remove('is-visible');
    darkToast.addEventListener('transitionend', () => darkToast.classList.add('hidden'), { once: true });
  }, 2200);
}

// Restaure la préférence au chargement (sans transition)
if (localStorage.getItem('cc_dark') === '1') {
  document.body.classList.add('dark');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = '#0B0B14';
  updateDarkIcon(true);
  updateLogo(true);
}

darkEgg?.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('dark'));
});

// ── Parallax hero ──
const heroImgEl   = document.querySelector('.hero-img');
const heroSection = document.getElementById('hero');

if (heroImgEl && heroSection && !prefersReducedMotion) {
  const desktopMQ = window.matchMedia('(min-width: 768px)');
  window.addEventListener('scroll', () => {
    if (!desktopMQ.matches) return;
    if (heroSection.getBoundingClientRect().bottom > 0) {
      heroImgEl.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// ── Effet magnétique sur les boutons CTA ──
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const deltaX = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const deltaY = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── Confetti ──
function launchConfetti() {
  if (prefersReducedMotion) return;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const colors = ['#64A4F6', '#000000', '#B8D4F8', '#4A90D9', '#FFFFFF'];
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.72;

  const particles = Array.from({ length: 110 }, () => ({
    x: cx + (Math.random() - 0.5) * 80,
    y: cy,
    vx: (Math.random() - 0.5) * 15,
    vy: -(Math.random() * 18 + 6),
    color: colors[Math.floor(Math.random() * colors.length)],
    w: Math.random() * 10 + 4,
    h: Math.random() * 5 + 3,
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.25,
  }));

  const duration = 3200;
  let t0 = null;

  (function draw(ts) {
    if (!t0) t0 = ts;
    const elapsed = ts - t0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.35;
      p.vx  *= 0.98;
      p.rot += p.rotV;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - elapsed / duration);
      ctx.fillStyle   = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) requestAnimationFrame(draw);
    else canvas.remove();
  })(performance.now());
}

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
        launchConfetti();
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      setLoading(false);
      showFeedback(errorMsg);
    }
  });
}
