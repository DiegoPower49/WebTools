"use client";
import {
  IconBrandSkype,
  IconBrandSpeedtest,
  IconBrandWhatsapp,
  IconIcons,
} from "@tabler/icons-react";
import styles from "./enlaces.module.css";
import { useRef, useEffect, useState } from "react";

export function Links({
  display,
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const scrollRef = useRef(null);

  const tools = [
    {
      href: "https://create.wa.link",
      label: "Generador links Whatsapp",
      icon: <IconBrandWhatsapp size={40} />,
    },
    {
      href: "https://pagespeed.web.dev",
      label: "Test de velocidad Web",
      icon: <IconBrandSpeedtest size={40} />,
    },
    {
      href: "https://tablericons.com",
      label: "Iconos de marcas",
      icon: <IconIcons size={40} />,
    },
    {
      href: "https://svgl.app/",
      label: "Iconos",
      icon: <IconBrandSkype size={40} />,
    },
  ];

  // Agrupamos de 8 en 8
  const groups = [];
  for (let i = 0; i < tools.length; i += 8) {
    groups.push(tools.slice(i, i + 8));
  }

  // Scroll horizontal con rueda del mouse
  useEffect(() => {
    console.log(theme);
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY * 3.4;
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
      <div
        style={{
          backgroundColor: theme,
          color: textTheme,
        }}
        className="h-14 items-center justify-center flex w-full"
      >
        <div className="text-xl w-full font-bold uppercase flex justify-center items-center">
          Links
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
              className="grid grid-cols-2 grid-rows-4 gap-2 w-full p-4 rounded-2xl flex-shrink-0"
            >
              {group.map((tool, i) => (
                <LinkItem
                  key={i}
                  tool={tool}
                  theme={theme}
                  textTheme={textTheme}
                  hoverTheme={hoverTheme}
                  hoverTextTheme={hoverTextTheme}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LinkItem({ tool, theme, textTheme, hoverTheme, hoverTextTheme }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      style={{
        backgroundColor: hover ? hoverTheme : theme,
        color: hover ? hoverTextTheme : textTheme,
        transition: "background-color 0.25s ease, color 0.25s ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center gap-4 p-2 rounded-xl"
    >
      {tool.icon}
      <h1 className="font-medium">{tool.label}</h1>
    </a>
  );
}
