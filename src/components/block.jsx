"use client";
import { usePageStore } from "@/store/PageStore";

export default function Block({ display }) {
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
      className={`h-full border-2 border-white rounded-md ${
        display ? "" : "hidden"
      }`}
    >
      <div className="grid overflow-hidden grid-rows-1 grid-cols-8  border-b-2 h-1/6 ">
        <div className="col-span-1 flex justify-center items-center font-bold bg-white text-black">
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
          onClick={exportToTextFile}
          className="col-span-2 flex p-2  bg-red-800 hover:bg-red-600 hover:text-white items-center justify-center font-bold "
        >
          Download
        </div>
      </div>
      <div className="h-5/6 grid">
        <textarea
          className="  bg-black text-white   p-5 resize-none"
          spellCheck="false"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
