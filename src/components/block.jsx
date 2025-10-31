"use client";
import { IconDownload } from "@tabler/icons-react";
import styles from "./enlaces.module.css";
import { usePageStore } from "@/store/PageStore";

export default function Block({ theme, textTheme, hoverTheme }) {
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
          className="col-span-2 flex justify-center items-center font-bold "
        >
          Name:
        </div>
        <input
          style={{ color: theme }}
          className={`col-span-3 md:col-span-4 p-2 w-full font-bold bg-transparent resize-none focus:outline-none `}
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
          className="hover:opacity-60 col-span-3 md:col-span-2 flex p-2  active:scale-110 duration-300 hover:text-white items-center justify-center font-bold cursor-pointer"
        >
          <div className="flex gap-2">
            <span>Download</span>
            <IconDownload />
          </div>
        </div>
      </div>
      <div className="h-5/6 grid">
        <textarea
          style={{ color: theme, "--theme": theme }}
          className={`bg-transparent p-5 resize-none ${styles.notes} ${styles.scrollContainer}`}
          spellCheck="false"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
