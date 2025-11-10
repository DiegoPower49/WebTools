import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import {
  getFirestore,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "@/firebase/config";

const db = getFirestore(app);

export const fireStore = createStore((set, get) => ({
  uid: null,
  colors: [
    { id: 1, nombre: "theme", color: "b91c1c" },
    { id: 2, nombre: "text", color: "fafafa" },
    { id: 3, nombre: "", color: "" },
    { id: 4, nombre: "hover", color: "fafafa" },
    { id: 5, nombre: "textHover", color: "000000" },
    { id: 6, nombre: "", color: "" },
    { id: 7, nombre: "", color: "" },
    { id: 8, nombre: "", color: "" },
    { id: 9, nombre: "", color: "" },
    { id: 10, nombre: "", color: "" },
    { id: 11, nombre: "", color: "" },
    { id: 12, nombre: "", color: "" },
    { id: 13, nombre: "", color: "" },
    { id: 14, nombre: "", color: "" },
    { id: 15, nombre: "", color: "" },
    { id: 16, nombre: "", color: "" },
    { id: 17, nombre: "", color: "" },
    { id: 18, nombre: "", color: "" },
    { id: 19, nombre: "", color: "" },
    { id: 20, nombre: "", color: "" },
    { id: 21, nombre: "", color: "" },
    { id: 22, nombre: "", color: "" },
    { id: 23, nombre: "", color: "" },
    { id: 24, nombre: "", color: "" },
  ],
  links: [
    {
      id: 1,
      nombre: "Generador links Whatsapp",
      link: "https://create.wa.link",
      icono: "https://svgl.app/library/whatsapp-icon.svg",
    },
    {
      id: 2,
      nombre: "Test de velocidad Web",
      link: "https://pagespeed.web.dev",
      icono:
        "https://www.gstatic.com/pagespeed/insights/ui/logo/favicon_48.png",
    },
    {
      id: 3,
      nombre: "Iconos de marcas",
      link: "https://tablericons.com",
      icono:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEm0lEQVR4AbVXRbAkNwydzb+GmdM/tMz3qnByDJzD1BBmZsZjmJmZs9CwzMzMzDSk1fO8mXH39tIHV6nsttXSkyzZcsFuZwRxS318uh93PcOPrj3DT55wvORDx4//PsOPJygtUtqotN0J4jII49pctBA84FX6EP9CBmQ1dPjUkW2ON6yL6f1ogDL9pj8XtReQE2gfJOKkSddAOfPoscb/Kes3yK4ZOrxLxvLkEKJzqZCUqIX4OSk5vrG0QqqCnACEMYnrhjeIS/iXMsQhGCUfulpvg8FG+bCWmssjDwy0rNgUmlTpgSrWDoDIayy3wAEMveJFQWo7HC/q31QOS6nQj6m07QQZlGVk17YGFA8sWIHxGxEXCYQuppD2k9kqxgU9Ef3OaE+6QbHtMgLYQxDn2kRGdmBtKYz1km4Fk2oMOO1TyltvS+Q0L5bTlc68rf0gLM+abYZuZMATFKrubyo/XfsTbg6l+93D5Zw7hsmxNw6tgWq3JwCAKR7ET2gAxh9yoeRYgk91I3n9t4WyYWtRlqzdIY98NUdOvDnUeXijnSAC6DL9BwjAf3BwMHerEA5rb357umTbn+PXSLe7hstJt0RtBsG0LHP8F47fiURTweTZtw+Tw68dIq/+ulDQdhQrUqlUpVSuCtrkRVtkwIMj2wuiwn4CPLDInkTgnajCL31uvOwqVaCzobzI76mLt0iPe4abbWoliDYCWAAAG+quYW+EIgCvem2SLF6zIxfEoCnr5JRbIyo/cBAZXesBYIc9ybFx73E3htLznhESTV8vaOVKlWBqIJ7/cT54mKIHTtZZsA0AyjYAG8RZt9eyAeN/Jq5tgKgQyIoNO6XrncNwVrQlFdEX9wsAwuHqPzQDsgCQnufqGXE6tm3fCvcFYB9bcFMoXTXtsN915dVqMyMe/2auHK884D/VzSes8fDKA7Btn0F4xasTZd6q7VSeDsLfx60BDzLGnA297h2BeEkR5iAPKUsQWQDrCiij8tLwsufTaQjL68rHzd8s5+reQzDOi7VbirJ5e0k2KaFvjHeUZOy8TXLB0+Pk5FuRsvlpONGexEF02DVD5I3fF9kHUcMDY1Rgn/tGwHpYyfl9tzf/WASZkG0DQOyML6CAzB7Fx9wwVNz3Zki2/TR6tZytQQdr6hny8i/qgc35HkA/Zu4mOf/psXUPZI/iPwHgQx7FqcvoNDc2yNepe+drHNz/2WwTcKfxaqYFekG1KQZKrJbez1zHcfY6NsLhumNvDFPXcbZmOLAsYACiGAnM2uOmIOFiGSdUbkHi5xckGB/gwZNXkKDQuQYAuurHLis9Oqcko2z2Ap1aHXdtFqVwK13j+B1blKY823zw/GpXxf1ZD9azgT+1H0SmyMVTzsxBJ5VHLelXUUJPgCnlsmobLhtbRpFlOTLO5fuTD5MgtJ9m9ASExWVmR0l/QpA2nmaOEvrMuAIe8DLVipQhTcsjzyj3ovT7sPX2qA6iP/bHBAkRW4Ds51fOmDx+M2gpYxdl9jc6ssrznufIDqboE0of6NpfKmwCn+AbnNqTvAzieAPWwEPeD5DnNRmMdmM5dbDtBjANMz0u2EsyAAAAAElFTkSuQmCC",
    },
    {
      id: 4,
      nombre: "Iconos",
      link: "https://svgl.app",
      icono: "https://svgl.app/library/svgl.svg",
    },
    { id: 5, nombre: "", link: "", icono: "" },
    { id: 6, nombre: "", link: "", icono: "" },
    { id: 7, nombre: "", link: "", icono: "" },
    { id: 8, nombre: "", link: "", icono: "" },
    { id: 9, nombre: "", link: "", icono: "" },
    { id: 10, nombre: "", link: "", icono: "" },
    { id: 11, nombre: "", link: "", icono: "" },
    { id: 12, nombre: "", link: "", icono: "" },
    { id: 13, nombre: "", link: "", icono: "" },
    { id: 14, nombre: "", link: "", icono: "" },
    { id: 15, nombre: "", link: "", icono: "" },
    { id: 16, nombre: "", link: "", icono: "" },
  ],
  text: "",
  title: "",
  tabs: {
    header: true,
    calculator: false,
    recorder: false,
    notes: false,
    conversor: false,
    links: false,
    colors: false,
    apiTester: false,
    jwt: false,
    editor: false,
    qr: false,
  },
  api: "http://localhost:3000",
  loading: true,
  error: null,

  /** Cargar datos desde Firestore según el UID del usuario */
  loadUserData: (uid) => {
    if (!uid) {
      return;
    }

    const userDoc = doc(db, "stores", uid);
    const unsubscribe = onSnapshot(
      userDoc,
      (snapshot) => {
        if (snapshot.exists()) {
          set({ ...snapshot.data(), loading: false });
        } else {
          // Crear documento inicial limpio (sin funciones)
          const initialData = Object.fromEntries(
            Object.entries(get()).filter(([_, v]) => typeof v !== "function")
          );
          setDoc(userDoc, initialData);
          set({ loading: false });
        }
      },
      (error) => {
        console.error("Error al cargar datos:", error);
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe;
  },

  /** Guardar cambios en Firestore (merge) */
  saveToFirestore: async () => {
    const { uid, ...state } = get();
    if (!uid) return;

    // Filtrar funciones y valores no serializables
    const data = Object.fromEntries(
      Object.entries(state).filter(([_, v]) => typeof v !== "function")
    );

    try {
      await updateDoc(doc(db, "stores", uid), data);
    } catch (err) {
      console.error("Error guardando datos:", err);
    }
  },

  /** Métodos para modificar el estado */
  setApi: (api) => {
    set({ api });
    get().saveToFirestore();
  },

  setText: (text) => {
    set({ text });
    get().saveToFirestore();
  },

  setTitle: (title) => {
    set({ title });
    get().saveToFirestore();
  },

  setTabs: (tab) => {
    const tabList = get().tabs || {};
    const updatedTabList = { ...tabList, [tab]: !tabList[tab] };
    set({ tabs: updatedTabList });
    get().saveToFirestore();
  },

  setColors: (id, text, color) => {
    const colors = get().colors || [];
    const updatedColors = colors.map((c, i) =>
      i === id ? { ...c, nombre: text, color } : c
    );
    set({ colors: updatedColors });
    get().saveToFirestore();
  },

  setLinks: (id, text, link, icono) => {
    const links = get().links || [];
    const updatedLinks = links.map((c, i) =>
      i === id ? { ...c, nombre: text, link, icono } : c
    );
    set({ links: updatedLinks });
    get().saveToFirestore();
  },
}));

export const useFireStore = () => useStore(fireStore);
