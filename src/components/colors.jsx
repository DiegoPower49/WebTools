import toast, { Toaster } from "react-hot-toast";
import styles from "./enlaces.module.css";
import { useRef, useEffect } from "react";

export function Colors({ display }) {
  const scrollRef = useRef(null);

  const tools = [
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
    {
      nombre: "default",
      color: "#b2d817",
    },
  ];
  const groups = [];
  for (let i = 0; i < tools.length; i += 9) {
    groups.push(tools.slice(i, i + 9));
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
        const scrollSpeed = 3.4; // 🔹 Aumenta este valor para más desplazamiento
        scrollContainer.scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <div
      className={`h-full w-full overflow-hidden flex flex-col items-center border-2 border-white rounded-md ${
        display ? "" : "hidden"
      }`}
    >
      <div className="bg-red-700  h-14 items-center justify-center grid grid-cols-6 grid-rows-1 w-full">
        <button
          title="Acceder"
          className="col-start-1 col-end-2 bg-red-700 h-full  w-3/4"
        ></button>

        <div className="col-start-2 col-end-6 text-xl  w-full font-bold uppercase flex justify-center items-center">
          Colors
        </div>
      </div>
      <div
        ref={scrollRef}
        className={`w-full overflow-x-auto overflow-y-hidden ${styles.scrollContainer}`}
      >
        <div className="flex gap-6 w-full">
          {groups.map((group, index) => (
            <div
              key={index}
              className="grid grid-cols-3 grid-rows-4 gap-2 w-full p-4    rounded-2xl flex-shrink-0"
            >
              {group.map((tool, i) => (
                <div
                  key={i}
                  className="w-full flex text-white items-center gap-4 p-2 rounded-xl hover:bg-white hover:text-black transition"
                  onClick={() => handleCopy(tool.color)}
                >
                  <div
                    style={{ backgroundColor: tool.color }}
                    className={`h-12 w-12`}
                  ></div>
                  <h1>{tool.nombre}</h1>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
