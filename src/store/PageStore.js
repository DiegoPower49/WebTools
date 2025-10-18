import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { useStore } from "zustand";
export const pageStore = createStore(
  persist(
    (set, get) => ({
      colores: [],
      links: [],
      tabs: {
        calculator: false,
        recorder: false,
        notes: false,
        conversor: false,
        links: false,
        colors: false,
      },

      setTabs: (tab) => {
        const tabList = get().tabs;
        const updatedTabList = { ...tabList, [tab]: !tabList[tab] };
        set({ tabs: updatedTabList });
        console.log(tab, tabList);
      },
      addColor: ({ nombre, valor }) => {
        const colores = [...get().colores];
        const nextIndex = colores.findIndex((c) => !c.valor);
        if (nextIndex !== -1) {
          colores[nextIndex] = { nombre, valor };
          set({ colores });
        }
      },
    }),
    {
      name: "pagestorage", // ✅ Esto va fuera del callback
    }
  )
);

export const usePageStore = () => useStore(pageStore);
