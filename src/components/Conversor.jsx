"use client";

import { IconDeviceFloppy } from "@tabler/icons-react";
import { text } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
export default function Conversor({
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const canvasRef = useRef();
  const [hover, setHover] = useState(false);
  const [preview, setPreview] = useState(null);
  const [webUrl, setWebpUrl] = useState(null);
  const [filename, setFilename] = useState("");
  const [format, setFormat] = useState("webp");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const reset = () => {
    setPreview(null);
    setWebpUrl(null);
    setFilename("");
    setFormat("webp");
    setHeight("");
    setWidth("");
    setAspectRatio(null);
    setOriginalImage(null);
  };

  const handleImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setFilename(nameWithoutExt);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setPreview(img.src);
        setOriginalImage(img);
        setAspectRatio(img.width / img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;

    const parsedWidth = parseInt(width);
    const parsedHeight = parseInt(height);

    if (isNaN(parsedWidth) || isNaN(parsedHeight)) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = parsedWidth;
    canvas.height = parsedHeight;

    ctx.clearRect(0, 0, parsedWidth, parsedHeight);
    ctx.drawImage(originalImage, 0, 0, parsedWidth, parsedHeight);

    const mimeType = `image/${format}`;
    canvas.toBlob((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      setWebpUrl(blobUrl);
    }, mimeType);
  }, [format, width, height, originalImage]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImage(file);
  };

  const descargar = () => {
    if (
      !width ||
      !height ||
      isNaN(parseInt(width)) ||
      isNaN(parseInt(height))
    ) {
      toast.error("Por favor ingresa una resolución válida.");
      return;
    }
    const canvas = canvasRef.current;
    const mimeType = `image/${format}`;
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error(`El formato "${format}" no es soportado por tu navegador.`);
        return;
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.${format}`;
      link.click();
    }, mimeType);
  };

  return (
    <div
      style={{ border: `2px solid ${theme}` }}
      className={`flex flex-col h-full border- rounded-xl overflow-hidden`}
    >
      <div
        style={{
          backgroundColor: theme,
        }}
        className={`relative  h-14 items-center justify-center grid grid-cols-6 grid-rows-1 w-full`}
      >
        <div className="col-start-1 col-end-6 text-xl  w-full font-bold uppercase flex justify-center items-center">
          CONVERT IMAGE
        </div>
        <div
          onClick={() => reset()}
          style={{ backgroundColor: hoverTheme, color: hoverTextTheme }}
          className="md:col-start-6 font-bold md:col-end-7 flex justify-center items-center gap-4 p-2 rounded md:m-4 hover:opacity-80"
        >
          CLEAR
        </div>
      </div>

      <div
        className={` ${
          webUrl
            ? "grid md:grid-cols-[5fr_1fr] grid-cols-1 grid-rows-[auto_auto] md:grid-rows-1 "
            : "grid grid-cols-1 grid-rows-[5fr] w-full h-full"
        } justify-center items-center h-full`}
      >
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="md:col-span-1 h-full w-full flex justify-center items-center "
        >
          <label
            htmlFor="imagen"
            className="h-full cursor-pointer w-full flex gap-4 items-center  justify-center"
          >
            {preview ? (
              <div className="w-full flex justify-center items-center p-4">
                <img
                  style={{ border: `2px solid ${theme}` }}
                  src={preview}
                  alt="Vista previa"
                  className="max-h-48 md:max-h-64 rounded"
                />
              </div>
            ) : (
              <div className="font-bold">SELECT OR DRAG IMAGE</div>
            )}
          </label>
          <input
            className="hidden"
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {webUrl && (
          <div
            style={{
              color: theme,
            }}
            className="md:p-4 flex  md:flex-col gap-2 h-full"
          >
            <div className="flex h-full gap-2  md:flex-col md:py-2 ">
              <div className="pl-4 md:p-0 w-full flex flex-col items-center justify-center md:items-start">
                <p className="text-xl font-bold hidden md:block">FORMAT:</p>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className=" w-[80px] md:w-[120px]">
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent
                    style={{ color: theme, backgroundColor: "black" }}
                  >
                    <SelectItem value="webp">WEBP</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="bmp">BMP</SelectItem>
                    <SelectItem value="avif">AVIF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col justify-center md:items-start">
                <p className="text-xl font-bold hidden md:block">RESOLUTION:</p>
                <div className=" flex w-full gap-2 text-black text-center">
                  <Input
                    name="width"
                    type="text"
                    style={{ color: theme }}
                    className="w-[60px] md:w-full text-center p-0 rounded"
                    value={width}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                      const val = e.target.value;
                      setWidth(val);
                      if (val && aspectRatio) {
                        setHeight(Math.round(parseInt(val) / aspectRatio));
                      }
                    }}
                  />
                  <div className="text-white h-full flex items-center">X</div>
                  <Input
                    name="height"
                    type="text"
                    style={{ color: theme }}
                    className="w-[60px] md:w-full text-center p-0 rounded"
                    value={height}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                      const val = e.target.value;
                      setHeight(val);
                      if (val && aspectRatio) {
                        setWidth(Math.round(parseInt(val) * aspectRatio));
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="h-full flex items-center justify-center">
              <button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  backgroundColor: theme,
                  color: textTheme,
                }}
                onClick={() => descargar()}
                className="flex text-center w-full active:scale-110 border-white border-2 justify-center items-center font-bold text-white p-2 rounded hover:opacity-70"
              >
                <div className="flex flex-col gap-2 items-center justify-center">
                  <span className="hidden md:block">DOWNLOAD</span>
                  <IconDeviceFloppy size={20} />
                </div>
              </button>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <Toaster />
    </div>
  );
}
