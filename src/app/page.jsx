"use client";
import Recorder from "../components/recorder";
import Block from "../components/block";
import Calculator from "../components/calculator";
import Conversor from "@/components/Conversor";
import { useState } from "react";
import {
  IconBrush,
  IconCalculator,
  IconLink,
  IconNote,
  IconPhotoEdit,
  IconVideoPlus,
} from "@tabler/icons-react";
import { Links } from "@/components/enlaces";
import { Colors } from "@/components/colors";

export default function page() {
  const [showCalc, setShowCalc] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showConversor, setShowConversor] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showColors, setShowColors] = useState(false);

  return (
    <div
      className={`flex flex-col min-h-dvh overflow-hidden  ${
        process.env.NODE_ENV === "development" ? "debug-screens" : ""
      }`}
    >
      <div className="font-bold text-4xl grid h-28 justify-center items-center text-center md:p-4  bg-red-800">
        <div>WELCOME TO FAST TOOLS</div>
      </div>
      <div className="w-screen bg-black h-16 ">
        <div className="flex h-full w-full justify-center items-center gap-2 ">
          <button
            className={` p-2 rounded ${
              showCalc ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowCalc(!showCalc)}
          >
            <IconCalculator size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              showRecorder ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowRecorder(!showRecorder)}
          >
            <IconVideoPlus size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              showBlock ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowBlock(!showBlock)}
          >
            <IconNote size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              showConversor ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowConversor(!showConversor)}
          >
            <IconPhotoEdit size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              showLinks ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowLinks(!showLinks)}
          >
            <IconLink size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              showColors ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowColors(!showColors)}
          >
            <IconBrush size={40} />
          </button>
        </div>
      </div>
      <div className="flex-1 py-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 auto-rows-[350px] items-center justify-center gap-y-4 md:gap-5 ">
        <Conversor display={showConversor} />
        <Recorder display={showRecorder} />
        <Block display={showBlock} />
        <Calculator display={showCalc} />
        <Links display={showLinks} />
        <Colors display={showColors} />
      </div>
      <div className="flex justify-between items-center px-10">
        <a href="https://diegotorres-portfoliodev.vercel.app">
          Web created by: Diego Torres
        </a>
        <div>Browser edition</div>
      </div>
    </div>
  );
}
