# ClearCup Styling Neo-Brutaliste — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Appliquer le design system neo-brutaliste (Bagel Fat One + Arimo, hard shadows, fonds alternés blanc/#64A4F6, mascotte flottante, reveal animations) sur le site ClearCup existant.

**Architecture:** 3 fichiers modifiés — `css/styles.css` (design system complet), `index.html` (refonte HTML avec classes DA, images, mascotte), `js/main.js` (IntersectionObserver + ripple, smooth scroll conservé). Tailwind CDN reste pour les utilitaires de layout (grid, flex, padding). Les composants stylés utilisent des classes CSS custom.

**Tech Stack:** HTML5, Tailwind CSS CDN (layout), CSS custom (design system), JavaScript vanilla, Google Fonts (Bagel Fat One + Arimo)

---

## Structure des fichiers

```
ClearCup/
├── index.html          ← Refonte complète : Google Fonts, classes DA, mascotte, data-reveal
├── css/styles.css      ← Réécriture complète : variables, typo, composants, animations
├── js/main.js          ← Ajout IntersectionObserver + ripple (smooth scroll conservé)
└── ASSET_CC/
    ├── logo.svg
    ├── hero-product.png
    ├── mascot.svg
    ├── step-coller.png
    ├── step-paille.png
    └── step-proteger.png
```

---

## Task 1 : CSS Design System

**Files:**
- Rewrite: `css/styles.css`

- [ ] **Étape 1 : Réécrire `css/styles.css` avec le contenu exact suivant**

```css
/* ClearCup — Design System Neo-Brutaliste */

/* ── Variables ── */
:root {
  --white: #FFFFFF;
  --blue: #64A4F6;
  --black: #000000;
  --shadow-dark: 4px 4px 0 #000000;
  --shadow-blue: 4px 4px 0 #64A4F6;
  --shadow-dark-sm: 2px 2px 0 #000000;
  --shadow-blue-sm: 2px 2px 0 #64A4F6;
  --radius-card: 1.5rem;
  --radius-btn: 9999px;
  --border: 2px solid #000000;
}

/* ── Scroll offset ── */
html {
  scroll-padding-top: 4rem;
}

/* ── Base ── */
body {
  font-family: 'Arimo', sans-serif;
  background-color: var(--white);
  color: var(--black);
}

/* ── Typography ── */
h1 {
  font-family: 'Bagel Fat One', cursive;
  font-size: clamp(2.5rem, 5vw, 5rem);
  text-transform: uppercase;
  line-height: 1.1;
}

h2 {
  font-family: 'Bagel Fat One', cursive;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  text-transform: uppercase;
  line-height: 1.15;
}

h3 {
  font-family: 'Bagel Fat One', cursive;
  font-size: clamp(1rem, 2vw, 1.4rem);
  text-transform: uppercase;
}

.eyebrow {
  font-family: 'Arimo', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* ── Navbar ── */
#navbar {
  background: var(--white);
  border-bottom: var(--border);
}

.nav-logo {
  font-family: 'Bagel Fat One', cursive;
  font-size: 1.4rem;
  text-transform: uppercase;
  color: var(--black);
  text-decoration: none;
}

/* ── Bouton principal (fond noir) ── */
.btn-primary {
  display: inline-block;
  background: var(--black);
  color: var(--white);
  border: var(--border);
  border-radius: var(--radius-btn);
  padding: 0.75rem 2rem;
  font-family: 'Arimo', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: var(--shadow-dark);
  transition: transform 100ms ease, box-shadow 100ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-dark-sm);
}

/* ── Bouton submit pleine largeur ── */
.btn-submit {
  width: 100%;
  background: var(--black);
  color: var(--white);
  border: var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
  font-family: 'Arimo', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: var(--shadow-dark);
  transition: transform 100ms ease, box-shadow 100ms ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-submit:hover:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-dark-sm);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Ripple ── */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transform: scale(0);
  animation: ripple-anim 500ms linear;
  pointer-events: none;
}

@keyframes ripple-anim {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* ── Cards (sur fond bleu) ── */
.card {
  border: var(--border);
  border-radius: var(--radius-card);
  padding: 2rem;
  background: var(--white);
  box-shadow: var(--shadow-dark);
  transition: transform 100ms ease, box-shadow 100ms ease;
}

.card:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-dark-sm);
}

/* ── Cards step (sur fond blanc) ── */
.step-card {
  border: var(--border);
  border-radius: var(--radius-card);
  padding: 2rem 1.5rem;
  background: var(--white);
  box-shadow: var(--shadow-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  transition: transform 100ms ease, box-shadow 100ms ease;
}

.step-card:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-dark-sm);
}

.step-img {
  width: 100%;
  max-height: 160px;
  object-fit: contain;
}

.step-number {
  font-family: 'Bagel Fat One', cursive;
  font-size: 3rem;
  color: var(--blue);
  line-height: 1;
}

/* ── Stat number ── */
.stat-number {
  font-family: 'Bagel Fat One', cursive;
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-transform: uppercase;
  line-height: 1;
  color: var(--black);
}

/* ── Inputs ── */
.input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  border: var(--border);
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-family: 'Arimo', sans-serif;
  font-size: 1rem;
  color: var(--black);
  transition: border-color 150ms ease, background 150ms ease;
}

.input-field::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.input-field:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.85);
  border-color: var(--black);
}

/* ── Mascotte ── */
.mascotte {
  position: absolute;
  bottom: 2rem;
  right: -1rem;
  width: 110px;
  z-index: 10;
  animation: float 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.section-relative {
  position: relative;
  overflow: hidden;
}

/* ── Reveal animations ── */
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

[data-reveal-delay="1"] { transition-delay: 100ms; }
[data-reveal-delay="2"] { transition-delay: 200ms; }
[data-reveal-delay="3"] { transition-delay: 300ms; }
[data-reveal-delay="4"] { transition-delay: 400ms; }

/* ── Prevent iOS zoom ── */
@media screen and (max-width: 768px) {
  input, textarea {
    font-size: 16px;
  }
  .mascotte {
    width: 75px;
  }
}
```

