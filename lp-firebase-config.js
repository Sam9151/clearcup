// Configuration Firebase du jeu "Lâche pas" — clé publique côté client, pas
// un secret (cf. doc Firebase : https://firebase.google.com/docs/projects/api-keys).
// Fichier séparé de lp-firebase.js et de game.html pour pouvoir la remplacer
// (nouveau projet, rotation de clé...) sans toucher au reste du code.
window.LP_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAkaGQCM21qNSnMT0OhsCOeVgIvis06sNQ",
  authDomain: "clearcup-lache-pas.firebaseapp.com",
  databaseURL: "https://clearcup-lache-pas-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "clearcup-lache-pas",
  storageBucket: "clearcup-lache-pas.firebasestorage.app",
  messagingSenderId: "771974730472",
  appId: "1:771974730472:web:4d809a3c92bd2f15652f5d"
  // measurementId volontairement omis : pas de Firebase Analytics, le
  // tracking passe par GTM (voir le brief) pour ne pas dupliquer les envois.
};
