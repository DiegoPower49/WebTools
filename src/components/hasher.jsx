"use client";
import { useState } from "react";
import JWTGenerator from "./hasher/JWTGenerator";
import JWTVerifier from "./hasher/JWTVerifier";
import { IconHash, IconZoomCode } from "@tabler/icons-react";
/**
 * JWT Hasher mejorado:
 * - iat y exp automáticos (configurable en minutos)
 * - soporte HS256/HS384/HS512 y RS256 (generación/verificación con jose)
 * - formato JSON robusto
 * - copy al portapapeles
 *
 * Requisitos: npm i jose react-hot-toast
 */

export default function Hasher({
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const [action, setAction] = useState("hash");

  return (
    <div className="h-full w-full">
      <div
        style={{ border: `2px solid ${theme}`, color: textTheme }}
        className="w-full h-full  rounded-lg border overflow-hidden"
      >
        <div
          style={{
            backgroundColor: theme,
          }}
          className={`relative  h-14 items-center justify-center md:grid grid-cols-6 md:grid-rows-1 flex w-full`}
        >
          <div className="md:col-start-1 md:col-end-4 text-xl  w-full font-bold uppercase flex justify-center items-center">
            HASHER
          </div>
          <div className="md:col-start-4 md:col-end-7 flex justify-center items-center gap-4">
            <div
              style={{
                backgroundColor: action === "hash" && hoverTheme,
                color: textTheme,
                boxShadow: action === "hash" && `0px 0px 5px 1px ${hoverTheme}`,
              }}
              className={`flex p-2 rounded ${
                action != "hash" ? "border-white" : "border-black"
              } border-2 font-bold items-center justify-center gap-2 hover:opacity-70`}
              onClick={() => setAction("hash")}
            >
              <div>HASH</div> <IconHash />
            </div>
            <div
              style={{
                backgroundColor: action === "verify" && hoverTheme,
                color: textTheme,
                boxShadow:
                  action === "verify" && `0px 0px 5px 1px ${hoverTheme}`,
              }}
              className={`flex p-2 rounded font-bold  ${
                action != "verify" ? "border-white" : "border-black"
              } border-2 items-center justify-center gap-2 hover:opacity-70`}
              onClick={() => setAction("verify")}
            >
              <div>VERIFY </div>
              <IconZoomCode />
            </div>
          </div>
        </div>

        {/* Payload */}
        <div className="p-4">
          {action === "hash" ? (
            <JWTGenerator
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
          ) : (
            <JWTVerifier
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
          )}
        </div>
      </div>
    </div>
  );
}
