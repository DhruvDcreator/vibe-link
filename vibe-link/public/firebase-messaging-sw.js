importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey:
    "AIzaSyDf_wt5xYEy47MueQdOfN3sdvRMbiT7bV4",

  authDomain:
    "vibe-link-61cf9.firebaseapp.com",

  projectId:
    "vibe-link-61cf9",

  storageBucket:
    "vibe-link-61cf9.firebasestorage.app",

  messagingSenderId:
    "1093296353936",

  appId:
    "1:1093296353936:web:e0eac5c8eb1b6e3a395e15",
});

const messaging =
  firebase.messaging();