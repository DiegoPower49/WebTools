"use client";
import { useEffect, useState } from "react";
import Table from "@/components/table/table";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const user = getAuth().currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/welcome");
    }
  }, []);

  return <Table />;
}
