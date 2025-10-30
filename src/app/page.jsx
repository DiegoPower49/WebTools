"use client";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  IconApi,
  IconBrush,
  IconCalculator,
  IconHash,
  IconLayoutNavbar,
  IconLink,
  IconNote,
  IconPhotoEdit,
  IconRocket,
  IconShield,
  IconVideoPlus,
} from "@tabler/icons-react";
import { usePageStore } from "@/store/PageStore";
import Recorder from "../components/recorder";
import Block from "../components/block";
import Calculator from "../components/calculator";
import Conversor from "@/components/Conversor";
import Links from "@/components/enlaces";
import Colors from "@/components/colors";
import ApiTester from "@/components/testApi";
import Hasher from "@/components/hasher";
import Image from "next/image";
import { Icon } from "lucide-react";

export default function Page() {
  const { tabs, setTabs, colors } = usePageStore();
  const [theme, setTheme] = useState();
  const [hoverTheme, setHoverTheme] = useState();
  const [textTheme, setTextTheme] = useState();
  const [hoverTextTheme, setHoverTextTheme] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findedColor = colors.find((item) => item.nombre === "theme");
    const newTheme =
      findedColor && findedColor.color ? `#${findedColor.color}` : "#b91c1c";
    setTheme(newTheme);

    const findedHover = colors.find((item) => item.nombre === "hover");
    const newHoverTheme =
      findedHover && findedHover.color ? `#${findedHover.color}` : "#fafafa";
    setHoverTheme(newHoverTheme);

    const findedText = colors.find((item) => item.nombre === "text");
    const newTextTheme =
      findedText && findedText.color ? `#${findedText.color}` : "#fafafa";
    setTextTheme(newTextTheme);

    const findedHoverText = colors.find((item) => item.nombre === "textHover");
    const newHoverThemeText =
      findedHoverText && findedHoverText.color
        ? `#${findedHoverText.color}`
        : "#000000";
    setHoverTextTheme(newHoverThemeText);
    setLoading(false);
  }, [colors]);

  return (
    <>
      {!loading && (
        <div
          style={{
            color: textTheme,
          }}
          className={`flex   flex-col min-h-dvh overflow-hidden  ${
            process.env.NODE_ENV === "development" ? "debug-screens" : ""
          }`}
        >
          <div
            style={{
              backgroundColor: theme,
              color: textTheme,
            }}
            className={`font-bold flex text-4xl gap-2 h-16 justify-center items-center text-center ${
              !tabs.header && "hidden"
            }`}
          >
            FAST TOOLS <IconRocket size={50} />
          </div>
          <div className="w-screen bg-black py-2  flex justify-center items-center gap-2">
            <div className="grid grid-cols-5 sm:grid-cols-9 h-full justify-center items-center gap-2">
              <button
                aria-label="Show Header"
                style={{
                  backgroundColor: !tabs.header ? theme : hoverTheme,
                  color: !tabs.header ? textTheme : hoverTextTheme,
                  boxShadow: tabs.header && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded 
                 
                  `}
                onClick={() => {
                  setTabs("header");
                }}
              >
                <IconLayoutNavbar size={40} />
              </button>

              <button
                aria-label="Show Calculator"
                style={{
                  backgroundColor: !tabs.calculator ? theme : hoverTheme,
                  color: !tabs.calculator ? textTheme : hoverTextTheme,
                  boxShadow: tabs.calculator && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setTabs("calculator");
                }}
              >
                <IconCalculator size={40} />
              </button>

              <button
                aria-label="Show Recorder"
                style={{
                  backgroundColor: !tabs.recorder ? theme : hoverTheme,
                  color: !tabs.recorder ? textTheme : hoverTextTheme,
                  boxShadow: tabs.recorder && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded hidden md:block`}
                onClick={() => {
                  setTabs("recorder");
                }}
              >
                <IconVideoPlus size={40} />
              </button>

              <button
                aria-label="Show Notes"
                style={{
                  backgroundColor: !tabs.notes ? theme : hoverTheme,
                  color: !tabs.notes ? textTheme : hoverTextTheme,
                  boxShadow: tabs.notes && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setTabs("notes");
                }}
              >
                <IconNote size={40} />
              </button>

              <button
                aria-label="Show Conversor"
                style={{
                  backgroundColor: !tabs.conversor ? theme : hoverTheme,
                  color: !tabs.conversor ? textTheme : hoverTextTheme,
                  boxShadow: tabs.conversor && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setTabs("conversor");
                }}
              >
                <IconPhotoEdit size={40} />
              </button>

              <button
                aria-label="Show Links"
                style={{
                  backgroundColor: !tabs.links ? theme : hoverTheme,
                  color: !tabs.links ? textTheme : hoverTextTheme,
                  boxShadow: tabs.links && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setTabs("links");
                }}
              >
                <IconLink size={40} />
              </button>

              <button
                aria-label="Show Colors"
                style={{
                  backgroundColor: !tabs.colors ? theme : hoverTheme,
                  color: !tabs.colors ? textTheme : hoverTextTheme,
                  boxShadow: tabs.colors && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded`}
                onClick={() => {
                  setTabs("colors");
                }}
              >
                <IconBrush size={40} />
              </button>

              <button
                aria-label="Show Api Tester"
                style={{
                  backgroundColor: !tabs.apiTester ? theme : hoverTheme,
                  color: !tabs.apiTester ? textTheme : hoverTextTheme,
                  boxShadow: tabs.apiTester && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded`}
                onClick={() => {
                  setTabs("apiTester");
                }}
              >
                <IconApi size={40} />
              </button>

              <button
                aria-label="Show Hasher"
                style={{
                  backgroundColor: !tabs.jwt ? theme : hoverTheme,
                  color: !tabs.jwt ? textTheme : hoverTextTheme,
                  boxShadow: tabs.jwt && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded`}
                onClick={() => {
                  setTabs("jwt");
                }}
              >
                <IconHash size={40} />
              </button>
            </div>
          </div>
          <div className="relative w-full flex-1 flex flex-col justify-center items-center">
            <div className="w-screen h-screen absolute bg-black inset-0 flex justify-center items-center -z-10">
              <Image
                src="/icono.png"
                alt="Background"
                width={600} // ajusta según el tamaño que desees
                height={600}
                className="opacity-30 object-contain select-none pointer-events-none"
                priority
                fetchPriority="high"
              />
            </div>

            <div className="2xl:w-9/12 w-full py-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-y-4 md:gap-5 p-4 ">
              {tabs.conversor && (
                <div className={`h-[350px]`}>
                  <Conversor
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.recorder && (
                <div className={`h-[350px]`}>
                  <Recorder
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.notes && (
                <div className={`h-[350px]`}>
                  <Block
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.calculator && (
                <div className={`h-[350px]`}>
                  <Calculator
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.links && (
                <div className={`h-[350px]`}>
                  <Links
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.colors && (
                <div className={`h-[350px]`}>
                  <Colors
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.apiTester && (
                <div className={`h-[500px]`}>
                  <ApiTester
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
              {tabs.jwt && (
                <div className={`h-[500px] `}>
                  <Hasher
                    theme={theme}
                    textTheme={textTheme}
                    hoverTheme={hoverTheme}
                    hoverTextTheme={hoverTextTheme}
                  />
                </div>
              )}
            </div>
          </div>
          {tabs.header && (
            <div
              style={{ color: textTheme, background: theme }}
              className="flex font-bold justify-center items-center "
            >
              <a href="https://diegotorres-portfoliodev.vercel.app">
                Web created by: Diego Torres
              </a>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </>
  );
}
