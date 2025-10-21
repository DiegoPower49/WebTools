"use client";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import styles from "./enlaces.module.css";
import { useRef, useEffect, useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import { usePageStore } from "@/store/PageStore";

export default function Colors({
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const { colors, changeColor } = usePageStore();
  const scrollRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState(0);
  const [color, setColor] = useState("");
  const [nombre, setNombre] = useState("");
  const groups = [];
  for (let i = 0; i < colors.length; i += 12) {
    groups.push(colors.slice(i, i + 12));
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText("#" + text);
    toast.success("Copied!");
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault();
        const scrollSpeed = 3.4;
        scrollContainer.scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);
  useEffect(() => {
    if (!editForm) {
      setId(0);
    }
  }, [editForm]);
  return (
    <div className="h-full w-full">
      <div
        style={{ border: `2px solid ${theme}` }}
        className={`flex flex-col h-full rounded-xl overflow-hidden`}
      >
        <div
          style={{
            backgroundColor: theme,
          }}
          className={`relative  h-14 items-center justify-center grid grid-cols-6 grid-rows-1 w-full`}
        >
          <div className="col-start-1 col-end-6 text-xl  w-full font-bold uppercase flex justify-center items-center">
            Colors
          </div>
          <button
            style={{
              backgroundColor: !editable ? theme : hoverTheme,
            }}
            onClick={() => setEditable(!editable)}
            className={`col-start-6 col-end-7  flex justify-center w-12 h-5/6 rounded items-center absolute`}
          >
            <IconPencil
              color={!editable ? textTheme : hoverTextTheme}
              className={editable && styles.pulse}
              size={40}
            />
          </button>
        </div>
        <div
          ref={scrollRef}
          style={{
            "--theme": theme,
          }}
          className={`w-full flex-1 overflow-x-auto overflow-y-hidden ${styles.scrollContainer}`}
        >
          <div className="flex gap-6 w-full">
            {groups.map((group, index) => (
              <div
                key={index}
                className="grid grid-cols-3 grid-rows-4 gap-2 w-full p-4 rounded-2xl flex-shrink-0"
              >
                {group.map((color, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (!editable) {
                        handleCopy(color.color);
                      } else {
                        setId(color.id - 1);
                        setColor(color.color);
                        setNombre(color.nombre);
                        setEditForm(true);
                      }
                    }}
                  >
                    <Color color={color} theme={theme} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Dialog onOpenChange={setEditForm} open={editForm}>
          <DialogContent className="w-full bg-black border-white border-2 text-white overflow-hidden">
            <DialogTitle className="flex justify-center items-center">
              Editar color
            </DialogTitle>
            <DialogDescription className="hidden">
              Cuadro de edicion de color
            </DialogDescription>
            <div className="grid grid-cols-1 grid-rows-3 gap-8  p-4 h-full">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder={colors[id].nombre || ""}
                  className="p-2 rounded placeholder:text-gray-500 text-black"
                  value={nombre}
                  onChange={(e) => {
                    const nombre = e.target.value;
                    setNombre(nombre);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="color">Color</label>
                <div className="w-full h-full flex gap-4">
                  <span className="w-12 flex justify-center items-center text-xl font-bold">
                    #
                  </span>
                  <input
                    id="color"
                    className="p-2 w-full rounded text-black"
                    type="text"
                    placeholder={colors[id].color || ""}
                    value={color}
                    onChange={(e) => {
                      const color = e.target.value;
                      setColor(color.toLowerCase());
                    }}
                  />
                </div>
              </div>

              <div className="w-full h-full flex justify-center items-center">
                <button
                  style={{ backgroundColor: theme, color: textTheme }}
                  onClick={() => {
                    changeColor(id, nombre, color);
                    setEditForm(false);
                  }}
                  className="hover:opacity-60 w-full p-2 rounded  font-bold duration-200 active:scale-105 active:border-2 active:border-white"
                >
                  Guardar
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function Color({ color, theme }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ color: theme, borderColor: hover && theme }}
      className="w-full h-12 flex text-white items-center gap-4 p-2 rounded-xl border-2 border-transparent"
    >
      <div
        style={{
          backgroundColor:
            color.color && color.color.length === 6
              ? `#${color.color}`
              : "transparent",
          border: `1px solid ${theme}`,
        }}
        className="h-full w-12 rounded"
      ></div>
      <div className="w-full h-full flex items-center">
        <h1>{color.nombre}</h1>
      </div>
    </div>
  );
}
