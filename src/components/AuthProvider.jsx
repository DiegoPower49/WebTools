import { useEffect } from "react";
import { onAuthChange } from "../firebase/auth";
import { useUserStore } from "../store/userStore";

export default function AuthProvider({ children }) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const unsub = onAuthChange((firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            }
          : null
      );
    });
    return () => unsub();
  }, []);

  return children;
}
