import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export const colorStore = createStore()(
  persist(
    (set, get) => ({
      // 🟢 Estado inicial: 10 colores vacíos
      colores: Array.from({ length: 10 }, () => ({
        nombre: "",
        valor: "",
      })),

      /**
       * 🧩 setColor
       * Actualiza un color específico por índice (1-10)
       * Ejemplo: setColor(1, { nombre: "Azul", valor: "#0000FF" })
       */
      setColor: (index, { nombre, valor }) => {
        const colores = [...get().colores];
        if (index >= 1 && index <= colores.length) {
          colores[index - 1] = { nombre, valor };
          set({ colores });
        }
      },

      /**
       * 🎨 addColor
       * Agrega un nuevo color si hay espacio disponible (máx. 10)
       */
      addColor: ({ nombre, valor }) => {
        const colores = [...get().colores];
        const nextIndex = colores.findIndex((c) => !c.valor);
        if (nextIndex !== -1) {
          colores[nextIndex] = { nombre, valor };
          set({ colores });
        }
      },

      /**
       * 🧼 clearColors
       * Limpia todos los colores guardados
       */
      clearColors: () =>
        set({ colores: Array(10).fill({ nombre: "", valor: "" }) }),
    }),
    {
      name: "colors", // 🗃️ nombre en localStorage
    }
  )
);
