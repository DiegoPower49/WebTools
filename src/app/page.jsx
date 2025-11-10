"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
import Recorder from "@/components/recorder";
import Block from "@/components/block";
import Calculator from "@/components/calculator";
import Conversor from "@/components/Conversor";
import Links from "@/components/enlaces";
import Colors from "@/components/colors";
import ApiTester from "@/components/testApi";
import Hasher from "@/components/hasher";
import Image from "next/image";
import AuthenticateForm from "@/components/authenticateForm";
import ImageCropper from "@/components/ImageCropper";
import QRGenerator from "@/components/QRGenerator";
import { usePageStore } from "@/store/PageStore";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Page() {
  const {
    tabs,
    colors,
    links,
    api,
    title,
    text,
    setTitle,
    setText,
    setApi,
    setColors,
    setLinks,
    setTabs,
  } = usePageStore();
  const [theme, setTheme] = useState();
  const [authenticate, setAuthenticate] = useState(false);
  const [hoverTheme, setHoverTheme] = useState();
  const [textTheme, setTextTheme] = useState();
  const [hoverTextTheme, setHoverTextTheme] = useState();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const { setUser } = useUserStore();

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
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        router.replace("/welcome");
        setChecking(false);
      } else {
        setUser(null);
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [router, setUser]);
  useEffect(() => {
    loadThemes(colors);
    setLoading(false);
  }, [colors]);

  if (checking)
    return (
      <div className="flex flex-col items-center justify-center h-screen  text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-t-transparent border-white rounded-full"
        />
        <p className="mt-4 text-gray-400 text-lg"></p>
      </div>
    );

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
            {tabs.header && (
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
                className={`font-bold w-screen grid grid-cols-3 gap-4 text-xl md:text-4xl h-16 justify-center items-center text-center`}
              >
                <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex gap-2 items-center justify-center">
                  <IconRocket size={50} /> FAST TOOLS
                </div>

                <div
                  onClick={() => {
                    setAuthenticate(true);
                  }}
                  className="flex justify-end pr-12"
                >
                  <IconCloud size={40} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-screen bg-black py-2  flex justify-center items-center gap-2">
            <div className="grid grid-cols-5 sm:grid-cols-11 h-full justify-center items-center gap-2">
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
              <button
                aria-label="Show Image Editor"
                style={{
                  backgroundColor: !tabs.editor ? theme : hoverTheme,
                  color: !tabs.editor ? textTheme : hoverTextTheme,
                  boxShadow: tabs.editor && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setTabs("editor");
                }}
              >
                <IconCrop size={40} />
              </button>
              <button
                aria-label="Show QR Generator"
                style={{
                  backgroundColor: !tabs.qr ? theme : hoverTheme,
                  color: !tabs.qr ? textTheme : hoverTextTheme,
                  boxShadow: tabs.qr && `0px 0px 5px 1px ${theme}`,
                }}
                className={`h-14 w-14 p-2 rounded `}
                onClick={() => {
                  setTabs("qr");
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
                {tabs.conversor && (
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
                {tabs.recorder && (
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
                {tabs.notes && (
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
                      text={text}
                      setText={setText}
                      title={title}
                      setTitle={setTitle}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {tabs.calculator && (
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
                {tabs.links && (
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
                      links={links}
                      setLinks={setLinks}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {tabs.colors && (
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
                      colors={colors}
                      setColors={setColors}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {tabs.apiTester && (
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
                      api={api}
                      setApi={setApi}
                      theme={theme}
                      textTheme={textTheme}
                      hoverTheme={hoverTheme}
                      hoverTextTheme={hoverTextTheme}
                    />
                  </motion.div>
                )}
                {tabs.jwt && (
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
                {tabs.editor && (
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
                {tabs.qr && (
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
            {tabs.header && (
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
