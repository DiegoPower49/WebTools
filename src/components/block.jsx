"use client";
import { usePageStore } from "@/store/PageStore";
import { color } from "framer-motion";

export default function Block({ theme, textTheme, hoverTextTheme }) {
  const { text, setText, title, setTitle } = usePageStore();

  const exportToTextFile = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title === "" ? "untitled" : title}.txt`; // Nombre del archivo descargado
    link.click();
  };

  return (
    <div
      style={{ border: `2px solid ${theme}` }}
      className={`h-full border- rounded-xl overflow-hidden`}
    >
      <div
        style={{ borderColor: theme }}
        className="grid overflow-hidden grid-rows-1 grid-cols-8  border-b-2 h-1/6 "
      >
        <div
          style={{ backgroundColor: theme, color: textTheme }}
          className="col-span-1 flex justify-center items-center font-bold "
        >
          Name:
        </div>
        <input
          className="col-span-5 p-2 w-full bg-black outline-none resize-none"
          spellCheck="false"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          style={{
            backgroundColor: theme,
            color: textTheme,
          }}
          onClick={exportToTextFile}
          className="hover:opacity-60 col-span-2 flex p-2  active:scale-110 duration-300 hover:text-white items-center justify-center font-bold cursor-pointer"
        >
          Download
        </div>
      </div>
      <div className="h-5/6 grid">
        <textarea
          style={{ color: theme, borderColor: theme }}
          className="bg-transparent text-white focus:border-black  p-5 resize-none"
          spellCheck="false"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
