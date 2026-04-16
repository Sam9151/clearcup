# Spec — Mise en forme ClearCup (Neo-Brutaliste)

**Date :** 2026-04-15
**Statut :** Approuvé

---

## 1. Style global

**Esthétique :** Neo-brutaliste avec finition haut de gamme.
- Hard shadows sans flou, offset marqué
- Border-radius généreux (friendly)
- Contraste fort, couleurs saturées
- Structure propre

---

## 2. Système de couleurs

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--white` | `#FFFFFF` | Fonds sections impaires |
| `--blue` | `#64A4F6` | Fonds sections paires, éléments clés |
| `--black` | `#000000` | Texte, borders, shadows (parcimonieux) |
| `--shadow-dark` | `4px 4px 0 #000` | Sur fond blanc |
| `--shadow-blue` | `4px 4px 0 #64A4F6` | Sur fond bleu |

**Alternance des fonds :**

| Section | Fond |
|---------|------|
| Hero | #FFFFFF |
| Problème | #64A4F6 |
| Comment ça marche | #FFFFFF |
| Pour qui | #64A4F6 |
| Pourquoi investir | #FFFFFF |
| Contact | #64A4F6 |

---

## 3. Typographie

- **Google Fonts :** Bagel Fat One + Arimo (import dans `<head>`)
- **Titres (H1) :** Bagel Fat One, uppercase, `clamp(2.5rem, 5vw, 5rem)`
- **Titres (H2) :** Bagel Fat One, uppercase, `clamp(1.8rem, 3.5vw, 3rem)`
- **Eyebrows / labels :** Arimo, uppercase, `0.75rem`, `letter-spacing: 0.15em`
- **Body :** Arimo, `1rem`–`1.125rem`

---

## 4. Composants

### Boutons
- Fond blanc + border `2px solid #000` + hard shadow `var(--shadow-dark)`
- Border-radius `9999px` (pill)
- Hover : `transform: translate(2px, 2px)` + shadow `2px 2px 0 #000`
- Transition : `100ms`

### Cards
- Border `2px solid #000`
- Border-radius `1.5rem`
- Hard shadow `var(--shadow-dark)` ou `var(--shadow-blue)` selon le fond
- Hover : `transform: translate(2px, 2px)` + shadow réduite

### Inputs (formulaire)
- Border `2px solid rgba(0,0,0,0.3)` au repos
- Focus : border `2px solid #000` + outline `none`
- Border-radius `0.75rem`

---

## 5. Assets

| Fichier | Section | Description |
|---------|---------|-------------|
| `ASSET_CC/hero-product.png` | Hero | Sticker sur verre, fond blanc |
| `ASSET_CC/mascot.svg` | Toutes sauf Hero | Mascotte ClearCup |
| `ASSET_CC/step-coller.png` | Comment — Étape 1 | Main prenant le sticker |
| `ASSET_CC/step-paille.png` | Comment — Étape 2 | Main collant le sticker sur verre |
| `ASSET_CC/step-proteger.png` | Comment — Étape 3 | Verre percé avec paille |

---

## 6. Mascotte

- Présente dans toutes les sections **sauf Hero**
- Positionnée en `absolute` sur le bord latéral de la section
- Partiellement hors-écran (`transform: translateX(20%)`)
- Fichier : toujours `ASSET_CC/mascot.svg`
- Animation CSS : `float` (montée/descente, 3s, ease-in-out, infinite)
- Pose adaptée par Sam selon la section

---

## 7. Animations

### Reveal scroll
- Trigger : `IntersectionObserver` avec `threshold: 0.15`
- Effet : `opacity: 0 → 1` + `translateY(30px → 0)`
- Durée : `600ms`, easing : `ease-out`
- Stagger grilles : `100ms` entre chaque item

### Micro-interactions
- Cards hover : `translate(2px, 2px)` + shadow réduite
- Inputs focus : border couleur → `#000`
- Bouton submit : ripple effect au clic
- Mascotte : `float` CSS keyframes continu

### Smooth scroll
- Déjà implémenté dans `js/main.js` — conserver

---

## 8. Fichiers modifiés

| Fichier | Modifications |
|---------|--------------|
| `index.html` | Import Google Fonts, classes DA, balises mascotte par section |
| `css/styles.css` | Système complet : variables, typo, shadows, composants, animations |
| `js/main.js` | IntersectionObserver reveals + micro-interactions (smooth scroll conservé) |

---

## 9. Hors scope

- Changement de structure HTML (sections, hiérarchie de contenu)
- Nouvelles sections ou pages
- Dark mode
- Animations complexes type GSAP ou librairies tierces
