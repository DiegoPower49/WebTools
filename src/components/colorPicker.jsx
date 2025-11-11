"use client";
import { IconClipboard, IconDeviceFloppy } from "@tabler/icons-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
export default function ImageColorPicker({
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const canvasRef = useRef(null);
  const zoomCanvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState("webp");
  const [color, setColor] = useState(null);
  const [zoom, setZoom] = useState(3);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const reset = () => {
    setImage(null);
    setColor(null);
    setZoom(3);
    setShowZoom(false);
    setZoomPos({ x: 0, y: 0 });
  };

  const copyToClipboard = () => {
    toast((t) => (
      <span className="flex items-center justify-center gap-4">
        Copied <b>{color}</b>
        <div className="h-4 w-4" style={{ backgroundColor: color }}></div>
      </span>
    ));
    navigator.clipboard.writeText(color);
  };
  const downloadImage = () => {};

  // --- Cargar imagen desde el portapapeles ---
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData.items;
      for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const img = new Image();
          img.src = URL.createObjectURL(blob);
          img.onload = () => setImage(img);
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // --- Dibujar imagen en el canvas principal ---
  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    }
  }, [image]);

  // --- Actualizar lupa en movimiento ---
  const handleMouseMove = (e) => {
    if (!canvasRef.current || !zoomCanvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const zoomCanvas = zoomCanvasRef.current;
    const zoomCtx = zoomCanvas.getContext("2d");

    const zoomSize = 100;
    zoomCanvas.width = zoomSize;
    zoomCanvas.height = zoomSize;

    // Coordenadas del cursor dentro del canvas visible
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Escalado a coordenadas internas del canvas (imagen real)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = mouseX * scaleX;
    const y = mouseY * scaleY;

    setZoomPos({ x: mouseX, y: mouseY });

    const sampleSize = zoomSize / zoom;

    zoomCtx.imageSmoothingEnabled = false;
    zoomCtx.clearRect(0, 0, zoomSize, zoomSize);

    zoomCtx.drawImage(
      canvas,
      x - sampleSize / 2,
      y - sampleSize / 2,
      sampleSize,
      sampleSize,
      0,
      0,
      zoomSize,
      zoomSize
    );

    // --- Dibujar mira "+" ---
    zoomCtx.strokeStyle = "red";
    zoomCtx.lineWidth = 1.5;
    zoomCtx.beginPath();
    zoomCtx.moveTo(zoomSize / 2, zoomSize / 2 - 6);
    zoomCtx.lineTo(zoomSize / 2, zoomSize / 2 + 6);
    zoomCtx.moveTo(zoomSize / 2 - 6, zoomSize / 2);
    zoomCtx.lineTo(zoomSize / 2 + 6, zoomSize / 2);
    zoomCtx.stroke();
  };

  // --- Capturar color ---
  const handleMouseClick = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = mouseX * scaleX;
    const y = mouseY * scaleY;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2])
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
    setColor(hex);
  };

  // --- Controlar zoom con la rueda del mouse ---
  const handleWheel = (e) => {
    setZoom((prevZoom) => {
      let newZoom = prevZoom + (e.deltaY < 0 ? 0.5 : -0.5);
      return Math.min(Math.max(newZoom, 1), 20); // límites entre 1x y 20x
    });
    handleMouseMove(e);
  };

  const handleDownload = (format) => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `image.${format}`;
    link.href = canvasRef.current.toDataURL(`image/${format}`);
    link.click();
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
          COLOR PICKER
        </div>
        <div
          onClick={() => reset()}
          style={{ backgroundColor: hoverTheme, color: hoverTextTheme }}
          className="col-start-6 font-bold col-end-7 flex justify-center items-center gap-4 p-2 rounded md:m-4 hover:opacity-80"
        >
          CLEAR
        </div>
      </div>
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ color: theme }}
      >
        {image ? (
          <div className="grid grid-rows-1 grid-cols-[3fr_1fr] h-full w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onMouseMove={(e) => {
                    setShowZoom(true);
                    handleMouseMove(e);
                  }}
                  onMouseLeave={() => setShowZoom(false)}
                  onClick={handleMouseClick}
                  onWheel={handleWheel}
                  className="max-w-[400px] max-h-[250px]"
                  style={{
                    cursor: "crosshair",
                    border: `1px solid ${theme}`,
                  }}
                />

                {showZoom && (
                  <canvas
                    ref={zoomCanvasRef}
                    style={{
                      position: "absolute",
                      top: zoomPos.y + 20,
                      left: zoomPos.x + 20,
                      border: "2px solid black",
                      width: 100,
                      height: 100,
                      pointerEvents: "none",
                      zIndex: 10,
                    }}
                  />
                )}

                {/* Mostrar nivel de zoom */}
                <div
                  className="font-bold"
                  style={{
                    position: "absolute",
                    right: 10,
                    background: "rgba(0,0,0,0.6)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  x{zoom.toFixed(1)}
                </div>
              </div>
            </div>
            <div className=" flex sm:flex-col h-full items-center justify-center">
              <div
                style={{
                  borderLeft: `2px solid ${theme}`,
                  borderBottom: `2px solid ${theme}`,
                }}
                className=" h-full w-full flex flex-col items-center justify-center gap-4"
              >
                <h1>
                  <b>COLOR</b>
                </h1>
                <div className="flex items-center justify-center w-full gap-4">
                  <div
                    className="w-8 h-8 border"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p className="font-mono">{color ? color : " ------- "}</p>
                </div>

                <div>
                  <Button
                    style={{
                      backgroundColor: theme,
                      color: textTheme,
                    }}
                    className="hover:opacity-80"
                    onClick={copyToClipboard}
                  >
                    COPY <IconClipboard />
                  </Button>
                </div>
              </div>
              <div
                style={{ borderLeft: `2px solid ${theme}` }}
                className="h-full w-full flex flex-col items-center justify-center gap-2"
              >
                <h1>
                  <b>IMAGE</b>
                </h1>
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
                <Button
                  style={{
                    backgroundColor: theme,
                    color: textTheme,
                  }}
                  className="hover:opacity-80"
                  onClick={() => handleDownload(format)}
                >
                  DOWNLOAD <IconDeviceFloppy />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Paste an image here</p>
        )}
      </div>
    </div>
  );
}
