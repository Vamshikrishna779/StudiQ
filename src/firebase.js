// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyArw4hta6dNfJRp48bY5Z2b47ag_R5G-mI",
  authDomain: "studi-2e08c.firebaseapp.com",
  projectId: "studi-2e08c",
  storageBucket: "studi-2e08c.firebasestorage.app",
  messagingSenderId: "414723164531",
  appId: "1:414723164531:web:9c553047baef7d1b681d06",
  measurementId: "G-FNRLSJDHG8",
  databaseURL: "https://studi-2e08c-default-rtdb.firebaseio.com", // ✅ Add RTDB URL
};

// ✅ Initialize app
const app = initializeApp(firebaseConfig);

// ✅ Auth
const auth = getAuth(app);

// ✅ Providers
const googleProvider = new GoogleAuthProvider();

// ✅ Firestore
const db = getFirestore(app);

// ✅ Realtime DB
const rtdb = getDatabase(app);

// ✅ Exports
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  googleProvider,
  db,
  rtdb
};
