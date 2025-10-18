import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { useStore } from "zustand";
export const pageStore = createStore(
  persist(
    (set, get) => ({
      colors: [
        { id: 1, nombre: "", color: "" },
        { id: 2, nombre: "", color: "" },
        { id: 3, nombre: "", color: "" },
        { id: 4, nombre: "", color: "" },
        { id: 5, nombre: "", color: "" },
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
      links: [],
      text: "",
      title: "",
      tabs: {
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
      // changeColor: (id,text,color) => {
      //   const colors = get().colors;

      //   const selectedColor = colors[id+1];
      //   const editedColor = {...selectedColor,nombre:text,color:color}
      //   const newColors ={...colors,editedColor}

      //   set({colors:newColors})
      // },
      changeColor: (id, text, color) => {
        const colors = get().colors;

        // Creamos una copia del array y reemplazamos el color correspondiente
        const updatedColors = colors.map((c, i) =>
          i === id ? { ...c, nombre: text, color: color } : c
        );

        // Actualizamos el estado
        set({ colors: updatedColors });
      },
    }),
    {
      name: "pagestorage", // ✅ Esto va fuera del callback
    }
  )
);

export const usePageStore = () => useStore(pageStore);
