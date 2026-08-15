# Lâche pas — notes de travail (local, ne pas commiter)

Document de suivi pour le développement du jeu. Distinct du `README.md` du site
principal (qui n'existe pas encore à la racine — vérifié le 10.08, donc pas de
risque d'écrasement, mais ce fichier est nommé `README-game.md` pour rester
sans ambiguïté).

## État actuel : Jalon 2 en cours (catalogue complet + Firebase + capture @)

Jalon 1 livré le 10.08.2026, validé par Sam sur téléphone. Catalogue de
distractions étendu au complet pour les types A/B/C le 14.08.2026 (types D/E
reportés à un jalon 3). Câblage Firebase + capture du @ Instagram le 14.08.2026
également (voir Historique) — reste à faire pour le jalon 2 : GTM, partage
(carte canvas + Web Share), PWA (`lp-manifest.json`/`lp-sw.js`), `stats.html`.

Contenu actuel :
- Hold à un seul doigt (2e pointeur = game over `deux_doigts`)
- Jauge de risque (inondation ambiante `#EF4444`, jamais une barre)
- 16 distractions : 6 type A (actions, dont 2 avec interaction hold/slide/doubletap
  au-delà du tap simple), 6 type B (leurres, même habillage que les type A —
  volontairement indiscernables), 4 type C (le verre bouge : bousculade, basses,
  dérive, rotation)
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
- `ASSETS_A_FOURNIR.md` reste **untracked** dans le repo — à garder hors des
  `git add .` si Sam fait un commit large.

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
- **14.08.2026** — Catalogue de distractions étendu à 16 entrées (types A/B/C
  complets, D/E reportés à un jalon 3 — décision prise avec Sam) : 6 type A
  (+ photo_groupe, drop_arrive, uber_arrive, story_poster), 6 type B (+
  pub_flash, tag_ig, mail_pro, meteo_orage, maj_app), 4 type C (+ basses,
  derive, rotation). Chaque nouvelle distraction a un vrai habillage
  graphique (pas de texte nu) : recette `.lp-order` généralisée (icône ou
  avatar + titre + sous-titre + action), variable CSS `--card-accent` pour
  varier la couleur sans dupliquer le style (important : aucune couleur
  n'est réservée aux leurres, ils doivent rester indiscernables des vraies
  actions). Deux nouvelles interactions au-delà du tap simple : maintien à
  l'appui (anneau de progression SVG, `photo_groupe`) et glissé (rail à
  curseur, `story_poster`) ; `drop_arrive` introduit un double-tap. Les 4
  distractions de type C partagent maintenant `scheduleTypeC()` (tirage
  pondéré, remplace l'ancien `triggerBousculade()` seul).
  - **Bug trouvé et corrigé (le plus retors)** : le pulse `is-tap-pulse`
    (retour visuel du 1er tap d'un double-tap) interrompait un instant
    l'animation d'entrée `order-up`/`call-drop` — sous
    `prefers-reduced-motion` (et potentiellement dans d'autres conditions de
    course), la carte retombait alors sur sa position de départ hors écran
    (`translateY(120%)`) au lieu de rester en place, faisant rater le 2e tap.
    Cause racine : `.lp-order`/`.lp-call` déclaraient un `transform` statique
    comme position de repos, utilisé seulement comme point de départ
    implicite du keyframe d'entrée — un piège qui existait déjà avant cette
    itération mais qu'aucune animation ne venait exposer. Corrigé en
    déclarant `from`/`to` explicitement dans les keyframes et en retirant le
    `transform` statique, pour que la position de repos réelle soit toujours
    `translateY(0)`, résiliente à toute interruption d'animation.
  - Bug de contenu corrigé : la carte `tag_ig` n'affichait pas le prénom en
    toutes lettres (seul un avatar "L" apparaissait), texte tronqué —
    corrigé en intégrant le prénom dans le titre affiché.
  - Vérifié par une QA Playwright dédiée (`review-cards.js`, tmp de session) :
    simulation complète tap/hold/slide/doubletap sur chaque distraction,
    poids temporairement boostés pour forcer l'apparition de chacune,
    plusieurs parties jouées jusqu'au cap de 45s sans erreur console/JS.
- **14.08.2026** — Bouton "Retour au menu" ajouté sous "Rejouer" au temps 4 de
  la révélation (discret, texte souligné — Rejouer reste le CTA principal).
- **14.08.2026** — Câblage Firebase + capture du @ Instagram (jalon 2, étapes
  1 et 2 du plan validé avec Sam) :
  - `lp-firebase-config.js` (clé Firebase, non secrète) + `lp-firebase.js`
    (module ES, SDK chargé depuis le CDN gstatic — pas de npm/bundler,
    cohérent avec le "zéro build step" du jeu). Écrit chaque partie dans
    `/runs/{id}` de la Realtime Database au schéma validé avec Sam
    (`handle`, `scoreMs`, `cause`, `distractionId`, `percentileShown`,
    `clientId`, `gameVersion`, `createdAt` en `serverTimestamp`). Règles de
    sécurité (écriture publique création-seule + validation stricte des
    champs, lecture réservée à un compte admin authentifié) documentées en
    commentaire dans `lp-firebase.js`.
  - **Découplage volontaire** : `game.html` ne connaît jamais Firebase
    directement — `endGame()` pousse dans une file `lp_pending_runs`
    (`localStorage`) et déclenche l'événement `lp:run-queued` ;
    `lp-firebase.js` écoute cet événement (+ au chargement + au retour
    réseau `online`) et vide la file un par un. Le jeu reste jouable à
    l'identique si Firebase est bloqué, en panne, ou hors-ligne.
  - Capture du pseudo Instagram à l'accueil, 1er lancement uniquement :
    champ optionnel + bouton "Plus tard", jamais bloquant (démarrer une
    partie sans y toucher vaut aussi skip). Texte nLPD validé avec Sam,
    lien vers `index.html#confidentialite` et email `info@clearcup.ch` pour
    la suppression.
  - Vérifié en conditions réelles (serveur HTTP local, pas `file://` — les
    modules ES sont bloqués par CORS sous `file://`, comme `lp-percentiles.json`
    déjà documenté plus haut) : capture du pseudo, sanitation (`@Foo` →
    `foo`), file d'attente, écriture Firebase effective (la file se vide
    bien après succès). **Note pour Sam** : ce test a écrit une vraie
    entrée de test dans `/runs` sur le projet Firebase (`handle:
    "moncompte_test"`, score ~0,2s, cause `deux_doigts`) — à nettoyer/ignorer
    une fois `stats.html` en place, facilement identifiable comme donnée de
    test.

- **14.08.2026** — Retouches demandées par Sam après test :
  - Capture Instagram transformée en **popup** (même mécanique que les
    fenêtres Classement/Règles) au lieu d'un bloc inline sur l'accueil —
    "Continuer" valide le champ, "Plus tard" l'ignore, les deux ferment la
    popup et ne la redemandent plus jamais.
  - Nouvel **en-tête accueil** (@pseudo + meilleur temps local, en
    `position:absolute` au-dessus du logo — pas dans le flux, sinon ça
    poussait le verre hors du cadre sur petit écran) : visible uniquement si
    un @ a été renseigné, sinon entièrement masqué. Meilleur temps suivi en
    local (`lp_best_score_ms`), mis à jour à chaque record personnel.
  - Bouton "Retour au menu" (temps 4) passé de texte souligné à la même
    recette que "Rejouer" (`.nb-btn`) mais en bleu marque — `.nb-btn` est
    bleu par défaut, `.nb-btn--white` est le modificateur que "Rejouer"
    utilise, donc juste retirer ce modificateur suffisait.
- **14.08.2026** — Bouton "Plus tard" (popup Instagram) passé de texte
  souligné à la même recette que les autres boutons (`.nb-btn`), en blanc
  (`.nb-btn--white`), en compact (`.nb-btn--sm`, nouvelle variante générale
  ajoutée à la recette — réutilisable ailleurs si besoin d'un CTA secondaire
  discret).
- **14.08.2026** — Repositionnement de l'en-tête accueil et du titre, demandé
  par Sam pour une meilleure lisibilité :
  - L'en-tête (@pseudo + meilleur temps) est maintenant pile centré entre le
    haut de l'écran et le logo, et le titre "Lâche pas" (+ l'accroche, groupés
    dans `#accueil-title-wrap`) pile centré entre le logo et le bouton
    Commencer — plutôt que des marges CSS fixes, calculé dynamiquement en JS
    (`layoutAccueilGaps()`, `getBoundingClientRect`) pour rester exact quel
    que soit le gabarit d'écran, recalculé au retour à l'accueil et au
    redimensionnement.
  - Au passage : `#accueil-verre-zone` est en réalité vide/invisible sur
    l'accueil (le verre interactif ne s'y déplace qu'à l'écran d'attente) —
    le "logo" que voit le joueur est entièrement le SVG `.accueil-brand`
    (mascotte + wordmark). Les deux gaps sont donc ancrés sur `.accueil-brand`,
    pas sur la zone verre.
  - Vérifié en pixels via Playwright (écarts haut/bas identiques des deux
    côtés du calcul, avec et sans pseudo renseigné) avant captures visuelles.

