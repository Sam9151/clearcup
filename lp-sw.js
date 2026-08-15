// Service worker du jeu "Lâche pas" — PWA installable sur l'écran d'accueil,
// jeu jouable hors-ligne une fois visité une première fois.
//
// Règle absolue : ce service worker ne doit JAMAIS mettre en cache ni
// intercepter quoi que ce soit en dehors des fichiers du jeu lui-même.
// clearcup.ch est un site multi-pages (index.html, guide-*.html,
// partenaires.html...) servi depuis la même origine que ce fichier ; comme
// il est enregistré à la racine, le navigateur lui fait entendre TOUTES les
// requêtes de l'origine (portée par défaut = dossier du script = "/"), mais
// on ne répond nous-mêmes (event.respondWith) que pour les chemins listés
// dans GAME_FILES ci-dessous. Pour tout le reste — y compris index.html —
// on laisse l'événement fetch filer sans y toucher : le navigateur traite
// la requête normalement, comme si ce service worker n'existait pas.
var CACHE_NAME = 'lp-cache-v1';

var GAME_FILES = [
  '/game.html',
  '/lp-manifest.json',
  '/lp-firebase-config.js',
  '/lp-firebase.js',
  '/lp-percentiles.json',
  '/TYPO/lp-bagel-fat-one.woff2',
  '/TYPO/lp-arimo.woff2',
  '/ASSET_CC/icon-192.png',
  '/ASSET_CC/icon-512.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      // addAll() échoue en bloc si UNE seule requête échoue (ex. hors-ligne
      // dès la 1ère visite, improbable mais possible) : on veut que le jeu
      // reste installable même si le pré-cache initial rate, donc on tente
      // fichier par fichier sans faire échouer l'install en cas de souci.
      return Promise.all(GAME_FILES.map(function(path){
        return cache.add(path).catch(function(){ /* tant pis pour ce fichier, pas bloquant */ });
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(key){
        // Préfixe lp-cache- : ne touche jamais un éventuel cache d'un autre
        // service worker sur ce même domaine (le site principal n'en a pas
        // aujourd'hui, mais on reste prudent si ça change un jour).
        if (key.indexOf('lp-cache-') === 0 && key !== CACHE_NAME) return caches.delete(key);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  var req = event.request;
  if (req.method !== 'GET') return; // laisse passer POST/etc. sans y toucher

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // jamais les CDN externes (Firebase...)
  if (GAME_FILES.indexOf(url.pathname) === -1) return; // pas un fichier du jeu : on n'intercepte pas

  // Cache d'abord (rapide, marche hors-ligne), avec mise à jour silencieuse
  // du cache en tâche de fond si le réseau répond — le joueur profite de la
  // dernière version au prochain lancement sans jamais attendre le réseau
  // pour celui en cours.
  event.respondWith(
    caches.match(req).then(function(cached){
      var network = fetch(req).then(function(res){
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, copy); });
        }
        return res;
      }).catch(function(){ return cached; }); // hors-ligne : repli sur le cache
      return cached || network;
    })
  );
});
