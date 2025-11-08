// firebase/firestoreSync.js
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./config";
import debounce from "lodash.debounce";

export const startFirestoreSync = async (store, userId) => {
  const ref = doc(db, "users", userId);

  // 1️⃣ Obtener datos actuales del cloud
  const snap = await getDoc(ref);
  const cloudData = snap.exists() ? snap.data() : null;

  // 2️⃣ Obtener datos del localStorage si existen
  const local = JSON.parse(localStorage.getItem("page-store"))?.state || null;

  // ✅ Lógica "first-login-upload"
  if (!cloudData) {
    if (local) {
      console.log("📤 Firestore vacío → Subiendo localStorage");
      await setDoc(ref, local); // subimos local al cloud
      store.setState(local); // también lo llevamos al store
    } else {
      console.log("🔹 Firestore vacío y LocalStorage vacío → Estado inicial");
    }
  } else {
    console.log("📥 Firestore tiene datos → Se usan como verdad absoluta");
    store.setState(cloudData);
  }

  // 🔒 Ya no queremos que Zustand siga guardando en localStorage
  localStorage.removeItem("page-store");

  // 3️⃣ Escuchar Firestore en tiempo real
  const unsubFirestore = onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("🔄 Firestore → Zustand sync");
      store.setState(data);
    }
  });

  // 4️⃣ Guardar Zustand → Firestore (con debounce)
  const unsubZustand = store.subscribe(
    debounce((state) => {
      console.log("💾 Guardando cambios a Firestore");
      setDoc(ref, state, { merge: true });
    }, 500),
    { equalityFn: () => false }
  );

  return () => {
    unsubFirestore();
    unsubZustand();
  };
};