### Accueil — vraie cause du menu "compacté" corrigée (espacement complet revu)

Le titre "Lâche pas" collait au logo ET aux boutons du menu (~12px de marge
à peine des deux côtés), alors que le pseudo/logo en haut de l'écran, eux,
respiraient bien (~46px). Root cause : le logo est décalé visuellement de
2cm vers le bas (`transform`, décision ancienne, purement esthétique) sans
que l'espace réservé au titre dans le flux (`#accueil-verre-zone`) ait été
agrandi pour compenser — ce décalage grignotait donc une bonne partie de
cette réserve, écrasant le titre entre logo et menu.

Plutôt que de gonfler artificiellement la réserve (ce qui aurait juste
déplacé le problème : ça grossit la hauteur totale du contenu, donc réduit
d'autant les marges en haut/bas de l'écran, vu que .screen centre tout
verticalement dans une hauteur fixe), les deux ont été réajustés ensemble :
- décalage du logo réduit de 2cm à 1cm (`.accueil-brand` + `@keyframes
  accueil-brand-in`) ;
- `#accueil-verre-zone` min-height passé de 150px à 160px.

Résultat vérifié au pixel (Playwright, iPhone 13, avec et sans pseudo) :
tous les écarts de la page (haut d'écran ↔ pseudo, pseudo ↔ logo, logo ↔
titre, titre ↔ menu, menu ↔ bas d'écran) sont désormais dans une fourchette
homogène de 29 à 35,6px, contre un ancien grand écart (11,7px collé au
milieu vs 40-46px ailleurs). Screenshots de contrôle générés puis
supprimés (fichiers temporaires).

Au passage : `.mi-consent` (texte de consentement nLPD dans la pop-up
Instagram) n'avait pas `text-align:center`, contrairement à `.mi-sub`
juste au-dessus — corrigé.

Autre bug corrigé au passage : `layoutAccueilGaps()` était appelé dans
`goToAccueil()` APRÈS avoir déclenché le rejeu de l'animation d'entrée du
logo (classe `.entree`), donc mesurait une position transitoire du logo
(en cours d'animation) plutôt que sa position finale — ce qui décalait le
pseudo/meilleur temps de ~10px vers le haut quand ils étaient affichés
(seul cas qui déclenche ce calcul). Corrigé en mesurant avant de déclencher
l'animation.

### GTM installé sur game.html + événements dataLayer.push()

`game.html` est une page à part entière (accessible directement en
`clearcup.ch/game.html`), pas intégrée dans `index.html` : elle ne recevait
donc jamais le GTM du reste du site. Ajout du snippet GTM standard
(`<script>` dans `<head>` + `<noscript><iframe>` juste après `<body>`),
même conteneur que le reste de clearcup.ch : **GTM-N34RZ3WS**.

Deux événements custom poussés dans `dataLayer` (préfixe `lp_`, plutôt que
les noms recommandés GA4 type `level_start`/`level_end`, pour rester
lisibles tels quels dans GTM sans se caler sur des paramètres GA4 qu'on ne
remplit pas tous) :
- `lp_game_start` — poussé dans `startGame()`, sans paramètre.
- `lp_game_end` — poussé dans `endGame()`, avec `cause`, `distraction_id`,
  `score_seconds` (arrondi au dixième), `percentile_top`. Pas d'événement
  séparé pour un "bon score" : `percentile_top` est inclus directement,
  un déclencheur GTM peut filtrer dessus (ex. `percentile_top <= 10`).

Nouvelle fonction `pushEvent(name, params)` : ne casse jamais le jeu si GTM
est bloqué/absent (try/catch, vérifie `window.dataLayer`).

Testé via serveur local (`python3 -m http.server`, le `file://` bloque le
script GTM externe) : GTM se charge bien (confirmé par `gtm.js`/`gtm.dom`/
`gtm.load` dans le dataLayer — au passage, une balise Meta Pixel est déjà
configurée dans ce même conteneur), et les deux événements partent avec les
bons paramètres.

Découverte au passage (pas un bug introduit maintenant, un effet de bord du
placement du titre déjà en place) : `#accueil-title-wrap` chevauche
verticalement `#accueil-verre-zone` sur l'accueil (ce dernier est vide/
invisible à cet écran, voir plus haut) — un clic pile au centre de cette
zone touche en réalité le `<h1>` du titre, pas `#accueil-verre-zone`. Sans
conséquence pour un joueur réel (rien n'invite à taper là, le CTA visible
est le bouton Commencer), mais à garder en tête si `#accueil-verre-zone`
devait un jour redevenir cliquable/visible.

### GTM retiré — stats.html suffit au besoin réel

Après clarification avec Sam : son besoin ("combien de personnes jouent,
quels scores, quels pseudos à retaguer") est entièrement couvert par
Firebase + `stats.html` (à venir), sans passer par GTM. GTM aurait servi à
autre chose (mélanger le jeu avec l'analytics globale du site / remarketing
pub — il y a un Meta Pixel déjà configuré dans le conteneur), un besoin
qu'il n'a pas pour l'instant.

Retrait complet de `game.html` : le snippet GTM (`<head>` + `<noscript>`
dans `<body>`), la fonction `pushEvent()`, et les deux appels
(`lp_game_start` dans `startGame()`, `lp_game_end` dans `endGame()`) — pour
ne pas charger un script externe qui ne sert plus à rien. Le conteneur
GTM-N34RZ3WS existant sur le reste du site n'est pas concerné, seul l'ajout
dans `game.html` est annulé.

### Partage du score — carte canvas 1080×1920 + Web Share API

Nouveau bouton **"Partager mon score"** sur l'écran final de révélation
(`rv-temps-4`), en premier dans la pile de boutons (CTA principal, bleu),
au-dessus de Rejouer/Retour au menu.

Au clic (`shareScore()`) :
1. `buildShareCanvas(scoreMs, percentileTop, causeText)` dessine une carte
   1080×1920 (format story) en 2D canvas : dégradé blanc→bleu marque,
   carte blanche centrale (recette `nb-card` — bordure noire + ombre dure
   dessinées à la main sur le canvas), score en gros dans la police de
   marque, "Top X % des joueurs", la cause de la perte (le ressort
   drôle/relatable du jeu), punchline ClearCup, titre "Lâche pas" et
   `clearcup.ch/game.html` sur le fond bleu en dessous. Uniquement de la
   typographie (les mêmes `@font-face` que le reste de la page) plutôt que
   de rasteriser les logos SVG inlinés — rendu identique, sans les
   complications d'un SVG à `<style>` scopé converti en image.
2. `document.fonts.load()` + `document.fonts.ready` avant de dessiner, pour
   ne jamais capturer une frame avec la police de repli.
3. `canvas.toBlob()` → `navigator.share({files:[...]})` si le téléphone
   sait partager un fichier (partage natif vers Instagram/stories etc.),
   sinon repli en téléchargement direct de l'image (blob URL + `<a
   download>`), pour que le joueur la poste manuellement où il veut.

Testé via serveur local + Playwright (le Web Share API n'existe pas en
headless, donc le test emprunte systématiquement le chemin de repli
téléchargement — code voulu pour être testable sans navigateur réel) :
carte générée et inspectée visuellement à 2 scores différents, texte du
CTA qui débordait à droite corrigé (passé en 2 lignes via `wrapCanvasText`,
un helper de retour à la ligne centré déjà réutilisé pour la cause et la
punchline).

### Carte de partage — retouches demandées par Sam

- Eyebrow "LÂCHE PAS" au-dessus de la carte : retiré (jugé inutile).
- Fond : bleu marque uni (`#64A4F6`, celui du jeu/de la mascotte) au lieu du
  dégradé blanc→bleu. Carte remontée (`cardY` 300→200) pour garder un
  espace comparable en haut et en bas du format story maintenant que
  l'eyebrow n'occupe plus le haut.
- Emoji 👉 dans le CTA du bas retiré, remplacé par un tiret cadratin
  ("Toi aussi, tiens le coup — clearcup.ch/game.html").

Revérifié visuellement (serveur local + Playwright, repli téléchargement).

### PWA — installation sur l'écran d'accueil + jeu jouable hors-ligne

Trois nouveaux fichiers, tous à la racine à côté de `game.html` :

- **`lp-manifest.json`** — manifeste dédié au jeu (name "Lâche pas —
  ClearCup", `start_url`/`scope` = `/game.html`, `display: standalone`,
  `theme_color` bleu marque). Volontairement séparé de
  `manifest.webmanifest` du site principal (scope `/`, nom "ClearCup") pour
  ne pas mélanger les deux identités d'app installables. Icônes réutilisées
  telles quelles depuis `ASSET_CC/icon-192.png` et `icon-512.png` — pas de
  nouvel asset demandé, conformément à la consigne de Sam.
- **`lp-sw.js`** — service worker avec liste blanche stricte de chemins
  same-origin exacts (`GAME_FILES` : `game.html`, `lp-manifest.json`, les
  deux fichiers Firebase, `lp-percentiles.json`, les 2 polices `TYPO/`, les
  2 icônes). Tout ce qui n'est pas dans cette liste — **y compris
  index.html et le reste du site** — n'est jamais intercepté : l'événement
  `fetch` est laissé filer sans `respondWith()`, comme si ce service worker
  n'existait pas pour ces requêtes-là. Stratégie cache-first avec mise à
  jour silencieuse en tâche de fond (le joueur profite de la dernière
  version au lancement suivant, jamais d'attente réseau pendant que le
  cache répond).
- Liens ajoutés dans `<head>` de `game.html` : `<link rel="manifest">`,
  `apple-touch-icon` (réutilise `ASSET_CC/favicon-180.png`, iOS ne lit pas
  les icônes du manifeste) + meta `apple-mobile-web-app-*` pour le mode
  standalone sur iOS. Enregistrement du service worker en fin de fichier,
  après `window.load`, pour ne jamais retarder le 1er affichage.

Testé via serveur local + Playwright : manifeste accessible (200), service
worker installé/actif, les 9 fichiers effectivement mis en cache, **et le
jeu recharge et fonctionne entièrement hors-ligne** (`context.setOffline
(true)` + reload → écran d'accueil affiché normalement).

### stats.html — dashboard admin (mode festival + classement + stats)

Nouveau fichier `stats.html`, connecté DIRECTEMENT à Firebase (Auth +
Realtime Database) — contrairement à `game.html`, aucune contrainte de
découplage/hors-ligne ici : c'est une page admin, forcément en ligne et
authentifiée.

**Modèle de données ajouté** :
- `/festivals/{id}` — festivals créés (nom + date), lecture/écriture admin
  uniquement, création uniquement (pas de renommer/supprimer en v1, décision
  explicite de Sam).
- `/activeFestivalId` — pointeur vers le festival actif (vide = mode
  Général), lecture **publique** (nécessaire : le jeu doit le lire avant
  chaque partie), écriture admin uniquement.
- `/runs/{id}/festivalId` — nouveau champ optionnel sur chaque partie
  (le festival actif au moment où la partie a été jouée, ou absent =
  Général).

**Comment le jeu tague chaque partie** : `game.html` ne parle toujours
jamais directement à Firebase. `lp-firebase.js` lit `/activeFestivalId`
une fois au chargement de la page (`syncActiveFestival()`) et le stocke
dans `localStorage` (`lp_active_festival_id`) ; `game.html` le relit via
`getActiveFestivalId()` au moment d'enregistrer chaque partie
(`queueRun()` dans `endGame()`). Pas de synchronisation en direct pendant
la session — compromis assumé et documenté dans le code.

**Contenu de stats.html** :
- Connexion (compte Firebase Auth déjà créé).
- Liste des classements (Général + festivals, le plus récent en premier),
  badge "● En cours" sur l'actif, bouton "Activer" par classement (activer
  Général désactive le mode festival), formulaire "+ Créer" un festival.
- Bouton "Voir le top 10" → pop-up (croix pour fermer) : classement
  **par joueur** (déduplication par `clientId`, garde le meilleur score de
  chacun — pas 10 lignes du même joueur qui aurait rejoué).
- Stats scopées sur le classement sélectionné : nb de parties, temps
  moyen/médian, % arrivés au bout (cause `cap`), répartition des 5 causes
  de perte, et quelles distractions précises (par `distractionId`) font le
  plus perdre.
- Bouton "Actualiser" (pas de rafraîchissement live, décision explicite).

Testé : script JS vérifié (`node --check`), balises HTML équilibrées,
connexion Firebase Auth réelle testée (rejet propre d'un faux mot de passe,
message d'erreur affiché correctement à l'écran). La logique de calcul
(filtrage par festival, déduplication du classement, médiane, comptage des
causes/distractions) vérifiée séparément avec des données synthétiques —
tous les résultats corrects. **Le flux connecté complet (avec un vrai
compte) n'a pas pu être testé de bout en bout ici**, faute d'identifiants —
à valider par Sam directement.

**Règles de sécurité Firebase à mettre à jour** (voir aussi le commentaire
en tête de `lp-firebase.js`, qui reste la source de vérité) — remplace les
règles actuelles dans la console Firebase par la version complète incluant
`festivals` et `activeFestivalId`.
