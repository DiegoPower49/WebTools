"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as jose from "jose";
import styles from "./enlaces.module.css";
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
  const [payload, setPayload] = useState("");
  const [secret, setSecret] = useState("");
  const [verifySecret, setVerifySecret] = useState("");

  const [algorithm, setAlgorithm] = useState("HS256");
  const [verifyAlgorithm, setVerifyAlgorithm] = useState("HS256");
  const [token, setToken] = useState("");
  const [verifyToken, setVerifyToken] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const [publicKey, setPublicKey] = useState("");
  const [verifyPublicKey, setVerifyPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [verifyPrivateKey, setVerifyPrivateKey] = useState("");

  // Expiración configurable en minutos
  const [expiryMinutes, setExpiryMinutes] = useState(60); // 60 minutos por defecto

  // Formatea el payload. Fix: validación robusta y feedback.
  const formatJSON = () => {
    try {
      // Intentamos parsear el JSON (acepta tanto single-line como spaced)
      const parsed = JSON.parse(payload);
      const formatted = JSON.stringify(parsed, null, 2);
      setPayload(formatted);
      toast.success("Payload formatted!");
    } catch (err) {
      // Mensaje claro si el JSON es inválido
      toast.error("Invalid JSON. Fix syntax before formatting.");
      //   console.error("formatJSON error:", err);
    }
  };

  // Generar pares RSA (RS256)
  const generateRSAKeys = async () => {
    try {
      const { publicKey: pub, privateKey: priv } = await jose.generateKeyPair(
        "RS256"
      );
      const spki = await jose.exportSPKI(pub); // public key (SPKI)
      const pkcs8 = await jose.exportPKCS8(priv); // private key (PKCS8)
      setPublicKey(spki);
      setPrivateKey(pkcs8);
      setVerifyPublicKey(spki);
      setVerifyPrivateKey(pkcs8);
      toast.success("RSA keys generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate RSA keys");
    }
  };

  // Generar JWT con iat y exp
  const handleGenerate = async () => {
    try {
      // Parse payload object (o lanzar error)
      const payloadObj = JSON.parse(payload);

      // Calculamos iat y exp en segundos desde epoch
      const nowSec = Math.floor(Date.now() / 1000);
      const expSec =
        nowSec + Math.max(0, Math.floor(Number(expiryMinutes)) * 60);

      let signedJwt = "";

      if (algorithm.startsWith("HS")) {
        if (!secret)
          return toast.error("Secret key required for HMAC algorithms");
        // Key para HMAC puede ser Uint8Array
        const key = new TextEncoder().encode(secret);

        signedJwt = await new jose.SignJWT({ ...payloadObj })
          .setProtectedHeader({ alg: algorithm, typ: "JWT" })
          .setIssuedAt(nowSec) // setIssuedAt accepts number (seconds)
          .setExpirationTime(expSec) // setExpirationTime accepts number (seconds)
          .sign(key);
      } else if (algorithm === "RS256") {
        if (!privateKey)
          return toast.error("Generate or paste a private key for RS256");
        const pk = await jose.importPKCS8(privateKey, "RS256");

        signedJwt = await new jose.SignJWT({ ...payloadObj })
          .setProtectedHeader({ alg: "RS256", typ: "JWT" })
          .setIssuedAt(nowSec)
          .setExpirationTime(expSec)
          .sign(pk);
      } else {
        return toast.error("Algorithm not supported");
      }

      setToken(signedJwt);
      toast.success("JWT generated!");
    } catch (err) {
      //   console.error("generate error:", err);
      toast.error("Failed to generate token — check payload JSON and keys");
    }
  };

  // Verificación: detectamos algoritmo por token header o usamos el algorithm seleccionado
  const handleVerify = async () => {
    try {
      if (!verifyToken) return toast.error("Paste a token to verify");
      // Leemos header para saber el alg real (más tolerante)
      const parts = verifyToken.split(".");
      if (parts.length !== 3) throw new Error("Invalid token format");
      const headerJson = JSON.parse(
        atob(parts[0].replace(/-/g, "+").replace(/_/g, "/"))
      );
      const algFromToken = headerJson.alg;

      let payloadVerified;

      if (algFromToken && algFromToken.startsWith("HS")) {
        if (!verifySecret)
          return toast.error("Secret required to verify HS tokens");
        const key = new TextEncoder().encode(verifySecret);
        const { payload: pl } = await jose.jwtVerify(verifyToken, key, {
          // opcional: puedes proporcionar aud/iss/nbf/etc aquí
        });
        payloadVerified = pl;
      } else if (algFromToken === "RS256") {
        if (!verifyPublicKey)
          return toast.error("Public key required to verify RS tokens");
        const pub = await jose.importSPKI(verifyPublicKey, "RS256");
        const { payload: pl } = await jose.jwtVerify(verifyToken, pub);
        payloadVerified = pl;
      } else {
        throw new Error("Unsupported algorithm in token");
      }

      setVerificationResult(payloadVerified);
      toast.success("Token valid!");
    } catch (err) {
      console.error("verify error:", err);
      setVerificationResult(null);
      toast.error("Invalid token or verification failed");
    }
  };

  const handleCopy = async () => {
    if (!token) return;
    await navigator.clipboard.writeText(token);
    toast.success("Token copied!");
  };

  return (
    <div className="h-full w-full">
      <div
        style={{ border: `2px solid ${theme}`, color: textTheme }}
        className="w-full h-full bg-black rounded-lg border overflow-hidden"
      >
        <div
          style={{
            backgroundColor: theme,
            color: textTheme,
          }}
          className="h-14 items-center justify-center flex w-full"
        >
          <span className="text-xl font-bold uppercase">JWT</span>
        </div>

        {/* Payload */}
        <div className="grid grid-cols-2 gap-4 p-4 ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-between">
              <label className="text-sm">Payload (JSON)</label>
              <button
                onClick={formatJSON}
                style={{ backgroundColor: theme, color: textTheme }}
                className="px-2 text-xs rounded hover:opacity-80"
              >
                Format
              </button>
            </div>
            <div className="">
              <textarea
                style={{
                  "--theme": theme,
                }}
                rows={3}
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                className={`p-2 rounded bg-gray-800 border border-gray-600 font-mono text-sm w-full resize-none ${styles.scrollContainer}`}
                placeholder='{"name": "Diego", "age": 32}'
              />
              <div className="flex gap-2 justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                  <label className="text-sm">Algorithm:</label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
                  >
                    <option value="HS256">HS256 (SHA-256)</option>
                    <option value="HS384">HS384 (SHA-384)</option>
                    <option value="HS512">HS512 (SHA-512)</option>
                    <option value="RS256">RS256 (RSA)</option>
                  </select>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <label className="text-sm">Expiry (minutes)</label>
                  <input
                    type="number"
                    min={0}
                    value={expiryMinutes}
                    onChange={(e) => setExpiryMinutes(e.target.value)}
                    className="p-1 w-24 rounded bg-gray-800 border border-gray-600 text-sm"
                  />
                  <span className="text-xs text-gray-400">
                    ({expiryMinutes} min)
                  </span>
                </div>
              </div>
            </div>

            {/* Expiración configurable */}

            {/* Secret or RSA keys */}
            {algorithm.startsWith("HS") ? (
              <div>
                <label className="text-sm">Secret key (HMAC)</label>
                <input
                  type="text"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
                  placeholder="Secret for HS algorithms"
                />
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <button
                    onClick={generateRSAKeys}
                    style={{ backgroundColor: theme, color: textTheme }}
                    className="p-2 rounded font-semibold hover:opacity-80"
                  >
                    Generate RSA Keys
                  </button>
                  <button
                    onClick={() => {
                      // limpiar claves
                      setPublicKey("");
                      setPrivateKey("");
                      toast.success("Keys cleared");
                    }}
                    className="p-2 rounded border"
                  >
                    Clear keys
                  </button>
                </div>

                <label className="text-sm">Public Key (SPKI)</label>
                <textarea
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  className="p-2 rounded bg-gray-800 border border-gray-600 w-full font-mono text-xs resize-none h-24"
                />

                <label className="text-sm">Private Key (PKCS8)</label>
                <textarea
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="p-2 rounded bg-gray-800 border border-gray-600 w-full font-mono text-xs resize-none h-24"
                />
              </>
            )}

            {/* Algorithm */}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              style={{ backgroundColor: theme, color: textTheme }}
              className="rounded p-2 font-bold hover:opacity-90"
            >
              Generate Token
            </button>

            {/* Token output */}

            <div className="">
              <span className="text-sm">Generated JWT</span>

              <div className="flex gap-2 w-full ">
                <pre
                  style={{
                    "--theme": theme,
                    border: `1px solid ${theme}`,
                    color: theme,
                  }}
                  className={`bg-black/50 p-2 w-full h-12 rounded overflow-auto text-xs break-all max-h-40 ${styles.scrollContainer}`}
                >
                  {token && <span>{token}</span>}
                </pre>

                <button
                  onClick={handleCopy}
                  style={{ backgroundColor: theme, color: textTheme }}
                  className="p-4 text-xs rounded hover:opacity-80"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
          <div>
            {/* Verification */}
            <div className="mt-4">
              <label className="text-sm">Verify JWT</label>
              <input
                type="text"
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600 font-mono text-sm w-full"
                placeholder="Paste a JWT token here..."
              />
              {verifyAlgorithm.startsWith("HS") ? (
                <>
                  <label className="text-sm">Secret key (HMAC)</label>
                  <input
                    type="text"
                    value={verifySecret}
                    onChange={(e) => setVerifySecret(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
                    placeholder="Secret for HS algorithms"
                  />
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <button
                      onClick={generateRSAKeys}
                      style={{ backgroundColor: theme, color: textTheme }}
                      className="p-2 rounded font-semibold hover:opacity-80"
                    >
                      Generate RSA Keys
                    </button>
                    <button
                      onClick={() => {
                        // limpiar claves
                        setVerifyPublicKey("");
                        setVerifyPrivateKey("");
                        toast.success("Keys cleared");
                      }}
                      className="p-2 rounded border"
                    >
                      Clear keys
                    </button>
                  </div>

                  <label className="text-sm">Public Key (SPKI)</label>
                  <textarea
                    value={publicKey}
                    onChange={(e) => setVerifyPublicKey(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 w-full font-mono text-xs resize-none h-24"
                  />

                  <label className="text-sm">Private Key (PKCS8)</label>
                  <textarea
                    value={verifyPrivateKey}
                    onChange={(e) => setVerifyPrivateKey(e.target.value)}
                    className="p-2 rounded bg-gray-800 border border-gray-600 w-full font-mono text-xs resize-none h-24"
                  />
                </>
              )}

              {/* Algorithm */}
              <label className="text-sm">Algorithm</label>
              <select
                value={verifyAlgorithm}
                onChange={(e) => setVerifyAlgorithm(e.target.value)}
                className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
              >
                <option value="HS256">HS256 (SHA-256)</option>
                <option value="HS384">HS384 (SHA-384)</option>
                <option value="HS512">HS512 (SHA-512)</option>
                <option value="RS256">RS256 (RSA)</option>
              </select>
              <button
                onClick={handleVerify}
                style={{ backgroundColor: theme, color: textTheme }}
                className="rounded p-2 font-bold mt-2 hover:opacity-90"
              >
                Verify
              </button>
            </div>

            {/* Result */}

            <div className="mt-2">
              <label className="text-sm">Decoded Payload</label>
              <pre
                style={{
                  "--theme": theme,
                  border: `1px solid ${theme}`,
                  color: theme,
                }}
                className={`bg-black/50 p-2 rounded overflow-auto text-xs break-all h-24     ${styles.scrollContainer}`}
              >
                {verificationResult &&
                  JSON.stringify(verificationResult, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
