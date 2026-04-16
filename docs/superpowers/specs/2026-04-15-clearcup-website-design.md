# Spec — Site Web ClearCup

**Date :** 2026-04-15
**Auteurs :** Sam Fabrizzi, Yoann Anex
**Statut :** Approuvé

---

## 1. Contexte & objectif

ClearCup est une start-up suisse qui commercialise un sticker vinyle anti-soumission chimique destiné aux verres dans les bars, clubs et festivals. Le produit est physique, la DA est finalisée, des prototypes existent.

**Objectif du site :** Convaincre des acheteurs B2B (gérants de bars, responsables événementiels, associations de prévention, établissements universitaires) de prendre contact pour commander ou demander un devis.

**Objectif secondaire :** Renforcer la crédibilité de la start-up lors de pitchs ou de prospection.

---

## 2. Audience cible

**Primaire (B2B) :**
- Gérants de bars, clubs, boîtes de nuit
- Organisateurs de festivals et événements
- Responsables d'associations de prévention
- Référents santé/sécurité d'établissements universitaires
- Marché principal : Suisse francophone, ouverture Europe francophone

**Secondaire (B2C implicite) :**
- Jeunes adultes 18–35 ans, majoritairement féminins — ils peuvent partager le site ou inciter leurs établissements à commander

---

## 3. Type de site

**One-pager** — une seule page scrollable, responsive (mobile-first).

Aucune navigation multi-pages. Toutes les sections sont accessibles via scroll ou ancres.

---

## 4. Stack technique

| Composant | Choix | Raison |
|-----------|-------|--------|
| Structure | HTML5 | Simple, maîtrisé par l'équipe |
| Style | CSS + Tailwind CSS (CDN) | Pas de build step, productivité |
| Interactivité | JavaScript vanilla | Pas de dépendances inutiles |
| Formulaire | Formspree | Backend-less, gratuit, fiable |
| Hébergement | Netlify (free tier) | Déploiement GitHub en 1 clic |
| Assets | Dossier `ASSET_CC/` | Fourni par l'équipe ClearCup |

---

## 5. Hiérarchie du contenu

### Section 1 — Hero
- **Tagline principale** : accroche B2B courte et impactante (ex : *"Protégez vos clients. Renforcez votre image."*)
- **Sous-titre** : 1 phrase qui explique le produit sans jargon
- **Visuel** : photo ou mockup du sticker ClearCup sur un verre (depuis `ASSET_CC/`)
- **CTA principal** : bouton "Demander un devis" → ancre vers section Contact

### Section 2 — Le problème
- 1–2 statistiques factuelles sur la soumission chimique en Suisse / Europe
- 1 phrase de contexte : pourquoi c'est un enjeu pour les établissements
- Ton : factuel, pas anxiogène, pas victimisant

### Section 3 — Comment ça marche
- 3 étapes visuelles :
  1. **Coller** — le sticker se fixe sur n'importe quel verre
  2. **Passer la paille** — le petit trou permet d'utiliser le verre normalement
  3. **Protéger** — le verre est couvert, la boisson inaccessible
- 1 icône ou illustration par étape (depuis `ASSET_CC/` ou icônes simples)

### Section 4 — Pour qui
- 4 cibles B2B présentées en blocs ou cards :
  - Bars & clubs
  - Festivals & événements
  - Associations de prévention
  - Établissements universitaires
- 1 ligne de valeur spécifique par cible (pourquoi ClearCup fait sens pour eux)

### Section 5 — Pourquoi c'est un bon investissement
- **Responsabilité** : montrez à vos clients que leur sécurité vous importe
- **Simplicité** : aucune formation, aucune logistique — on colle, c'est fait
- **Accessibilité** : tarifs modulables selon le volume, adapté à toutes les tailles d'établissements
- Optionnel : logo ou mention d'un premier partenaire/association si disponible (social proof)

### Section 6 — Contact
- **Titre** : "Devenir partenaire" ou "Demander un devis"
- **Formulaire (Formspree)** :
  - Prénom / Nom
  - Nom de l'établissement
  - Email professionnel
  - Message (optionnel)
  - Bouton : "Envoyer ma demande"
- **Confirmation** : message de succès inline après envoi
- **Optionnel** : email direct et/ou lien Instagram en pied de formulaire

---

## 6. Navigation & UX

- **Navbar fixe** en haut : Logo ClearCup + bouton "Demander un devis" (ancre #contact)
- **Smooth scroll** sur tous les liens d'ancrage
- **Mobile-first** : breakpoints Tailwind standard (sm/md/lg)
- **Pas de cookies, pas de tracking** (sauf si ajouté explicitement plus tard)
- **Accessibilité** : contraste suffisant, balises sémantiques HTML5, alt sur toutes les images

---

## 7. Ton & messaging

- Direct, impactant, humain — jamais corporate
- Axé sur l'**empowerment et la prévention**, pas sur la peur
- Langue principale : **français**
- Ne jamais promettre de détection chimique garantie (le produit couvre le verre, ne détecte pas)
- Ne pas mentionner de certification médicale

---

## 8. Assets

Un dossier `ASSET_CC/` sera fourni par l'équipe avant le développement. Il contiendra :
- Logo (SVG ou PNG fond transparent)
- Photos produit (sticker sur verre)
- Mockups éventuels
- Palette de couleurs et typographie (depuis Figma)

Pendant le développement, des placeholders seront utilisés.

---

## 9. Hors scope

- Boutique e-commerce ou paiement en ligne
- Espace client / login
- Blog ou section presse
- Multilangue (FR uniquement pour le lancement)
- Animations complexes ou bibliothèques tierces

---

## 10. Critères de succès

- Un visiteur B2B comprend le produit et sa valeur en moins de 60 secondes
- Le formulaire de contact fonctionne et envoie un email à l'équipe
- Le site est responsive et lisible sur mobile
- Le site se charge en moins de 3 secondes
- Le messaging respecte la ligne DA et les contraintes de communication ClearCup
