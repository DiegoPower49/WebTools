"use client";
import toast, { Toaster } from "react-hot-toast";
import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconApi,
  IconBrush,
  IconCalculator,
  IconCloud,
  IconCrop,
  IconDoor,
  IconHash,
  IconLayoutNavbar,
  IconLink,
  IconNote,
  IconPhotoEdit,
  IconQrcode,
  IconRocket,
  IconVideoPlus,
} from "@tabler/icons-react";
import Recorder from "../recorder";
import Block from "../block";
import Calculator from "../calculator";
import Conversor from "@/components/Conversor";
import Links from "@/components/enlaces";
import Colors from "@/components/colors";
import ApiTester from "@/components/testApi";
import Hasher from "@/components/hasher";
import Image from "next/image";
import AuthenticateForm from "@/components/authenticateForm";
import ImageCropper from "@/components/ImageCropper";
import QRGenerator from "@/components/QRGenerator";
import useUserStore from "@/store/userStore";
import { usePageStore } from "@/store/PageStore";

export default function LocalTable() {
  const { logout, user } = useUserStore();
  const {
    localTabs,
    localText,
    localApi,
    localColors,
    localTitle,
    localLinks,
    setLocalTitle,
    setLocalText,
    setLocalApi,
    setLocalTabs,
    setLocalLinks,
    setLocalColors,
  } = usePageStore();

  const [theme, setTheme] = useState();
  const [authenticate, setAuthenticate] = useState(false);
  const [hoverTheme, setHoverTheme] = useState();
  const [textTheme, setTextTheme] = useState();
  const [hoverTextTheme, setHoverTextTheme] = useState();
  const [loading, setLoading] = useState(true);
  const getOut = () => {
    logout();
    toast.success("Session closed");
  };

  const loadThemes = (colors) => {
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
  };

  useEffect(() => {
    loadThemes(localColors);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadThemes(localColors);
  }, [localColors]);

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
          <AnimatePresence mode="popLayout">
            {localTabs.header && (
              <motion.div
                key="header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 25 },
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundColor: theme,
                  color: textTheme,
                }}
                className={`font-bold w-screen grid grid-cols-3 gap-4 text-4xl h-16 justify-center items-center text-center`}
              >
                <div></div>
                <div
                  onClick={() => console.log(store)}
                  className="flex gap-2 items-center justify-center"
                >
                  FAST TOOLS <IconRocket size={50} />
                </div>
                {user ? (
                  <div
                    onClick={() => {
                      getOut();
                    }}
                    className="flex justify-end pr-12"
                  >
                    <IconDoor size={40} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setAuthenticate(true);
                    }}
                    className="flex justify-end pr-12"
                  >
                    <IconCloud size={40} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-screen bg-black py-2  flex justify-center items-center gap-2">
            <div className="grid grid-cols-5 sm:grid-cols-11 h-full justify-center items-center gap-2">
              <button
                aria-label="Show Header"
                style={{
                  backgroundColor: !localTabs.header ? theme : hoverTheme,
                  color: !localTabs.header ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.header && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded 
                 
                  `}
                onClick={() => {
                  setLocalTabs("header");
                }}
              >
                <IconLayoutNavbar size={40} />
              </button>

              <button
                aria-label="Show Calculator"
                style={{
                  backgroundColor: !localTabs.calculator ? theme : hoverTheme,
                  color: !localTabs.calculator ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.calculator && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setLocalTabs("calculator");
                }}
              >
                <IconCalculator size={40} />
              </button>

              <button
                aria-label="Show Recorder"
                style={{
                  backgroundColor: !localTabs.recorder ? theme : hoverTheme,
                  color: !localTabs.recorder ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.recorder && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded hidden md:block`}
                onClick={() => {
                  setLocalTabs("recorder");
                }}
              >
                <IconVideoPlus size={40} />
              </button>

              <button
                aria-label="Show Notes"
                style={{
                  backgroundColor: !localTabs.notes ? theme : hoverTheme,
                  color: !localTabs.notes ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.notes && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setLocalTabs("notes");
                }}
              >
                <IconNote size={40} />
              </button>

              <button
                aria-label="Show Conversor"
                style={{
                  backgroundColor: !localTabs.conversor ? theme : hoverTheme,
                  color: !localTabs.conversor ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.conversor && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setLocalTabs("conversor");
                }}
              >
                <IconPhotoEdit size={40} />
              </button>

              <button
                aria-label="Show Links"
                style={{
                  backgroundColor: !localTabs.links ? theme : hoverTheme,
                  color: !localTabs.links ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.links && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setLocalTabs("links");
                }}
              >
                <IconLink size={40} />
              </button>

              <button
                aria-label="Show Colors"
                style={{
                  backgroundColor: !localTabs.colors ? theme : hoverTheme,
                  color: !localTabs.colors ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.colors && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded`}
                onClick={() => {
                  setLocalTabs("colors");
                }}
              >
                <IconBrush size={40} />
              </button>

              <button
                aria-label="Show Api Tester"
                style={{
                  backgroundColor: !localTabs.apiTester ? theme : hoverTheme,
                  color: !localTabs.apiTester ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.apiTester && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded`}
                onClick={() => {
                  setLocalTabs("apiTester");
                }}
              >
                <IconApi size={40} />
              </button>

              <button
                aria-label="Show Hasher"
                style={{
                  backgroundColor: !localTabs.jwt ? theme : hoverTheme,
                  color: !localTabs.jwt ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.jwt && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded`}
                onClick={() => {
                  setLocalTabs("jwt");
                }}
              >
                <IconHash size={40} />
              </button>
              <button
                aria-label="Show Image Editor"
                style={{
                  backgroundColor: !localTabs.editor ? theme : hoverTheme,
                  color: !localTabs.editor ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.editor && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setLocalTabs("editor");
                }}
              >
                <IconCrop size={40} />
              </button>
              <button
                aria-label="Show QR Generator"
                style={{
                  backgroundColor: !localTabs.qr ? theme : hoverTheme,
                  color: !localTabs.qr ? textTheme : hoverTextTheme,
                  boxShadow: localTabs.qr && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setLocalTabs("qr");
                }}
              >
                <IconQrcode size={40} />
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

            <motion.div
              layout
              className="2xl:w-9/12 w-full py-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-y-4 md:gap-5 p-4 "
            >
              <AnimatePresence mode="popLayout">
                {localTabs.conversor && (
                  <motion.div
                    key="conversor"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <Conversor
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.recorder && (
                  <motion.div
                    key="recorder"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <Recorder
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.notes && (
                  <motion.div
                    key="notes"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <Block
                      text={localText}
                      title={localTitle}
                      setTitle={setLocalTitle}
                      setText={setLocalText}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.calculator && (
                  <motion.div
                    key="calculator"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <Calculator
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.links && (
                  <motion.div
                    key="links"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <Links
                      links={localLinks}
                      setLinks={setLocalLinks}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.colors && (
                  <motion.div
                    key="colors"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <Colors
                      colors={localColors}
                      setColors={setLocalColors}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.apiTester && (
                  <motion.div
                    key="apitester"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[500px]`}
                  >
                    <ApiTester
                      api={localApi}
                      setApi={setLocalApi}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.jwt && (
                  <motion.div
                    key="jwt"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[500px] `}
                  >
                    <Hasher
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {localTabs.editor && (
                  <motion.div
                    key="editor"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <ImageCropper
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                ;
                {localTabs.qr && (
                  <motion.div
                    key="qr"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 25 },
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`h-[350px]`}
                  >
                    <QRGenerator
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          <AnimatePresence mode="popLayout">
            {localTabs.header && (
              <motion.div
                key="footer"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                style={{ color: theme, background: "black" }}
                className="flex font-bold justify-end items-center pr-20"
              >
                <a href="https://diegotorres-portfoliodev.vercel.app">
                  Web created by: Diego Torres
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <Dialog onOpenChange={setAuthenticate} open={authenticate}>
        <DialogContent
          style={{ color: theme, border: `1px solid ${theme}` }}
          className="bg-black flex flex-col w-full justify-center items-center"
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              Puedes guardar tus datos
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AuthenticateForm
            theme={theme}
            textTheme={textTheme}
            hoverTheme={hoverTheme}
            hoverTextTheme={hoverTextTheme}
          />
        </DialogContent>
      </Dialog>
      <Toaster
        toastOptions={{
          // Estilo general
          style: {
            background: "#1e293b", // gris oscuro
            color: "#f8fafc", // blanco
            border: `1px solid ${theme}`,
          },
          // Éxitos
          success: {
            style: {
              background: "black",
              color: "white",
            },
            iconTheme: {
              primary: theme,
              secondary: "#fff",
            },
          },
          // Errores
          error: {
            style: {
              background: "black",
              color: "red",
            },
            iconTheme: {
              primary: "#b91c1c",
              secondary: "white",
            },
          },
        }}
      />
    </>
  );
}
