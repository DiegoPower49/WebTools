import { useState, useRef, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpscale, UploadCloud } from "lucide-react";

export default function ImageCropper({
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 50, height: 50 });
  const [format, setFormat] = useState("png");
  const imgRef = useRef(null);

  const reset = () => {
    setImage(null);
    setCrop({ unit: "%", width: 50, height: 50 });
    setFormat("png");
    imgRef.current = null;
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // 🟢 Exportar recorte en resolución específica
  const downloadCroppedImage = () => {
    if (!imgRef.current || !crop.width || !crop.height) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    // ✅ Si el usuario NO define tamaño, tomamos tamaño real del recorte
    const outputWidth = crop.width * scaleX;
    const outputHeight = crop.height * scaleY;

    const canvas = document.createElement("canvas");
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      outputWidth,
      outputHeight
    );

    canvas.toBlob(
      (blob) => {
        const link = document.createElement("a");
        link.download = `crop.${format}`;
        link.href = URL.createObjectURL(blob);
        link.click();
      },
      `image/${format}`,
      1
    );
  };

  return (
    <div
      style={{ border: `2px solid ${theme}` }}
      className={`h-full w-full  rounded-xl overflow-hidden`}
    >
      <div
        style={{
          backgroundColor: theme,
          color: textTheme,
        }}
        className={`relative  h-14 items-center justify-center md:grid grid-cols-6 md:grid-rows-1 flex w-full`}
      >
        <div className="md:col-start-1 md:col-end-5 text-xl  w-full font-bold uppercase flex justify-center items-center">
          IMAGE CROPPER
        </div>
        <div
          onClick={() => reset()}
          style={{ backgroundColor: hoverTheme, color: hoverTextTheme }}
          className="md:col-start-6 font-bold md:col-end-7 flex justify-center items-center gap-4 p-2 rounded m-4 hover:opacity-80"
        >
          CLEAR
        </div>
      </div>
      <input {...getInputProps()} id="ImageToCrop" className="hidden" />

      {!image ? (
        <div
          {...getRootProps()}
          className="h-full cursor-pointer w-full grid gap-4 items-center grid-rows-[5fr_1fr] justify-center"
        >
          <div className="h-full w-full flex items-center justify-center font-bold ">
            {isDragActive ? (
              <div className="w-28">
                <ImageUpscale
                  size={48}
                  style={{ color: theme }}
                  className={`${isDragActive && "animate-bounce"}`}
                />
              </div>
            ) : (
              "SELECT OR DRAG IMAGE"
            )}
          </div>
        </div>
      ) : (
        <div className="h-full grid md:grid-cols-4 grid-cols-1 grid-rows-[2fr_1fr_1fr] md:grid-rows-[5fr_1fr] items-center justify-center md:gap-4 w-full">
          <div className="md:col-span-3 w-full md:h-full flex justify-center items-start md:items-center p-4">
            <ReactCrop
              className="max-h-40 md:max-h-64 object-contain border rounded"
              crop={crop}
              onChange={setCrop}
              keepSelection={true}
            >
              <img
                style={{ border: `2px solid ${theme}` }}
                ref={imgRef}
                src={image}
                alt="to crop"
              />
            </ReactCrop>
          </div>

          <div className="md:col-span-1 flex flex-col gap-4 items-center">
            <div style={{ color: theme }} className="font-bold text-xl">
              FORMAT:
            </div>
            <div className="flex md:flex-col gap-4">
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger style={{ color: theme }} className="w-[120px]">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent
                  style={{ color: theme, backgroundColor: "black" }}
                >
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPG</SelectItem>
                  <SelectItem value="webp">WEBP</SelectItem>
                </SelectContent>
              </Select>

              <Button
                style={{ backgroundColor: theme, color: textTheme }}
                onClick={downloadCroppedImage}
                className="hover:opacity-80"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
