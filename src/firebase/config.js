// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv9dltJN-HdJwUb-tz-xF1rtqmc8xnTMg",
  authDomain: "fasttools-1ae6b.firebaseapp.com",
  projectId: "fasttools-1ae6b",
  storageBucket: "fasttools-1ae6b.firebasestorage.app",
  messagingSenderId: "1005946116747",
  appId: "1:1005946116747:web:fd5b3091f38835e20d528e",
  measurementId: "G-K1YMWQ8CX2",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
