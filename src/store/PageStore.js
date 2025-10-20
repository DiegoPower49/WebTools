import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { useStore } from "zustand";
export const pageStore = createStore(
  persist(
    (set, get) => ({
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
          icono:
            "https://bantelperu.com/storage/2025/10/cropped-ISOLOGO-SLOGAN_Mesa-de-trabajo-1-1.webp",
        },
        {
          id: 2,
          nombre: "Test de velocidad Web",
          link: "https://pagespeed.web.dev",
          icono: "",
        },
        {
          id: 3,
          nombre: "Iconos de marcas",
          link: "https://tablericons.com",
          icono: "",
        },
        { id: 4, nombre: "Iconos", link: "https://svgl.app", icono: "" },
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
      },
      setText: (text) => set({ text: text }),
      setTitle: (title) => set({ title: title }),

      setTabs: (tab) => {
        const tabList = get().tabs;
        const updatedTabList = { ...tabList, [tab]: !tabList[tab] };
        set({ tabs: updatedTabList });
        console.log(tab, tabList);
      },

      changeColor: (id, text, color) => {
        const colors = get().colors;
        const updatedColors = colors.map((c, i) =>
          i === id ? { ...c, nombre: text, color: color } : c
        );
        set({ colors: updatedColors });
      },
      changeLink: (id, text, link, icono) => {
        const links = get().links;
        const updatedLinks = links.map((c, i) =>
          i === id ? { ...c, nombre: text, link: link, icono: icono } : c
        );
        set({ links: updatedLinks });
      },
    }),
    {
      name: "pagestorage",
    }
  )
);

export const usePageStore = () => useStore(pageStore);
