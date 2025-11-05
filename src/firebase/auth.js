// ./auth.js
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { syncStoreWithFirestore } from "./firestore";
import { pageStore } from "@/store/PageStore";

const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export const handleLoginSuccess = async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    if (window.__UNSUB_FIRESTORE__) {
      window.__UNSUB_FIRESTORE__();
      delete window.__UNSUB_FIRESTORE__;
    }

    const unsub = await syncStoreWithFirestore(pageStore, user.uid);

    window.__UNSUB_FIRESTORE__ = unsub;
  } catch (err) {
    console.error("Failed to start Firestore sync:", err);
  }
};

export const login = async (email, password, callback) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await handleLoginSuccess();

    callback({ success: true, user: userCredential.user });
  } catch (error) {
    callback({ success: false, error });
  }
};

export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async (callback) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const docRef = doc(db, "users", user.uid);
    const exists = (await getDoc(docRef)).exists();

    if (!exists) {
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        createdAt: Date.now(),
      });
    }

    await handleLoginSuccess();

    callback({ success: true, user });
  } catch (error) {
    callback({ success: false, error });
  }
};

export const logout = async () => {
  if (window.__UNSUB_FIRESTORE__) {
    try {
      window.__UNSUB_FIRESTORE__();
      delete window.__UNSUB_FIRESTORE__;
    } catch (e) {}
  }
  await signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
