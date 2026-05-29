import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

// import {
//   getMessaging,
// } from "firebase/messaging";

const firebaseConfig = {

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

};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

setPersistence(
  auth,
  browserLocalPersistence
);

export const db =
  getFirestore(app);

export const storage =
  getStorage(app);

export const googleProvider =
  new GoogleAuthProvider();

//   export const messaging =
//   getMessaging(app);