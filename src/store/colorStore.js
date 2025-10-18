import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export const colorStore = createStore()(
  persist(
    (set, get) => (
      {
        colores: [],
        links: [],
        tabs: [],

        addColor: ({ nombre, valor }) => {
          const colores = [...get().colores];
          const nextIndex = colores.findIndex((c) => !c.valor);
          if (nextIndex !== -1) {
            colores[nextIndex] = { nombre, valor };
            set({ colores });
          }
        },
      },
      {
        name: "colors",
      }
    )
  )
);
