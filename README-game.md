# Lâche pas — notes de travail (local, ne pas commiter)

Document de suivi pour le développement du jeu. Distinct du `README.md` du site
principal (qui n'existe pas encore à la racine — vérifié le 10.08, donc pas de
risque d'écrasement, mais ce fichier est nommé `README-game.md` pour rester
sans ambiguïté).

## État actuel : Jalon 1 (mécanique nue)

Livré le 10.08.2026 : `game.html`, `lp-percentiles.json`, polices allégées dans `TYPO/`.

Contenu :
- Hold à un seul doigt (2e pointeur = game over `deux_doigts`)
- Jauge de risque (inondation ambiante `#EF4444`, jamais une barre)
- 4 distractions : `pote_appelle` / `commande_prete` (type A), `notif_batterie` (type B, leurre), `bousculade` (type C)
- Courbe par phases : confiance (0-8s) → montée (8-18s) → chaos (18-30s) → impossible (30-45s) → cap dur à 45s
- Révélation en 4 temps, percentile calculé depuis `lp-percentiles.json` (valeurs par défaut, pas de vraies données pour l'instant)
- Écran stroboscope au 1er lancement, `prefers-reduced-motion` respecté
- Verrouillage paysage (CSS pur), invalidation si l'app passe en arrière-plan

**Simplification assumée par rapport au brief, à valider avec Sam** : une seule
carte de distraction A/B affichée à la fois (pas de superposition de deux
cartes en phase montée) ; le chevauchement de stimuli vient plutôt d'une
bousculade (type C) qui peut survenir pendant qu'une carte est active. Ça
teste déjà le conflit d'attention ; à revoir si le jalon 1 montre que ça manque
de tension.

**Pas encore fait** (Jalon 2, ne pas commencer sans validation du jalon 1 sur
de vrais joueurs) : catalogue complet des distractions, Firebase + file
d'attente hors-ligne, carte de score canvas + partage, capture du @,
événements GTM, mention nLPD, `lp-sw.js` / `lp-manifest.json` / PWA hors-ligne,
`stats.html`.

## Comment tester en local

`game.html` utilise `fetch()` pour charger `lp-percentiles.json` : en ouvrant
le fichier directement (`file://`), ce fetch échoue à cause des restrictions
CORS du protocole file — un fallback JS identique prend le relai automatiquement,
donc le jeu reste jouable, mais pour tester le vrai chargement réseau, servir
le dossier en local :

```bash
cd ~/Desktop/ClearCup
python3 -m http.server 8080
# puis ouvrir http://localhost:8080/game.html sur le téléphone (même wifi)
```

Le hold à un doigt et le test à deux doigts ne sont vérifiables que sur un
vrai écran tactile (pas au clavier/souris).

## Rappels pour la suite (Jalon 2)

- **`index.html` ne doit jamais être touché ni écrasé.**
- Tout fichier générique à la racine doit garder le préfixe `lp-` (`lp-sw.js`,
  `lp-manifest.json`… — déjà le cas ici).
- Le service worker, une fois ajouté, doit être en liste blanche stricte de
  chemins exacts — jamais de préfixe/joker — pour ne pas figer `index.html` en
  cache chez les visiteurs du site principal (voir le brief, section critique
  §3).
- `ASSETS_A_FOURNIR.md` et ce fichier restent **untracked** dans le repo — à
  garder hors des `git add .` si Sam fait un commit large.

## Historique

- **10.08.2026** — Livraison du Jalon 1. Assets débloqués (Clearky décomposé,
  polices allégées, couleurs officielles reprises de `css/styles.css`). Voir
  `ASSETS_A_FOURNIR.md` pour le détail des décisions.
- **10.08.2026** — Refonte DA de l'accueil et de la révélation après retour de
  Sam ("pas satisfait"). Visite de clearcup.ch (captures Playwright, mobile)
  pour aligner sur la vraie charte : cartes blanches à bord noir 2px + ombre
  dure `4px 4px 0 #000` (`--shadow-dark`), bouton pilule, gros Bagel Fat One —
  repris à l'identique des cartes stat ("+80%") et du CTA du site.
  - Accueil : logo ClearCup ajouté en haut, titre "Lâche pas" + accroche
    courte sous le verre (toujours zéro instruction écrite).
  - Révélation : temps 3 et 4 passent sur fond bleu plein écran (comme les
    sections alternées du site), contenu dans une carte néo-brutaliste ;
    "Rejouer" devient un vrai bouton pilule au lieu d'un texte nu.
  - Le jeu lui-même (écran 2) n'a pas changé : Stollenmayer pur, comme
    prévu au brief — la marque n'apparaît qu'à l'accueil et à la fin.
  - Bug corrigé au passage : la barre "Soirée" du temps 4 ne s'affichait pas
    (`<span>` inline, `width`/`height` sans effet sans `display:block`).
  - Ajout d'une courte grâce (350 ms) en tout début de partie : le verre
    change légèrement de position entre l'accueil et le jeu, la jauge ne
    doit pas monter à cause de ce sursaut de mise en page.
  - Vérifié visuellement via Playwright (capture headless) avant livraison.
