import toast, { Toaster } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import styles from "./enlaces.module.css";
import { useRef, useEffect, useState, use } from "react";
import { IconPencil } from "@tabler/icons-react";

export function Colors({ display }) {
  const scrollRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState(0);
  const [color, setColor] = useState("");
  const [nombre, setNombre] = useState("");

  const tools = [
    { id: 1, nombre: "default", color: "#b2d817" },
    { id: 2, nombre: "default2", color: "#b2d817" },
    { id: 3, nombre: "default3", color: "#b2d817" },
    { id: 4, nombre: "default4", color: "#b2d817" },
    { id: 5, nombre: "default5", color: "#b2d817" },
    { id: 6, nombre: "default6", color: "#b2d817" },
    { id: 7, nombre: "default7", color: "#b2d817" },
    { id: 8, nombre: "default8", color: "#b2d817" },
    { id: 9, nombre: "default9", color: "#b2d817" },
    { id: 10, nombre: "default10", color: "#b2d817" },
    { id: 11, nombre: "default11", color: "#b2d817" },
    { id: 12, nombre: "default12", color: "#b2d817" },
    { id: 13, nombre: "default13", color: "#b2d817" },
    { id: 14, nombre: "default14", color: "#b2d817" },
    { id: 15, nombre: "default15", color: "#b2d817" },
    { id: 16, nombre: "default16", color: "#b2d817" },
    { id: 17, nombre: "default17", color: "#b2d817" },
    { id: 18, nombre: "default18", color: "#b2d817" },
    { id: 19, nombre: "default19", color: "#b2d817" },
    { id: 20, nombre: "default20", color: "#b2d817" },
    { id: 21, nombre: "default21", color: "#b2d817" },
    { id: 22, nombre: "default22", color: "#b2d817" },
    { id: 23, nombre: "default23", color: "#b2d817" },
    { id: 24, nombre: "default24", color: "#b2d817" },
  ];
  const groups = [];
  for (let i = 0; i < tools.length; i += 12) {
    groups.push(tools.slice(i, i + 12));
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault();
        const scrollSpeed = 3.4; // para más desplazamiento
        scrollContainer.scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);
  useEffect(() => {
    if (!editForm) {
      setId(0);
      setColor("");
      setNombre("");
    }
  }, [editForm]);
  return (
    <div
      className={`h-full w-full overflow-hidden flex flex-col items-center border-2 border-white rounded-md ${
        display ? "" : "hidden"
      }`}
    >
      <div className="bg-red-700 relative  h-14 items-center justify-center grid grid-cols-6 grid-rows-1 w-full">
        <div className="col-start-1 col-end-6 text-xl  w-full font-bold uppercase flex justify-center items-center">
          Colors
        </div>
        <button
          title="Acceder"
          onClick={() => setEditable(!editable)}
          className={`col-start-6 col-end-7 ${
            editable ? "bg-black" : "bg-white"
          } flex justify-center w-12 h-5/6 rounded items-center absolute`}
        >
          <IconPencil
            color={editable ? "white" : "black"}
            className={editable && styles.pulse}
            size={40}
          />
        </button>
      </div>
      <div
        ref={scrollRef}
        className={`w-full flex-1 overflow-x-auto overflow-y-hidden ${styles.scrollContainer}`}
      >
        <div className="flex gap-6 w-full">
          {groups.map((group, index) => (
            <div
              key={index}
              className="grid grid-cols-3 grid-rows-4 gap-2 w-full p-4    rounded-2xl flex-shrink-0"
            >
              {group.map((color, i) => (
                <div
                  key={i}
                  className="w-full h-12 flex text-white items-center gap-4 p-2 rounded-xl hover:bg-white hover:text-black transition"
                  onClick={() => {
                    if (!editable) {
                      handleCopy(color.color);
                    } else {
                      setId(color.id - 1);
                      setEditForm(true);
                    }
                  }}
                >
                  <div
                    style={{ backgroundColor: color.color }}
                    className="h-full w-12"
                  ></div>
                  <div className="w-full h-full flex items-center">
                    <h1>{color.nombre}</h1>
                  </div>
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
              <label htmlFor="color">Color</label>
              <input
                id="color"
                className="p-2 rounded text-black"
                type="text"
                placeholder={tools[id].color}
                value={color}
                onChange={(e) => {
                  const color = e.target.value;
                  setColor(color);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                placeholder={tools[id].nombre}
                className="p-2 rounded placeholder:text-gray-500 text-black"
                value={nombre}
                onChange={(e) => {
                  const nombre = e.target.value;
                  setNombre(nombre);
                }}
              />
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <button className="w-full bg-white p-2 rounded text-black font-bold hover:bg-red-400 hover:text-white active:scale-110 duration-200 active:bg-black active:text-white active:border-2 active:border-white">
                Guardar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
