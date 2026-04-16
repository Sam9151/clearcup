# ClearCup Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire un one-pager vitrine B2B pour ClearCup avec formulaire de contact Formspree, hébergé sur Netlify.

**Architecture:** Site statique HTML/CSS/JS vanilla. Une seule page `index.html` avec 6 sections scrollables. Styles custom dans `css/styles.css`, interactivité dans `js/main.js`. Aucun build step, aucune dépendance NPM.

**Tech Stack:** HTML5, Tailwind CSS (CDN), JavaScript vanilla, Formspree, Netlify

---

## Structure des fichiers

```
ClearCup/
├── index.html              # Page unique — toute la structure HTML
├── css/
│   └── styles.css          # Styles custom (animations, overrides Tailwind)
├── js/
│   └── main.js             # Smooth scroll + gestion formulaire Formspree
├── ASSET_CC/               # Assets fournis par l'équipe (à remplir)
│   ├── logo.svg            # Logo ClearCup
│   ├── hero.jpg            # Photo produit principale
│   ├── step-1.png          # Illustration étape "Coller"
│   ├── step-2.png          # Illustration étape "Passer la paille"
│   └── step-3.png          # Illustration étape "Protéger"
├── netlify.toml            # Config Netlify (redirects, headers)
└── .gitignore
```

---