- [ ] **Étape 2 : Vérifier que le fichier est sauvegardé**

```bash
wc -l /Users/samuelfabrizzi/ClearCup/css/styles.css
```
Expected: environ 200 lignes.

- [ ] **Étape 3 : Commit**

```bash
cd /Users/samuelfabrizzi/ClearCup
git add css/styles.css
git commit -m "feat: design system neo-brutaliste CSS"
```

---

## Task 2 : HTML — Refonte complète index.html

**Files:**
- Rewrite: `index.html`

- [ ] **Étape 1 : Réécrire `index.html` avec le contenu exact suivant**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ClearCup — Protégez vos clients</title>
  <meta name="description" content="ClearCup est un sticker vinyle anti-soumission chimique pour bars, clubs et festivals. Simple, efficace, accessible." />
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Arimo:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
  <!-- Tailwind CDN (layout utilities) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>

  <!-- NAVBAR -->
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="#hero" class="nav-logo flex items-center gap-2">
        <img src="ASSET_CC/logo.svg" alt="ClearCup" class="h-8 w-auto"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block'" />
        <span class="hidden">ClearCup</span>
      </a>
      <a href="#contact" class="btn-primary">Demander un devis</a>
    </div>
  </nav>
  <div class="h-16"></div>

  <!-- HERO — fond blanc -->
  <section id="hero" class="min-h-screen flex items-center" style="background: var(--white);">
    <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div data-reveal>
        <p class="eyebrow mb-4" style="color: var(--blue);">Protection. Empowerment.</p>
        <h1 class="mb-6">Protégez<br />vos clients.</h1>
        <p class="mb-8" style="font-size: 1.125rem; max-width: 480px; font-family: 'Arimo', sans-serif;">
          ClearCup est un sticker vinyle qui couvre les verres dans vos établissements
          — une solution simple contre la soumission chimique en soirée.
        </p>
        <a href="#contact" class="btn-primary">Demander un devis</a>
      </div>
      <div class="flex justify-center" data-reveal data-reveal-delay="1">
        <img src="ASSET_CC/hero-product.png" alt="Sticker ClearCup sur un verre"
             class="w-full max-h-96 object-contain"
             onerror="this.outerHTML='<div style=&quot;height:320px;border:2px solid #000;border-radius:1.5rem;display:flex;align-items:center;justify-content:center;color:#999;&quot;>[hero-product.png]</div>'" />
      </div>
    </div>
  </section>

  <!-- PROBLÈME — fond bleu -->
  <section id="probleme" class="py-24 section-relative" style="background: var(--blue);">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <p class="eyebrow mb-4" data-reveal>Le contexte</p>
      <h2 class="mb-8" data-reveal>La soumission chimique,<br />un risque réel</h2>
      <div class="grid md:grid-cols-2 gap-8 text-left mt-12">
        <div class="card" data-reveal data-reveal-delay="1">
          <p class="stat-number mb-2">1 sur 8</p>
          <p style="font-family: 'Arimo', sans-serif;">jeunes adultes déclare avoir été victime ou avoir craint une soumission chimique lors d'une soirée (source : études européennes de prévention).</p>
        </div>
        <div class="card" data-reveal data-reveal-delay="2">
          <p class="stat-number mb-2">82%</p>
          <p style="font-family: 'Arimo', sans-serif;">des cas se produisent dans des bars, clubs ou festivals — des lieux où les verres sont posés, partagés, perdus de vue.</p>
        </div>
      </div>
      <p class="mt-10" style="font-family: 'Arimo', sans-serif; opacity: 0.85;" data-reveal>
        En tant qu'établissement, proposer une solution concrète, c'est protéger vos clients
        et affirmer votre engagement pour une soirée sûre.
      </p>
    </div>
    <img src="ASSET_CC/mascot.svg" alt="" class="mascotte" aria-hidden="true"
         onerror="this.style.display='none'" />
  </section>

  <!-- COMMENT ÇA MARCHE — fond blanc -->
  <section id="comment" class="py-24 section-relative" style="background: var(--white);">
    <div class="max-w-5xl mx-auto px-6 text-center">
      <p class="eyebrow mb-4" style="color: var(--blue);" data-reveal>Simple à utiliser</p>
      <h2 class="mb-16" data-reveal>Comment ça marche</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="step-card" data-reveal data-reveal-delay="1">
          <img src="ASSET_CC/step-coller.png" alt="Prendre le sticker" class="step-img"
               onerror="this.outerHTML='<div style=&quot;height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;&quot;>📌</div>'" />
          <p class="step-number">01</p>
          <h3>Prendre</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Sortez le sticker ClearCup de son emballage.</p>
        </div>
        <div class="step-card" data-reveal data-reveal-delay="2">
          <img src="ASSET_CC/step-paille.png" alt="Coller le sticker sur le verre" class="step-img"
               onerror="this.outerHTML='<div style=&quot;height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;&quot;>🥤</div>'" />
          <p class="step-number">02</p>
          <h3>Coller</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Le sticker adhère sur n'importe quel verre en quelques secondes.</p>
        </div>
        <div class="step-card" data-reveal data-reveal-delay="3">
          <img src="ASSET_CC/step-proteger.png" alt="Transpercer avec une paille et profiter" class="step-img"
               onerror="this.outerHTML='<div style=&quot;height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;&quot;>🛡️</div>'" />
          <p class="step-number">03</p>
          <h3>Profiter</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Transpercer avec une paille et profitez — verre couvert, soirée sécurisée.</p>
        </div>
      </div>
    </div>
    <img src="ASSET_CC/mascot.svg" alt="" class="mascotte" aria-hidden="true"
         style="left: -1rem; right: auto;"
         onerror="this.style.display='none'" />
  </section>

  <!-- POUR QUI — fond bleu -->
  <section id="pour-qui" class="py-24 section-relative" style="background: var(--blue);">
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="eyebrow mb-4" data-reveal>Nos partenaires</p>
        <h2 data-reveal>Fait pour votre<br />établissement</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="card" data-reveal data-reveal-delay="1">
          <p style="font-size: 2rem; margin-bottom: 0.75rem;">🍸</p>
          <h3 class="mb-2">Bars & clubs</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Offrez à vos clients une soirée en confiance. Différenciez-vous par votre engagement sécurité.</p>
        </div>
        <div class="card" data-reveal data-reveal-delay="2">
          <p style="font-size: 2rem; margin-bottom: 0.75rem;">🎪</p>
          <h3 class="mb-2">Festivals & événements</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Distribuez ClearCup à l'entrée ou aux bars. Simple à déployer à grande échelle, sans logistique lourde.</p>
        </div>
        <div class="card" data-reveal data-reveal-delay="3">
          <p style="font-size: 2rem; margin-bottom: 0.75rem;">🤝</p>
          <h3 class="mb-2">Associations de prévention</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Un outil concret à distribuer lors de vos actions de sensibilisation auprès des jeunes.</p>
        </div>
        <div class="card" data-reveal data-reveal-delay="4">
          <p style="font-size: 2rem; margin-bottom: 0.75rem;">🎓</p>
          <h3 class="mb-2">Établissements universitaires</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Intégrez ClearCup dans votre politique de bien-être étudiant lors des soirées et événements campus.</p>
        </div>
      </div>
    </div>
    <img src="ASSET_CC/mascot.svg" alt="" class="mascotte" aria-hidden="true"
         onerror="this.style.display='none'" />
  </section>

  <!-- POURQUOI INVESTIR — fond blanc -->
  <section id="pourquoi" class="py-24 section-relative" style="background: var(--white);">
    <div class="max-w-5xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="eyebrow mb-4" style="color: var(--blue);" data-reveal>Pourquoi ClearCup</p>
        <h2 data-reveal>Un investissement<br />qui fait sens</h2>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="card text-center" data-reveal data-reveal-delay="1">
          <div style="width:3.5rem;height:3.5rem;background:var(--blue);border-radius:50%;border:var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
            <span style="font-size:1.25rem;">✓</span>
          </div>
          <h3 class="mb-2">Responsabilité</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Montrez à vos clients que leur sécurité est une priorité. Un geste fort, visible, apprécié.</p>
        </div>
        <div class="card text-center" data-reveal data-reveal-delay="2">
          <div style="width:3.5rem;height:3.5rem;background:var(--blue);border-radius:50%;border:var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
            <span style="font-size:1.25rem;">⚡</span>
          </div>
          <h3 class="mb-2">Simplicité</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Aucune formation, aucune installation. On colle, c'est fait. Ça s'intègre à n'importe quel service.</p>
        </div>
        <div class="card text-center" data-reveal data-reveal-delay="3">
          <div style="width:3.5rem;height:3.5rem;background:var(--blue);border-radius:50%;border:var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
            <span style="font-size:1.25rem;">💶</span>
          </div>
          <h3 class="mb-2">Accessibilité</h3>
          <p style="font-family: 'Arimo', sans-serif; font-size: 0.9rem;">Tarifs modulables selon les volumes. Adaptés aux petits bars comme aux grands festivals.</p>
        </div>
      </div>
    </div>
    <img src="ASSET_CC/mascot.svg" alt="" class="mascotte" aria-hidden="true"
         style="left: -1rem; right: auto;"
         onerror="this.style.display='none'" />
  </section>

  <!-- CONTACT — fond bleu -->
  <section id="contact" class="py-24 section-relative" style="background: var(--blue);">
    <div class="max-w-2xl mx-auto px-6 text-center">
      <p class="eyebrow mb-4" data-reveal>Contact</p>
      <h2 class="mb-4" data-reveal>Devenir partenaire</h2>
      <p class="mb-12" style="font-family: 'Arimo', sans-serif;" data-reveal>Remplissez le formulaire, on vous répond sous 48h.</p>

      <form id="contact-form"
            action="https://formspree.io/f/XXXXXXXX"
            method="POST"
            class="text-left space-y-4"
            data-reveal>

        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label for="prenom" class="block text-sm font-bold mb-1" style="font-family:'Arimo',sans-serif;">Prénom</label>
            <input id="prenom" type="text" name="prenom" required class="input-field" placeholder="Sam" />
          </div>
          <div>
            <label for="nom" class="block text-sm font-bold mb-1" style="font-family:'Arimo',sans-serif;">Nom</label>
            <input id="nom" type="text" name="nom" required class="input-field" placeholder="Fabrizzi" />
          </div>
        </div>

        <div>
          <label for="etablissement" class="block text-sm font-bold mb-1" style="font-family:'Arimo',sans-serif;">Établissement</label>
          <input id="etablissement" type="text" name="etablissement" required class="input-field"
                 placeholder="Bar Le Central, Festival XYZ..." />
        </div>

        <div>
          <label for="email" class="block text-sm font-bold mb-1" style="font-family:'Arimo',sans-serif;">Email professionnel</label>
          <input id="email" type="email" name="email" required class="input-field"
                 placeholder="contact@votreétablissement.ch" />
        </div>

        <div>
          <label for="message" class="block text-sm font-bold mb-1" style="font-family:'Arimo',sans-serif;">
            Message <span style="opacity:0.6;">(optionnel)</span>
          </label>
          <textarea id="message" name="message" rows="4" class="input-field" style="resize:none;"
                    placeholder="Volume estimé, date d'événement, questions..."></textarea>
        </div>

        <button type="submit" class="btn-submit">Envoyer ma demande</button>

        <div id="form-success" class="hidden text-center py-4 font-bold" style="font-family:'Arimo',sans-serif;">
          ✓ Message envoyé ! On revient vers vous sous 48h.
        </div>
        <div id="form-error" class="hidden text-center py-4 font-bold" style="font-family:'Arimo',sans-serif;">
          Une erreur s'est produite. Réessayez ou écrivez-nous directement.
        </div>
      </form>

      <div class="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
           style="border-top: 2px solid rgba(0,0,0,0.2); font-family:'Arimo',sans-serif; font-size:0.875rem;">
        <p>© 2026 ClearCup — Fribourg, Suisse</p>
        <a href="https://instagram.com/clearcup" target="_blank" rel="noopener"
           style="font-weight:700;color:var(--black);text-decoration:none;">Instagram @clearcup</a>
      </div>
    </div>
    <img src="ASSET_CC/mascot.svg" alt="" class="mascotte" aria-hidden="true"
         onerror="this.style.display='none'" />
  </section>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Ouvrir `index.html` dans Chrome. Vérifier :
