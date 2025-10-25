import { useEffect, useState } from "react";
import styles from "./enlaces.module.css";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
export default function ApiTester({
  theme,
  textTheme,
  hoverTheme,
  hoverTextTheme,
}) {
  const [url, setUrl] = useState("http://localhost:");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("{}");
  const [body, setBody] = useState("{}");
  const [headersError, setHeadersError] = useState(null);
  const [bodyError, setBodyError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [wrap, setWrap] = useState(false);

  const toggleWrap = () => setWrap((prev) => !prev);

  // 🧠 Validadores de JSON dinámicos
  const handleHeadersChange = (e) => {
    const value = e.target.value;
    setHeaders(value);

    try {
      if (value.trim() !== "") JSON.parse(value);
      setHeadersError(null);
    } catch (err) {
      setHeadersError(err.message);
    }
  };

  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBody(value);

    try {
      if (value.trim() !== "") JSON.parse(value);
      setBodyError(null);
    } catch (err) {
      setBodyError(err.message);
    }
  };

  // 🧩 Botones de formateo JSON
  const formatHeaders = () => {
    try {
      let fixed = headers.trim();

      // Reemplazar comillas simples por dobles
      fixed = fixed.replace(/'/g, '"');

      // Agregar comillas a claves sin comillas
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":');

      // Quitar comas extra antes de cerrar
      fixed = fixed.replace(/,(\s*[}\]])/g, "$1");

      // Intentar parsear
      let parsed = JSON.parse(fixed);

      // Convertir valores no string a string (headers deben ser texto)
      for (const key in parsed) {
        if (typeof parsed[key] !== "string") {
          parsed[key] = String(parsed[key]);
        }
      }

      // Formatear JSON limpio
      setHeaders(JSON.stringify(parsed, null, 2));
      setHeadersError(null);
    } catch (err) {
      setHeadersError(err.message);
      toast.error("No se pudo corregir automáticamente");
    }
  };

  // 🧩 Reparar y formatear Body
  const formatBody = () => {
    try {
      let fixed = body.trim();

      // Reemplazar comillas simples por dobles
      fixed = fixed.replace(/'/g, '"');

      // Agregar comillas a claves sin comillas
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":');

      // Quitar comas extra antes de cerrar
      fixed = fixed.replace(/,(\s*[}\]])/g, "$1");

      // Intentar parsear
      let parsed = JSON.parse(fixed);

      // Formatear JSON limpio
      setBody(JSON.stringify(parsed, null, 2));
      setBodyError(null);
    } catch (err) {
      setBodyError(err.message);
      toast.error("No se pudo corregir automáticamente");
    }
  };

  // 🚀 Enviar solicitud
  const handleSend = async () => {
    if (!url)
      return toast.error("Please enter a URL", {
        style: {
          border: "1px solid #713200",
          backgroundColor: hoverTheme,
          padding: "16px",
          color: hoverTextTheme,
        },
      });
    setLoading(true);
    setResponse(null);

    try {
      const options = {
        method,
        headers: JSON.parse(headers || "{}"),
        credentials: "include", // 👈 permite enviar cookies
      };

      if (method !== "GET" && method !== "HEAD") {
        options.body = body ? JSON.stringify(JSON.parse(body)) : undefined;
      }

      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
      });
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Animación de puntos "Loading..."
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div
      style={{
        border: `2px solid ${theme}`,
        color: textTheme,
      }}
      className="bg-black h-full overflow-hidden flex flex-col items-center justify-start w-full rounded-xl shadow-xl"
    >
      <div
        style={{
          backgroundColor: theme,
          color: textTheme,
        }}
        className="h-14 items-center justify-center flex w-full"
      >
        <span className="text-xl font-bold uppercase">Api tester</span>
      </div>

      <div className="w-full flex-1 flex flex-col gap-4 py-4 px-4 md:px-16">
        <div className="h-full grid grid-cols-1 gap-2  justify-center">
          <div className="flex w-full gap-4">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className=" rounded h-10 bg-gray-800 border border-gray-700"
            >
              {["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter API URL..."
              className="w-full  h-10 p-2 rounded bg-gray-800 border border-gray-700 focus:border-blue-400 outline-none"
            />
          </div>
          {/* HEADER */}
          <div className="h-full w-full">
            <label htmlFor="header" className="text-sm text-gray-400">
              Headers (JSON)
            </label>

            {/* Contenedor relativo */}
            <div className="h-full w-full">
              <textarea
                id="header"
                rows={4}
                style={{ "--theme": theme }}
                value={headers}
                onChange={handleHeadersChange}
                className={`${
                  styles.scrollContainer
                } p-2 resize-none w-full rounded border font-mono text-sm ${
                  headersError
                    ? "border-red-500 bg-red-900/30"
                    : "border-gray-700 bg-gray-800"
                }`}
                placeholder='{"Authorization": "Bearer token"}'
              />

              {/* Botón Format */}
              <div className="w-full flex justify-between">
                {headersError && (
                  <p className="text-red-400 text-xs mt-1 font-mono">
                    ⚠️ {headersError}
                  </p>
                )}
                <button
                  onClick={formatHeaders}
                  className="text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
                >
                  Format
                </button>
              </div>
            </div>
          </div>
          {/* BODY */}

          <div className="h-full w-full">
            <label htmlFor="body" className="text-sm text-gray-400">
              Body (JSON)
            </label>
            <div className="h-full w-full">
              <textarea
                id="body"
                rows={4}
                value={body}
                style={{ "--theme": theme }}
                onChange={handleBodyChange}
                disabled={method === "GET" || method === "HEAD"}
                className={`${
                  styles.scrollContainer
                } resize-none  w-full p-2 rounded border font-mono text-sm 
              ${
                bodyError
                  ? "border-red-500 bg-red-900/30"
                  : "border-gray-700 bg-gray-800"
              } 
              disabled:opacity-20`}
                placeholder='{"name": "Diego", "age": 25}'
              />
              <div className="w-full flex justify-between">
                {bodyError && (
                  <p className="text-red-400 text-xs mt-1 font-mono">
                    ⚠️ {bodyError}
                  </p>
                )}
                <button
                  disabled={method === "GET" || method === "HEAD"}
                  onClick={formatBody}
                  className={`  disabled:opacity-20 text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600`}
                >
                  Format
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger
                onClick={handleSend}
                style={{
                  backgroundColor: theme,
                  color: textTheme,
                }}
                className="flex-1 hover:opacity-80 p-2 rounded font-semibold disabled:opacity-50"
              >
                Send Request
              </DialogTrigger>
              <DialogContent className="w-[100vw] rounded h-[85vh] bg-black border-white border-2 text-white overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="text-center" style={{ color: theme }}>
                    Response
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 h-full gap-2 flex flex-col justify-center w-full">
                  <div className="flex justify-between">
                    <button
                      onClick={toggleWrap}
                      style={{
                        backgroundColor: !wrap ? theme : hoverTheme,
                        color: !wrap ? textTheme : hoverTextTheme,
                        boxShadow: wrap && `0px 0px 5px 1px ${theme}`,
                      }}
                      className={`self-start font-bold  px-3 py-1 rounded hover:bg-slate-600`}
                    >
                      Wrap
                    </button>
                  </div>
                  <pre
                    style={{ border: `1px solid ${theme}`, "--theme": theme }}
                    className={`text-white overflow-scroll w-[85vw] md:w-[35vw] p-3 rounded text-sm h-[350px] ${
                      styles.scrollContainer
                    } ${
                      wrap
                        ? "whitespace-pre-wrap break-words overflow-y-auto"
                        : "overflow-auto whitespace-pre"
                    }`}
                  >
                    {response
                      ? JSON.stringify(response, null, 2)
                      : loading && (
                          <div>
                            Loading{" "}
                            <motion.span
                              key={dotCount}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {".".repeat(dotCount)}
                            </motion.span>
                          </div>
                        )}
                  </pre>
                </div>
                <DialogClose
                  style={{ backgroundColor: theme, color: textTheme }}
                  className="flex w-full items-center font-bold justify-center hover:opacity-80 duration-300 p-2 rounded"
                >
                  Close
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
