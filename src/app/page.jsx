"use client";
import Recorder from "../components/recorder";
import Block from "../components/block";
import Calculator from "../components/calculator";
import Conversor from "@/components/Conversor";
import { useEffect, useState } from "react";
import {
  IconBrush,
  IconCalculator,
  IconLayoutNavbar,
  IconLink,
  IconNote,
  IconPhotoEdit,
  IconVideoPlus,
} from "@tabler/icons-react";
import { Links } from "@/components/enlaces";
import { Colors } from "@/components/colors";
import { usePageStore } from "@/store/PageStore";

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
          className={`flex bg-black  flex-col min-h-dvh overflow-hidden  ${
            process.env.NODE_ENV === "development" ? "debug-screens" : ""
          }`}
        >
          <div
            style={{
              backgroundColor: theme,
              color: textTheme,
            }}
            className={`font-bold text-4xl grid h-14 justify-center items-center text-center ${
              !tabs.header && "hidden"
            }`}
          >
            Fasttools.vercel.app
          </div>
          <div className="w-screen bg-black h-16 ">
            <div className="flex h-full w-full justify-center items-center gap-2 ">
              <button
                style={{
                  backgroundColor: !tabs.header ? theme : hoverTheme,
                  color: !tabs.header ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded 
                 
                  `}
                onClick={() => {
                  setTabs("header");
                }}
              >
                <IconLayoutNavbar size={40} />
              </button>
              <button
                style={{
                  backgroundColor: !tabs.calculator ? theme : hoverTheme,
                  color: !tabs.calculator ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded `}
                onClick={() => {
                  setTabs("calculator");
                }}
              >
                <IconCalculator size={40} />
              </button>
              <button
                style={{
                  backgroundColor: !tabs.recorder ? theme : hoverTheme,
                  color: !tabs.recorder ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded`}
                onClick={() => {
                  setTabs("recorder");
                }}
              >
                <IconVideoPlus size={40} />
              </button>
              <button
                style={{
                  backgroundColor: !tabs.notes ? theme : hoverTheme,
                  color: !tabs.notes ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded `}
                onClick={() => {
                  setTabs("notes");
                }}
              >
                <IconNote size={40} />
              </button>
              <button
                style={{
                  backgroundColor: !tabs.conversor ? theme : hoverTheme,
                  color: !tabs.conversor ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded `}
                onClick={() => {
                  setTabs("conversor");
                }}
              >
                <IconPhotoEdit size={40} />
              </button>
              <button
                style={{
                  backgroundColor: !tabs.links ? theme : hoverTheme,
                  color: !tabs.links ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded `}
                onClick={() => {
                  setTabs("links");
                }}
              >
                <IconLink size={40} />
              </button>
              <button
                style={{
                  backgroundColor: !tabs.colors ? theme : hoverTheme,
                  color: !tabs.colors ? textTheme : hoverTextTheme,
                }}
                className={` p-2 rounded`}
                onClick={() => {
                  setTabs("colors");
                }}
              >
                <IconBrush size={40} />
              </button>
            </div>
          </div>
          <div className="flex-1 py-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 auto-rows-[350px] items-center justify-center gap-y-4 md:gap-5 ">
            <Conversor
              display={tabs.conversor}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
            <Recorder
              display={tabs.recorder}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
            <Block
              display={tabs.notes}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
            <Calculator
              display={tabs.calculator}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
            <Links
              display={tabs.links}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
            <Colors
              display={tabs.colors}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
          </div>
          <div className="flex justify-between items-center px-10">
            <a href="https://diegotorres-portfoliodev.vercel.app">
              Web created by: Diego Torres
            </a>
            <div>Browser edition</div>
          </div>
        </div>
      )}
    </>
  );
}
