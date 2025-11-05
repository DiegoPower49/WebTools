// ./firestore.js
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { db } from "./config";

/**
 * Sync a zustand *vanilla* store with Firestore.
 * - store: the vanilla store created by createStore(...) (not the hook)
 * - userId: firestore doc id
 *
 * Returns: an unsubscribe function to stop syncing.
 */
export const syncStoreWithFirestore = async (store, userId) => {
  if (!store || !userId) throw new Error("store and userId are required");

  const ref = doc(db, "stores", userId);

  // 1) read firestore once
  const snap = await getDoc(ref);
  const firestoreData = snap.exists() ? snap.data() : null;

  // 2) read localStorage copy (your persist key)
  let localData = {};
  try {
    localData = JSON.parse(localStorage.getItem("pagestorage") || "{}");
  } catch (e) {
    localData = {};
  }

  // Priority handling: if Firestore empty and local has data -> push local to cloud.
  if (!firestoreData) {
    if (Object.keys(localData || {}).length) {
      console.log(
        "📤 Firestore empty — uploading local state to Firestore (first login)"
      );
      await setDoc(ref, localData);
      // hydrate store with local (ensure shape)
      store.setState(localData, false);
    } else {
      console.log("🔹 Both Firestore and local are empty — keeping defaults");
    }
  } else {
    console.log("📥 Firestore has data — hydrating store from cloud");
    store.setState(firestoreData, false);
    // optionally keep a copy locally
    localStorage.setItem("pagestorage", JSON.stringify(firestoreData));
  }

  // 3) subscribe to realtime updates from Firestore -> update store
  const unsubscribeSnapshot = onSnapshot(ref, (docSnap) => {
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    console.log("🔄 Firestore -> Zustand sync (realtime)");
    // setState with replace = false? using false to avoid triggering subscribers that write back immediately
    store.setState(data, false);
    localStorage.setItem("pagestorage", JSON.stringify(data));
  });

  // 4) when store changes, save to Firestore (debounced)
  const debouncedSave = debounce(async (state) => {
    try {
      // write whole state; you can change to partial if preferred
      await setDoc(ref, state, { merge: true });
      localStorage.setItem("pagestorage", JSON.stringify(state));
      // console.log("💾 Saved state to Firestore");
    } catch (err) {
      console.error("Error saving to Firestore:", err);
    }
  }, 700);

  const unsubStore = store.subscribe((state) => {
    // note: avoid saving if state is empty or initializing
    debouncedSave(state);
  });

  // 5) return unified unsubscribe
  const unsubscribeAll = () => {
    try {
      unsubscribeSnapshot();
    } catch (e) {}
    try {
      unsubStore();
    } catch (e) {}
    debouncedSave.cancel && debouncedSave.cancel();
  };

  return unsubscribeAll;
};
