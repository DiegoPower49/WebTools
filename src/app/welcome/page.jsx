"use client";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
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
  IconColorPicker,
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
import Block from "@/components/block/block";
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
import useUserStore from "@/store/userStore";
import { useFireStore } from "@/store/fireStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import ImageColorPicker from "@/components/colorPicker";
import Notes from "@/components/block/notes";
import FireToolBar from "@/components/fireToolBar";

export default function Page() {
  const { logout, listenToAuth, setUser } = useUserStore();
  const {
    tabs,
    colors,
    links,
    api,
    notes,
    setNotes,
    setApi,
    toolbarArea,
    setColors,
    setLinks,
    loadUserData,
    loading,
  } = useFireStore();
  const [theme, setTheme] = useState(null);
  const [hoverTheme, setHoverTheme] = useState();
  const [textTheme, setTextTheme] = useState();
  const [hoverTextTheme, setHoverTextTheme] = useState();
  const isActive = (component) => {
    if (toolbarArea.find((tool) => tool.label === component)) {
      return true;
    } else {
      return false;
    }
  };
  const router = useRouter();
  const getOut = () => {
    logout();
    toast.success("Session closed");
    router.push("/");
  };

  const loadThemes = (colors) => {
    const findedColor = colors.find((item) => item.nombre === "theme");
    const newTheme = `#${findedColor.color}`;
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
        console.log("Usuario autenticado:", firebaseUser.uid);
        setUser(firebaseUser);
        loadUserData(auth.currentUser.uid);
      } else {
        console.log("No hay usuario autenticado");
        setUser(null);
        router.push("/");
      }
    });
    loadThemes(colors);
    listenToAuth();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadThemes(colors);
    }
  }, [colors]);

  return (
    <>
      <div
        style={{
          color: textTheme,
        }}
        className={`flex   flex-col min-h-dvh overflow-hidden  ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen  text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-14 h-14 border-4 border-t-transparent border-white rounded-full"
            />
            <p className="mt-4 text-gray-400 text-lg"></p>
          </div>
        ) : (
          <>
            <FireToolBar
              getOut={getOut}
              theme={theme}
              textTheme={textTheme}
              hoverTheme={hoverTheme}
              hoverTextTheme={hoverTextTheme}
            />
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
                  {isActive("conversor") && (
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
                  {isActive("recorder") && (
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
                      className={`h-[350px] hidden md:block`}
                    >
                      <Recorder
                        theme={theme}
                        textTheme={textTheme}
                        hoverTheme={hoverTheme}
                        hoverTextTheme={hoverTextTheme}
                      />
                    </motion.div>
                  )}
                  {isActive("notes") && (
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
                      <Notes
                        notes={notes}
                        setNotes={setNotes}
                        theme={theme}
                        textTheme={textTheme}
                        hoverTheme={hoverTheme}
                        hoverTextTheme={hoverTextTheme}
                      />
                    </motion.div>
                  )}
                  {isActive("calculator") && (
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
                  {isActive("links") && (
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
                  {isActive("colors") && (
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
                  {isActive("apiTester") && (
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
                  {isActive("jwt") && (
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
                  {isActive("editor") && (
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
                  {isActive("qr") && (
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
                  {isActive("picker") && (
                    <motion.div
                      key="colorpicker"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        layout: { type: "spring", stiffness: 300, damping: 25 },
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className={`h-[350px] hidden md:block`}
                    >
                      <ImageColorPicker
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
                    Website created by: Diego Torres
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

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
