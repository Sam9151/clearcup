// Écriture des parties dans Firebase Realtime Database, avec file d'attente
// hors-ligne. Fichier volontairement séparé de game.html : si Firebase
// change (clé, projet, schéma...), c'est ici et seulement ici qu'il faut
// intervenir. game.html ne connaît jamais Firebase directement — il écrit
// dans localStorage (clé lp_pending_runs, voir queueRun() dans game.html) et
// se contente de déclencher l'événement 'lp:run-queued' ; c'est ce fichier
// qui écoute cet événement et tente réellement l'envoi. Ce découplage garde
// le jeu jouable à l'identique si Firebase est bloqué, en panne, ou que le
// joueur est hors-ligne : la file s'accumule sans bloquer une seule partie,
// et se vide toute seule à la prochaine occasion (retour réseau, prochain
// lancement).
//
// Règles de sécurité correspondantes à coller dans la console Firebase
// (Realtime Database → Règles). Mis à jour pour le mode festival
// (stats.html) : "festivals" (liste des festivals créés, admin uniquement)
// et "activeFestivalId" (pointeur vers le festival actif, lecture PUBLIQUE
// nécessaire — le jeu doit pouvoir le lire avant chaque partie pour taguer
// la partie, voir getActiveFestivalId() dans game.html — écriture réservée
// à l'admin). "runs" gagne le champ festivalId, même logique que
// distractionId (optionnel, null = mode Général) :
//
// {
//   "rules": {
//     "runs": {
//       ".read": "auth != null",
//       "$runId": {
//         ".write": "!data.exists()",
//         ".validate": "newData.hasChildren(['scoreMs','cause','clientId','gameVersion','createdAt'])",
//         "handle": { ".validate": "newData.val() == null || (newData.isString() && newData.val().length <= 30)" },
//         "scoreMs": { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 45000" },
//         "cause": { ".validate": "newData.isString() && newData.val().matches(/^(deux_doigts|jauge|action_ratee|leurre|cap)$/)" },
//         "distractionId": { ".validate": "newData.val() == null || newData.isString()" },
//         "percentileShown": { ".validate": "newData.val() == null || (newData.isNumber() && newData.val() >= 0 && newData.val() <= 100)" },
//         "clientId": { ".validate": "newData.isString() && newData.val().length <= 64" },
//         "gameVersion": { ".validate": "newData.isString() && newData.val().length <= 16" },
//         "festivalId": { ".validate": "newData.val() == null || (newData.isString() && newData.val().length <= 64)" },
//         "createdAt": { ".validate": "newData.val() == now" },
//         "$other": { ".validate": false }
//       }
//     },
//     "festivals": {
//       ".read": "auth != null",
//       "$festivalId": {
//         ".write": "auth != null && !data.exists()",
//         ".validate": "newData.hasChildren(['name','createdAt'])",
//         "name": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 80" },
//         "createdAt": { ".validate": "newData.val() == now" },
//         "$other": { ".validate": false }
//       }
//     },
//     "activeFestivalId": {
//       ".read": true,
//       ".write": "auth != null",
//       ".validate": "newData.val() == null || newData.isString()"
//     }
//   }
// }

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getDatabase, ref, push, set, get, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

var QUEUE_KEY = 'lp_pending_runs';

function readQueue(){
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); }
  catch(e){ return []; }
}
function writeQueue(list){
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(list)); }
  catch(e){ /* quota pleine ou storage indisponible : tant pis, pas bloquant pour le jeu */ }
}

var db = null;
try {
  if (window.LP_FIREBASE_CONFIG){
    var app = initializeApp(window.LP_FIREBASE_CONFIG);
    db = getDatabase(app);
  } else {
    console.warn('[lp-firebase] LP_FIREBASE_CONFIG absent (lp-firebase-config.js pas chargé ?) — les parties resteront en attente locale.');
  }
} catch(e){
  console.warn('[lp-firebase] initialisation impossible, les parties resteront en attente locale.', e);
}

// Un seul envoi à la fois, pour ne jamais pousser deux fois la même entrée
// si 'lp:run-queued' et le flush au chargement se chevauchent.
var flushing = false;

function flushQueue(){
  if (flushing || !db) return;
  var queue = readQueue();
  if (!queue.length) return;
  flushing = true;

  var next = queue[0];
  var runRef = push(ref(db, 'runs'));
  set(runRef, Object.assign({}, next, { createdAt: serverTimestamp() }))
    .then(function(){
      // On relit la file (plutôt que de réutiliser la variable `queue`
      // capturée plus haut) au cas où d'autres parties se seraient ajoutées
      // pendant l'envoi — shift() reste correct car les nouvelles entrées
      // sont toujours ajoutées à la fin (voir queueRun() dans game.html).
      var remaining = readQueue();
      remaining.shift();
      writeQueue(remaining);
      flushing = false;
      if (remaining.length) flushQueue(); // continue jusqu'à vider la file
    })
    .catch(function(err){
      console.warn('[lp-firebase] écriture différée (hors-ligne ou règles Firebase) :', err && err.message);
      flushing = false; // on retentera au prochain déclencheur ci-dessous
    });
}

window.addEventListener('lp:run-queued', flushQueue);
window.addEventListener('online', flushQueue);
flushQueue(); // tentative immédiate au chargement (parties laissées en attente d'une session précédente)

// Mode festival — lu une seule fois au chargement de la page (pas de suivi
// en direct pendant la session : si l'admin bascule le mode pile pendant
// qu'un joueur a la page ouverte depuis un moment, sa partie en cours reste
// taguée sur l'ancien mode — compromis assumé, cas rare et sans
// conséquence grave, voir getActiveFestivalId() dans game.html qui relit
// cette valeur). Stockée même quand elle vaut "aucun festival" pour
// distinguer "pas encore lu" (absent) de "lu, mode Général" (chaîne vide) —
// getActiveFestivalId() traite les deux comme null de toute façon.
function syncActiveFestival(){
  if (!db) return;
  get(ref(db, 'activeFestivalId')).then(function(snap){
    var val = snap.exists() ? snap.val() : '';
    try { localStorage.setItem('lp_active_festival_id', val || ''); } catch(e){}
  }).catch(function(err){
    console.warn('[lp-firebase] lecture du festival actif impossible (hors-ligne ?) :', err && err.message);
  });
}
syncActiveFestival();
