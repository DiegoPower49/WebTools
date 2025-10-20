"use client";
import { useState } from "react";

export default function LinkItem({
  tool,
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
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
