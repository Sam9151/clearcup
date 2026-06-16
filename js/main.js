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

// Detect page language
const pageLang = (function() {
  const l = document.documentElement.lang || 'fr';
  if (l.startsWith('de')) return 'de';
  if (l.startsWith('en')) return 'en';
  return 'fr';
})();

const allLegalTexts = {
  fr: {
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
      <p>Conformément à la Loi fédérale sur la protection des données (LPD) et au Règlement général sur la protection des données (RGPD), nous vous informons ci-dessous de manière transparente sur le traitement de vos données personnelles.</p>
      <h2>Responsable du traitement</h2>
      <p>ClearCup<br>Fribourg, Suisse<br>Email : info@clearcup.ch</p>
      <h2>Données collectées et finalités</h2>
      <p><strong>Formulaire de contact :</strong> nom, adresse email et message collectés via Formspree (Formspree Inc., USA) dans le but de répondre à vos demandes commerciales. Formspree est soumis au Privacy Shield UE-États-Unis. Données conservées le temps nécessaire au traitement de votre demande.</p>
      <p><strong>Analyse d'audience :</strong> si vous avez accepté les cookies analytiques, nous utilisons Google Analytics (Google Ireland Limited) pour mesurer l'audience du site de manière anonymisée. L'anonymisation de l'IP est activée. Données conservées 14 mois.</p>
      <p><strong>Polices :</strong> les polices utilisées sur ce site sont auto-hébergées. Aucune donnée n'est transmise à Google Fonts ou à tout autre service tiers pour le chargement des polices.</p>
      <p><strong>Cookies :</strong> voir notre politique de cookies accessible via la bannière de consentement.</p>
      <h2>Services tiers et transfert à l'étranger</h2>
      <p>Ce site intègre <strong>Google Analytics 4</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) uniquement avec votre consentement. Google LLC adhère au Data Privacy Framework UE–États-Unis.</p>
      <p>Ce site est hébergé par <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). Votre adresse IP est traitée par GitHub à des fins techniques.</p>
      <p>Le formulaire de contact est traité par <strong>Formspree</strong> (Formspree Inc., 1941 N. Alamo St, San Antonio, TX 78215, USA). Les données soumises via le formulaire sont transmises à Formspree.</p>
      <h2>Cookies et stockage local</h2>
      <p>Ce site utilise le stockage local de votre navigateur (localStorage) pour mémoriser votre choix de consentement. Aucun cookie tiers n'est déposé sans votre consentement préalable.</p>
      <h2>Droits des utilisateurs</h2>
      <p>Conformément à la Loi fédérale sur la protection des données (LPD) et au Règlement général sur la protection des données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition au traitement de vos données personnelles. Contactez-nous à info@clearcup.ch.</p>
      <p>Vous avez également le droit de déposer une réclamation auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT).</p>
      <h2>Contact</h2>
      <p>Pour toute question relative à la protection de vos données : info@clearcup.ch</p>
    `
  },
  de: {
    mentions: `
      <h1 id="legal-modal-title">Impressum</h1>
      <h2>Herausgeber</h2>
      <p>ClearCup<br>Freiburg, Schweiz<br>E-Mail: info@clearcup.ch</p>
      <h2>Verantwortlicher für die Veröffentlichung</h2>
      <p>Das ClearCup-Team — info@clearcup.ch</p>
      <h2>Hosting</h2>
      <p>Diese Website wird von GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) gehostet.</p>
    `,
    confidentialite: `
      <h1 id="legal-modal-title">Datenschutzerklärung</h1>
      <p>Gemäss dem Bundesgesetz über den Datenschutz (DSG) und der Datenschutz-Grundverordnung (DSGVO) informieren wir Sie nachfolgend transparent über die Bearbeitung Ihrer Personendaten.</p>
      <h2>Verantwortlicher</h2>
      <p>ClearCup<br>Freiburg, Schweiz<br>E-Mail: info@clearcup.ch</p>
      <h2>Erhobene Daten und Zwecke</h2>
      <p><strong>Kontaktformular:</strong> Name, E-Mail-Adresse und Nachricht werden über Formspree (Formspree Inc., USA) erhoben, um Ihre Geschäftsanfragen zu bearbeiten. Die Daten werden nur so lange aufbewahrt, wie es für die Bearbeitung Ihrer Anfrage erforderlich ist.</p>
      <p><strong>Besucheranalyse:</strong> Wenn Sie der Nutzung von Analyse-Cookies zugestimmt haben, verwenden wir Google Analytics (Google Ireland Limited), um die Besucherzahlen der Website anonymisiert zu messen. Die IP-Anonymisierung ist aktiviert. Die Daten werden 14 Monate aufbewahrt.</p>
      <p><strong>Schriftarten:</strong> Die auf dieser Website verwendeten Schriftarten sind selbst gehostet. Es werden keine Daten an Google Fonts oder andere Drittanbieter übermittelt.</p>
      <p><strong>Cookies:</strong> Informationen zu Cookies finden Sie in unserem Cookie-Hinweis, der beim ersten Besuch erscheint.</p>
      <h2>Drittanbieter und Übermittlung ins Ausland</h2>
      <p>Diese Website integriert <strong>Google Analytics 4</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) ausschliesslich mit Ihrer Einwilligung. Google LLC nimmt am EU-US-Datenschutzrahmen teil.</p>
      <p>Diese Website wird von <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA) gehostet. Ihre IP-Adresse wird von GitHub für technische Zwecke verarbeitet.</p>
      <p>Das Kontaktformular wird von <strong>Formspree</strong> (Formspree Inc., 1941 N. Alamo St, San Antonio, TX 78215, USA) verarbeitet.</p>
      <h2>Cookies und lokaler Speicher</h2>
      <p>Diese Website verwendet den lokalen Speicher Ihres Browsers (localStorage), um Ihre Einwilligungsentscheidung zu speichern. Ohne Ihre ausdrückliche Einwilligung werden keine Drittanbieter-Cookies gesetzt.</p>
      <h2>Ihre Rechte</h2>
      <p>Gemäss dem Bundesgesetz über den Datenschutz (DSG) und der Datenschutz-Grundverordnung (DSGVO) haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer Personendaten. Kontaktieren Sie uns unter info@clearcup.ch.</p>
      <p>Sie haben ausserdem das Recht, eine Beschwerde beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) einzureichen.</p>
      <h2>Kontakt</h2>
      <p>Bei Fragen zum Datenschutz: info@clearcup.ch</p>
    `
  },
  en: {
    mentions: `
      <h1 id="legal-modal-title">Legal Notice</h1>
      <h2>Publisher</h2>
      <p>ClearCup<br>Fribourg, Switzerland<br>Email: info@clearcup.ch</p>
      <h2>Publication Manager</h2>
      <p>The ClearCup team — info@clearcup.ch</p>
      <h2>Hosting</h2>
      <p>This website is hosted by GitHub Pages (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA).</p>
    `,
    confidentialite: `
      <h1 id="legal-modal-title">Privacy Policy</h1>
      <p>In accordance with the Swiss Federal Act on Data Protection (FADP) and the General Data Protection Regulation (GDPR), we inform you transparently about the processing of your personal data.</p>
      <h2>Data Controller</h2>
      <p>ClearCup<br>Fribourg, Switzerland<br>Email: info@clearcup.ch</p>
      <h2>Data Collected and Purposes</h2>
      <p><strong>Contact Form:</strong> name, email address and message are collected via Formspree (Formspree Inc., USA) for the purpose of responding to your commercial inquiries. Data is retained for as long as necessary to process your request.</p>
      <p><strong>Traffic Analysis:</strong> if you have accepted analytical cookies, we use Google Analytics (Google Ireland Limited) to measure website audience in an anonymized manner. IP anonymization is enabled. Data is retained for 14 months.</p>
      <p><strong>Fonts:</strong> the fonts used on this website are self-hosted. No data is transmitted to Google Fonts or any other third-party service for font loading.</p>
      <p><strong>Cookies:</strong> see our cookie policy accessible via the consent banner.</p>
      <h2>Third-Party Services and International Transfers</h2>
      <p>This website integrates <strong>Google Analytics 4</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) only with your consent. Google LLC participates in the EU-US Data Privacy Framework.</p>
      <p>This website is hosted by <strong>GitHub Pages</strong> (GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). Your IP address is processed by GitHub for technical purposes.</p>
      <p>The contact form is processed by <strong>Formspree</strong> (Formspree Inc., 1941 N. Alamo St, San Antonio, TX 78215, USA). Data submitted via the form is transmitted to Formspree.</p>
      <h2>Cookies and Local Storage</h2>
      <p>This website uses your browser's local storage (localStorage) to remember your consent choice. No third-party cookies are set without your explicit consent.</p>
      <h2>Your Rights</h2>
      <p>In accordance with the Swiss Federal Act on Data Protection (FADP) and the General Data Protection Regulation (GDPR), you have the right to access, rectify, erase, port and object to the processing of your personal data. Contact us at info@clearcup.ch.</p>
      <p>You also have the right to lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).</p>
      <h2>Contact</h2>
      <p>For any questions regarding data protection: info@clearcup.ch</p>
    `
  }
};

const legalTexts = allLegalTexts[pageLang];

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
const consent = localStorage.getItem('clearcup_consent');

if (consent === 'all') {
  loadGA();
} else if (!consent) {
  cookieBanner.classList.remove('hidden');
}

document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
  localStorage.setItem('clearcup_consent', 'all');
  loadGA();
  cookieBanner.classList.add('hidden');
});

document.getElementById('cookie-essential')?.addEventListener('click', () => {
  localStorage.setItem('clearcup_consent', 'essential');
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
    `<span class="word-wrap"><span class="word" style="transition-delay:${i * 28}ms">${w}</span></span>`
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

// ── Nav overflow → burger mode dynamique ──
// Dès qu'un item du menu desktop passe sur 2 lignes, le burger remplace les liens
(function initNavCollapse() {
  const navbarEl   = document.getElementById('navbar');
  const navLinksEl = document.querySelector('.nav-links');
  const navInnerEl = document.querySelector('.nav-inner');
  if (!navbarEl || !navLinksEl || !navInnerEl) return;

  function checkOverflow() {
    // Rend nav-links temporairement mesurable même si déjà caché
    const prevDisplay    = navLinksEl.style.display;
    const prevVisibility = navLinksEl.style.visibility;
    const prevPosition   = navLinksEl.style.position;

    navLinksEl.style.display    = 'flex';
    navLinksEl.style.visibility = 'hidden';
    navLinksEl.style.position   = 'absolute';

    // scrollWidth > offsetWidth → les items débordent horizontalement
    const overflows = navInnerEl.scrollWidth > navInnerEl.offsetWidth;

    navLinksEl.style.display    = prevDisplay;
    navLinksEl.style.visibility = prevVisibility;
    navLinksEl.style.position   = prevPosition;

    navbarEl.classList.toggle('nav-collapsed', overflows);
  }

  // Observer la largeur du nav-inner
  new ResizeObserver(checkOverflow).observe(navInnerEl);
  // Passe initiale au chargement
  checkOverflow();
})();

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

// ── FAQ open/close animation ──
document.querySelectorAll('.faq-item').forEach(details => {
  const summary = details.querySelector('.faq-question');
  const answer  = details.querySelector('.faq-answer');
  if (!summary || !answer) return;

  summary.addEventListener('click', (e) => {
    e.preventDefault();

    if (details.open) {
      // Fermeture animée
      const height = answer.offsetHeight;
      answer.style.overflow  = 'hidden';
      answer.style.height    = height + 'px';
      answer.style.opacity   = getComputedStyle(answer).opacity;

      requestAnimationFrame(() => {
        answer.style.transition = 'height 240ms cubic-bezier(0.4,0,1,1), opacity 200ms ease-in';
        answer.style.height  = '0';
        answer.style.opacity = '0';

        answer.addEventListener('transitionend', () => {
          details.open = false;
          answer.style.cssText = '';
        }, { once: true });
      });

    } else {
      // Ouverture animée
      details.open = true;
      const height = answer.scrollHeight;
      answer.style.overflow  = 'hidden';
      answer.style.height    = '0';
      answer.style.opacity   = '0';

      requestAnimationFrame(() => requestAnimationFrame(() => {
        answer.style.transition = 'height 300ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease-out';
        answer.style.height  = height + 'px';
        answer.style.opacity = '0.85';

        answer.addEventListener('transitionend', (ev) => {
          if (ev.propertyName !== 'height') return;
          answer.style.cssText = '';
        }, { once: true });
      }));
    }
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

// Lang switcher géré par script inline dans chaque page HTML
