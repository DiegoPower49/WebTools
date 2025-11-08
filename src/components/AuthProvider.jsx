"use client";
import { useEffect } from "react";
import { onAuthChange } from "@/firebase/auth";
import { startFirestoreSync } from "@/firebase/firestore";
import { useUserStore } from "@/store/userStore";
import { usePageStore } from "@/store/PageStore";

export default function AuthProvider({ children }) {
  const pageStore = usePageStore();
  const setUser = useUserStore((s) => s.setUser);

  let stopSync = null;

  useEffect(() => {
    const unsub = onAuthChange(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);

        const local = JSON.parse(localStorage.getItem("page-store"));
        if (local?.state) pageStore.setState(local.state);

        if (stopSync) stopSync();
        return;
      }

      setUser({ uid: firebaseUser.uid, email: firebaseUser.email });

      stopSync = await startFirestoreSync(pageStore, firebaseUser.uid);
    });

    return () => {
      unsub();
      if (stopSync) stopSync();
    };
  }, []);

  return children;
}
