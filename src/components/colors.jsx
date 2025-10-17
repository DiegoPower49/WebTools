import { div } from "framer-motion/client";

export function Colors({ display }) {
  return (
    <div
      className={`h-full w-full overflow-hidden flex flex-col items-center border-2 border-white rounded-md ${
        display ? "" : "hidden"
      }`}
    >
      <div className="bg-red-700 h-14 items-center justify-center flex w-full">
        <h1 className="text-xl font-bold text-center">Colors</h1>
      </div>
      <div className="w-full h-full"></div>
    </div>
  );
}