## Task 1 : Setup du projet

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/main.js`
- Create: `netlify.toml`
- Create: `.gitignore`

- [ ] **Étape 1 : Initialiser le dépôt Git**

```bash
cd /Users/samuelfabrizzi/ClearCup
git init
git checkout -b main
```

- [ ] **Étape 2 : Créer les dossiers**

```bash
mkdir -p css js ASSET_CC
```

- [ ] **Étape 3 : Créer `.gitignore`**

Contenu de `.gitignore` :
```
.DS_Store
*.env
```

- [ ] **Étape 4 : Créer `netlify.toml`**

Contenu de `netlify.toml` :
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

- [ ] **Étape 5 : Créer `css/styles.css` vide**

```css
/* ClearCup — styles custom */
```

- [ ] **Étape 6 : Créer `js/main.js` vide**

```js
// ClearCup — interactivité
```

- [ ] **Étape 7 : Commit**

```bash
git add .
git commit -m "chore: setup projet ClearCup website"
```

---

## Task 2 : Squelette HTML + Tailwind CDN

**Files:**
- Modify: `index.html`

- [ ] **Étape 1 : Écrire le squelette `index.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ClearCup — Protégez vos clients</title>
  <meta name="description" content="ClearCup est un sticker vinyle anti-soumission chimique pour bars, clubs et festivals. Simple, efficace, accessible." />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body class="bg-white text-gray-900 font-sans">

  <!-- NAVBAR -->
  <nav id="navbar"></nav>

  <!-- HERO -->
  <section id="hero"></section>

  <!-- PROBLÈME -->
  <section id="probleme"></section>

  <!-- COMMENT ÇA MARCHE -->
  <section id="comment"></section>

  <!-- POUR QUI -->
  <section id="pour-qui"></section>

  <!-- POURQUOI INVESTIR -->
  <section id="pourquoi"></section>

  <!-- CONTACT -->
  <section id="contact"></section>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Ouvrir `index.html` dans Chrome/Safari. La page doit charger sans erreur console. La balise Tailwind CDN doit être active (inspecter l'élément `<body>` — les classes Tailwind doivent fonctionner).

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: squelette HTML + Tailwind CDN"
```

---

## Task 3 : Navbar

**Files:**
- Modify: `index.html` (section `#navbar`)

- [ ] **Étape 1 : Implémenter la navbar**

Remplacer `<nav id="navbar"></nav>` par :

```html
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="#hero" class="flex items-center gap-2">
      <img src="ASSET_CC/logo.svg" alt="ClearCup" class="h-8 w-auto"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='block'" />
      <span class="hidden font-bold text-xl tracking-tight">ClearCup</span>
    </a>
    <!-- CTA -->
    <a href="#contact"
       class="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
      Demander un devis
    </a>
  </div>
</nav>
<!-- Spacer pour compenser la navbar fixe -->
<div class="h-16"></div>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

La navbar doit rester visible en haut en scrollant. Le logo affiche un texte fallback si `ASSET_CC/logo.svg` est absent. Le bouton "Demander un devis" est cliquable.

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: navbar fixe avec CTA"
```

---

## Task 4 : Section Hero

**Files:**
- Modify: `index.html` (section `#hero`)

- [ ] **Étape 1 : Implémenter la section Hero**

Remplacer `<section id="hero"></section>` par :

```html
<section id="hero" class="min-h-screen flex items-center bg-gray-950 text-white">
  <div class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
    <!-- Texte -->
    <div>
      <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Protégez vos clients.<br />Renforcez votre image.
      </h1>
      <p class="text-lg text-gray-300 mb-8">
        ClearCup est un sticker vinyle qui couvre les verres dans vos établissements
        — une solution simple contre la soumission chimique en soirée.
      </p>
      <a href="#contact"
         class="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
        Demander un devis
      </a>
    </div>
    <!-- Visuel -->
    <div class="flex justify-center">
      <img src="ASSET_CC/hero.jpg" alt="Sticker ClearCup sur un verre"
           class="rounded-2xl shadow-2xl max-h-96 object-cover w-full"
           onerror="this.outerHTML='<div class=\'rounded-2xl bg-gray-800 h-80 w-full flex items-center justify-center text-gray-500\'>[Photo produit]</div>'" />
    </div>
  </div>
</section>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

La section occupe toute la hauteur de l'écran. Le texte est lisible sur fond sombre. L'image affiche un placeholder si `ASSET_CC/hero.jpg` est absent. Sur mobile (DevTools → responsive), les deux colonnes passent en une colonne.

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: section hero"
```

---

## Task 5 : Section Problème

**Files:**
- Modify: `index.html` (section `#probleme`)

- [ ] **Étape 1 : Implémenter la section Problème**

Remplacer `<section id="probleme"></section>` par :

```html
<section id="probleme" class="py-24 bg-white">
  <div class="max-w-3xl mx-auto px-6 text-center">
    <p class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Le contexte</p>
    <h2 class="text-3xl md:text-4xl font-bold mb-8">
      La soumission chimique, un risque réel dans les établissements nocturnes
    </h2>
    <div class="grid md:grid-cols-2 gap-8 text-left mt-12">
      <div class="bg-gray-50 rounded-2xl p-8">
        <p class="text-5xl font-bold text-black mb-2">1 sur 8</p>
        <p class="text-gray-600">jeunes adultes déclare avoir été victime ou avoir craint une soumission chimique lors d'une soirée (source : études européennes de prévention).</p>
      </div>
      <div class="bg-gray-50 rounded-2xl p-8">
        <p class="text-5xl font-bold text-black mb-2">82%</p>
        <p class="text-gray-600">des cas se produisent dans des bars, clubs ou festivals — des lieux où les verres sont posés, partagés, perdus de vue.</p>
      </div>
    </div>
    <p class="mt-10 text-gray-500 text-base">
      En tant qu'établissement, proposer une solution concrète, c'est protéger vos clients
      et affirmer votre engagement pour une soirée sûre.
    </p>
  </div>
</section>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Les deux stats s'affichent en deux colonnes sur desktop, en une colonne sur mobile. Le ton est factuel, pas alarmiste.

**Note :** Les chiffres utilisés sont indicatifs. Sam doit les remplacer par des sources vérifiées avant la mise en ligne.

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: section probleme avec stats"
```

---

## Task 6 : Section Comment ça marche

**Files:**
- Modify: `index.html` (section `#comment`)

- [ ] **Étape 1 : Implémenter la section**

Remplacer `<section id="comment"></section>` par :

```html
<section id="comment" class="py-24 bg-gray-950 text-white">
  <div class="max-w-5xl mx-auto px-6 text-center">
    <p class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Simple à utiliser</p>
    <h2 class="text-3xl md:text-4xl font-bold mb-16">Comment ça marche</h2>
    <div class="grid md:grid-cols-3 gap-10">

      <!-- Étape 1 -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <img src="ASSET_CC/step-1.png" alt="Coller le sticker" class="w-10 h-10 object-contain"
               onerror="this.outerHTML='<span class=\'text-3xl\'>📌</span>'" />
        </div>
        <p class="text-4xl font-bold text-white/20">01</p>
        <h3 class="text-xl font-semibold">Coller</h3>
        <p class="text-gray-400 text-sm">Le sticker adhère sur n'importe quel verre en quelques secondes.</p>
      </div>

      <!-- Étape 2 -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <img src="ASSET_CC/step-2.png" alt="Passer la paille" class="w-10 h-10 object-contain"
               onerror="this.outerHTML='<span class=\'text-3xl\'>🥤</span>'" />
        </div>
        <p class="text-4xl font-bold text-white/20">02</p>
        <h3 class="text-xl font-semibold">Passer la paille</h3>
        <p class="text-gray-400 text-sm">Le petit trou central permet d'utiliser le verre normalement.</p>
      </div>

      <!-- Étape 3 -->
      <div class="flex flex-col items-center gap-4">
        <div class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
          <img src="ASSET_CC/step-3.png" alt="Verre protégé" class="w-10 h-10 object-contain"
               onerror="this.outerHTML='<span class=\'text-3xl\'>🛡️</span>'" />
        </div>
        <p class="text-4xl font-bold text-white/20">03</p>
        <h3 class="text-xl font-semibold">Protéger</h3>
        <p class="text-gray-400 text-sm">Le verre est couvert — toute tentative d'introduction est visible.</p>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

Les 3 étapes s'affichent côte à côte sur desktop, en colonne sur mobile. Les emojis s'affichent en fallback si les images sont absentes.

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: section comment ca marche"
```

---

## Task 7 : Section Pour qui

**Files:**
- Modify: `index.html` (section `#pour-qui`)

- [ ] **Étape 1 : Implémenter la section**

Remplacer `<section id="pour-qui"></section>` par :

```html
<section id="pour-qui" class="py-24 bg-white">
  <div class="max-w-5xl mx-auto px-6">
    <div class="text-center mb-16">
      <p class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Nos partenaires</p>
      <h2 class="text-3xl md:text-4xl font-bold">Fait pour votre établissement</h2>
    </div>
    <div class="grid md:grid-cols-2 gap-6">

      <div class="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
        <p class="text-2xl mb-3">🍸</p>
        <h3 class="text-xl font-semibold mb-2">Bars & clubs</h3>
        <p class="text-gray-500 text-sm">Offrez à vos clients une soirée en confiance. Différenciez-vous par votre engagement sécurité.</p>
      </div>

      <div class="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
        <p class="text-2xl mb-3">🎪</p>
        <h3 class="text-xl font-semibold mb-2">Festivals & événements</h3>
        <p class="text-gray-500 text-sm">Distribuez ClearCup à l'entrée ou aux bars. Simple à déployer à grande échelle, sans logistique lourde.</p>
      </div>

      <div class="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
        <p class="text-2xl mb-3">🤝</p>
        <h3 class="text-xl font-semibold mb-2">Associations de prévention</h3>
        <p class="text-gray-500 text-sm">Un outil concret à distribuer lors de vos actions de sensibilisation auprès des jeunes.</p>
      </div>

      <div class="border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow">
        <p class="text-2xl mb-3">🎓</p>
        <h3 class="text-xl font-semibold mb-2">Établissements universitaires</h3>
        <p class="text-gray-500 text-sm">Intégrez ClearCup dans votre politique de bien-être étudiant lors des soirées et événements campus.</p>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

4 cards en grille 2x2 sur desktop, 1 colonne sur mobile. Le hover effect est visible.

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: section pour qui"
```

---

## Task 8 : Section Pourquoi investir

**Files:**
- Modify: `index.html` (section `#pourquoi`)

- [ ] **Étape 1 : Implémenter la section**

Remplacer `<section id="pourquoi"></section>` par :

```html
<section id="pourquoi" class="py-24 bg-gray-50">
  <div class="max-w-5xl mx-auto px-6">
    <div class="text-center mb-16">
      <p class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Pourquoi ClearCup</p>
      <h2 class="text-3xl md:text-4xl font-bold">Un investissement qui fait sens</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-8">

      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-xl">✓</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Responsabilité</h3>
        <p class="text-gray-500 text-sm">Montrez à vos clients que leur sécurité est une priorité. Un geste fort, visible, apprécié.</p>
      </div>

      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-xl">⚡</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Simplicité</h3>
        <p class="text-gray-500 text-sm">Aucune formation, aucune installation. On colle, c'est fait. Ça s'intègre à n'importe quel service.</p>
      </div>

      <div class="text-center">
        <div class="w-14 h-14 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-white text-xl">💶</span>
        </div>
        <h3 class="text-lg font-semibold mb-2">Accessibilité</h3>
        <p class="text-gray-500 text-sm">Tarifs modulables selon les volumes. Adaptés aux petits bars comme aux grands festivals.</p>
      </div>

    </div>
  </div>
</section>
```

- [ ] **Étape 2 : Vérifier dans le navigateur**

3 colonnes sur desktop, 1 sur mobile. Les icônes dans les cercles noirs sont lisibles.

- [ ] **Étape 3 : Commit**

```bash
git add index.html
git commit -m "feat: section pourquoi investir"
```

---

## Task 9 : Section Contact + Formspree

**Files:**
- Modify: `index.html` (section `#contact`)
- Modify: `js/main.js`

**Pré-requis :** Créer un compte Formspree sur [formspree.io](https://formspree.io), créer un nouveau formulaire, copier l'endpoint (format : `https://formspree.io/f/XXXXXXXX`).

- [ ] **Étape 1 : Implémenter la section Contact**

Remplacer `<section id="contact"></section>` par :

```html
<section id="contact" class="py-24 bg-gray-950 text-white">
  <div class="max-w-2xl mx-auto px-6 text-center">
    <p class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Contact</p>
    <h2 class="text-3xl md:text-4xl font-bold mb-4">Devenir partenaire</h2>
    <p class="text-gray-400 mb-12">Remplissez le formulaire, on vous répond sous 48h.</p>

    <form id="contact-form"
          action="https://formspree.io/f/XXXXXXXX"
          method="POST"
          class="text-left space-y-4">

      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label for="prenom" class="block text-sm text-gray-400 mb-1">Prénom</label>
          <input id="prenom" type="text" name="prenom" required
                 class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                 placeholder="Sam" />
        </div>
        <div>
          <label for="nom" class="block text-sm text-gray-400 mb-1">Nom</label>
          <input id="nom" type="text" name="nom" required
                 class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                 placeholder="Fabrizzi" />
        </div>
      </div>

      <div>
        <label for="etablissement" class="block text-sm text-gray-400 mb-1">Établissement</label>
        <input id="etablissement" type="text" name="etablissement" required
               class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
               placeholder="Bar Le Central, Festival XYZ..." />
      </div>

      <div>
        <label for="email" class="block text-sm text-gray-400 mb-1">Email professionnel</label>
        <input id="email" type="email" name="email" required
               class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
               placeholder="contact@votreétablissement.ch" />
      </div>

      <div>
        <label for="message" class="block text-sm text-gray-400 mb-1">Message <span class="text-gray-500">(optionnel)</span></label>
        <textarea id="message" name="message" rows="4"
                  class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Volume estimé, date d'événement, questions..."></textarea>
      </div>

      <button type="submit"
              class="w-full bg-white text-black py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        Envoyer ma demande
      </button>

      <!-- Message de succès (caché par défaut) -->
      <div id="form-success" class="hidden text-center py-4 text-green-400 font-medium">
        ✓ Message envoyé ! On revient vers vous sous 48h.
      </div>
      <!-- Message d'erreur (caché par défaut) -->
      <div id="form-error" class="hidden text-center py-4 text-red-400 font-medium">
        Une erreur s'est produite. Réessayez ou écrivez-nous directement.
      </div>

    </form>

    <!-- Footer minimal -->
    <div class="mt-16 pt-8 border-t border-white/10 text-gray-500 text-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <p>© 2026 ClearCup — Fribourg, Suisse</p>
      <a href="https://instagram.com/clearcup" target="_blank" rel="noopener"
         class="hover:text-white transition-colors">Instagram @clearcup</a>
    </div>
  </div>
</section>
```

- [ ] **Étape 2 : Remplacer l'endpoint Formspree**

Dans `index.html`, remplacer `https://formspree.io/f/XXXXXXXX` par l'endpoint réel copié depuis le dashboard Formspree.

- [ ] **Étape 3 : Implémenter la gestion du formulaire dans `js/main.js`**

```js
// ClearCup — interactivité

// Smooth scroll pour tous les liens d'ancre
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Gestion du formulaire Formspree (AJAX)
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
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
        submitBtn.textContent = 'Envoyer ma demande';
        submitBtn.disabled = false;
      } else {
        throw new Error('Formspree error');
      }
    } catch {
      errorMsg.classList.remove('hidden');
      submitBtn.textContent = 'Envoyer ma demande';
      submitBtn.disabled = false;
    }
  });
}
```

- [ ] **Étape 4 : Vérifier dans le navigateur**

Soumettre le formulaire avec des données de test. Le message de succès doit apparaître. Vérifier que l'email arrive dans le dashboard Formspree. Tester le smooth scroll depuis la navbar.

- [ ] **Étape 5 : Commit**

```bash
git add index.html js/main.js
git commit -m "feat: section contact avec Formspree et smooth scroll"
```

---

## Task 10 : Responsive QA & styles custom

**Files:**
- Modify: `css/styles.css`

- [ ] **Étape 1 : Ajouter le scroll offset pour la navbar fixe**

Dans `css/styles.css` :

```css
/* Offset scroll pour compenser la navbar fixe (64px) */
html {
  scroll-padding-top: 4rem;
}

/* Transition douce sur les inputs au focus */
input:focus,
textarea:focus {
  outline: none;
}

/* Empêcher le zoom iOS sur les inputs */
@media screen and (max-width: 768px) {
  input, textarea {
    font-size: 16px;
  }
}
```

- [ ] **Étape 2 : QA mobile**

Ouvrir Chrome DevTools → Toggle device toolbar. Tester les breakpoints suivants :
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad)
- 1280px (Desktop)

Vérifier pour chaque breakpoint :
- Navbar visible et fonctionnelle
- Textes lisibles (pas de débordement)
- Formulaire utilisable
- Images/placeholders s'affichent correctement
- Aucun scroll horizontal

- [ ] **Étape 3 : Vérifier la performance**

Ouvrir Chrome DevTools → Lighthouse → Mobile. Le score Performance doit être > 90. Si < 90, vérifier la taille des images dans `ASSET_CC/` (les compresser si nécessaire).

- [ ] **Étape 4 : Commit**

```bash
git add css/styles.css
git commit -m "feat: styles custom responsive QA"
```

---

## Task 11 : Déploiement Netlify

**Files:**
- Aucun fichier modifié — déploiement via interface Netlify

- [ ] **Étape 1 : Pousser sur GitHub**

```bash
# Créer le dépôt sur github.com (interface web), puis :
git remote add origin https://github.com/TON_USERNAME/clearcup-website.git
git push -u origin main
```

- [ ] **Étape 2 : Connecter Netlify**

1. Aller sur [app.netlify.com](https://app.netlify.com)
2. "Add new site" → "Import an existing project" → GitHub
3. Sélectionner le repo `clearcup-website`
4. Build command : laisser vide (site statique)
5. Publish directory : `.` (racine)
6. Cliquer "Deploy site"

- [ ] **Étape 3 : Configurer le domaine custom (optionnel)**

Dans Netlify → Domain settings → Add custom domain. Entrer le domaine ClearCup (ex: `clearcup.ch`). Suivre les instructions DNS.

- [ ] **Étape 4 : Vérification finale en production**

Sur l'URL Netlify générée (ex: `clearcup.netlify.app`) :
- Toutes les sections s'affichent
- Le formulaire fonctionne (test d'envoi réel)
- Le site est accessible sur mobile
- Aucune erreur console

- [ ] **Étape 5 : Commit final**

```bash
git add .
git commit -m "chore: deploy production Netlify"
```

---

## Checklist avant mise en ligne

- [ ] Remplacer les chiffres indicatifs (section Problème) par des sources vérifiées
- [ ] Remplacer l'endpoint Formspree `XXXXXXXX` par le vrai endpoint
- [ ] Remplir le dossier `ASSET_CC/` avec les vrais assets
- [ ] Mettre à jour le lien Instagram (`@clearcup` → handle réel)
- [ ] Mettre à jour le lien `netlify.toml` avec le domaine final si custom
- [ ] Vérifier que l'email de réception Formspree est le bon
