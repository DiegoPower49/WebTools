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
import { usePageStore } from "@/store/PageStore";

export default function page() {
  const { tabs, setTabs } = usePageStore();

  const [showCalc, setShowCalc] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showConversor, setShowConversor] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [showColors, setShowColors] = useState(false);

  return (
    <div
      className={`flex bg-black text-white flex-col min-h-dvh overflow-hidden  ${
        process.env.NODE_ENV === "development" ? "debug-screens" : ""
      }`}
    >
      <div className="font-bold text-4xl grid h-14 justify-center items-center text-center  bg-red-800">
        Fasttools.vercel.app
      </div>
      <div className="w-screen bg-black h-16 ">
        <div className="flex h-full w-full justify-center items-center gap-2 ">
          <button
            className={` p-2 rounded ${
              tabs.calculator ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setTabs("calculator");
            }}
          >
            <IconCalculator size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              tabs.recorder ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setTabs("recorder");
            }}
          >
            <IconVideoPlus size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              tabs.notes ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setTabs("notes");
            }}
          >
            <IconNote size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              tabs.conversor ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setTabs("conversor");
            }}
          >
            <IconPhotoEdit size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              tabs.links ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setTabs("links");
            }}
          >
            <IconLink size={40} />
          </button>
          <button
            className={` p-2 rounded ${
              tabs.colors ? "bg-red-700 text-white" : "bg-white text-black"
            }`}
            onClick={() => {
              setTabs("colors");
            }}
          >
            <IconBrush size={40} />
          </button>
        </div>
      </div>
      <div className="flex-1 py-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 auto-rows-[350px] items-center justify-center gap-y-4 md:gap-5 ">
        <Conversor display={tabs.conversor} />
        <Recorder display={tabs.recorder} />
        <Block display={tabs.notes} />
        <Calculator display={tabs.calculator} />
        <Links display={tabs.links} />
        <Colors display={tabs.colors} />
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