- La police Bagel Fat One charge sur les titres (réseau requis)
- Les fonds alternent blanc → bleu → blanc → bleu → blanc → bleu
- Les cards s'affichent avec border noire + hard shadow
- La navbar est fixe avec border-bottom

- [ ] **Étape 3 : Commit**

```bash
cd /Users/samuelfabrizzi/ClearCup
git add index.html
git commit -m "feat: HTML refonte DA neo-brutaliste"
```

---

## Task 3 : JS — Reveal animations + micro-interactions

**Files:**
- Rewrite: `js/main.js`

- [ ] **Étape 1 : Réécrire `js/main.js` avec le contenu exact suivant**

```js
// ClearCup — interactivité

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Reveal on scroll (IntersectionObserver) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// ── Ripple effect on submit button ──
const submitBtn = document.querySelector('.btn-submit');
if (submitBtn) {
  submitBtn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// ── Formspree AJAX ──
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
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
        successMsg.classList.remove('hidden');
        btn.textContent = 'Envoyer ma demande';
        btn.disabled = false;
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      errorMsg.classList.remove('hidden');
      btn.textContent = 'Envoyer ma demande';
      btn.disabled = false;
    }
  });
}
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Ouvrir `index.html`. Scroller lentement vers le bas. Les sections et cards doivent apparaître progressivement (fade-up). Cliquer sur "Envoyer ma demande" — l'effet ripple doit être visible.

- [ ] **Étape 3 : Commit**

```bash
cd /Users/samuelfabrizzi/ClearCup
git add js/main.js
git commit -m "feat: reveal animations et micro-interactions JS"
```

---

## Checklist avant de mettre les assets

- [ ] Déposer `ASSET_CC/logo.svg`
- [ ] Déposer `ASSET_CC/hero-product.png`
- [ ] Déposer `ASSET_CC/mascot.svg`
- [ ] Déposer `ASSET_CC/step-coller.png`
- [ ] Déposer `ASSET_CC/step-paille.png`
- [ ] Déposer `ASSET_CC/step-proteger.png`
- [ ] Ouvrir `index.html` avec les vrais assets et vérifier le rendu final
