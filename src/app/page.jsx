"use client";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { useFireStore } from "@/store/fireStore";
import Table from "@/components/table/table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LocalTable from "@/components/table/localTable";

export default function Page() {
  const user = getAuth().currentUser;
  const [loading, setLoading] = useState(true);
  const { setUser, listenToAuth } = useUserStore();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("Usuario autenticado:", firebaseUser.uid);
        setUser(firebaseUser);
      } else {
        console.log("No hay usuario autenticado");
        setUser(null);
      }
      setLoading(false);
    });
    listenToAuth();
    return () => unsubscribe();
  }, [listenToAuth]);

  return <>{!loading && (user ? <Table /> : <LocalTable />)}</>;
}
