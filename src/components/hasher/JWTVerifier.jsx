"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import * as jose from "jose";
import styles from "../enlaces.module.css";
import { DialogClose } from "@radix-ui/react-dialog";

export default function JWTVerifier({ theme, textTheme }) {
  const [verifySecret, setVerifySecret] = useState("");
  const [verifyAlgorithm, setVerifyAlgorithm] = useState("HS256");
  const [verifyToken, setVerifyToken] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifyPublicKey, setVerifyPublicKey] = useState("");

  const handleVerify = async () => {
    try {
      if (!verifyToken) return toast.error("Paste a token to verify");

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
        const { payload: pl } = await jose.jwtVerify(verifyToken, key);
        payloadVerified = pl;
      } else if (algFromToken === "RS256") {
        if (!verifyPublicKey)
          return toast.error("Public key required to verify RS tokens");

        // Importar clave pública con encabezados PEM
        const pubKey = await jose.importSPKI(verifyPublicKey.trim(), "RS256");
        const { payload: pl } = await jose.jwtVerify(verifyToken, pubKey);
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

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <div className="w-3/4">
            <label className="text-sm">Verify JWT</label>
            <input
              type="text"
              value={verifyToken}
              onChange={(e) => setVerifyToken(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600 font-mono text-sm w-full"
              placeholder="Paste a JWT token here..."
            />
          </div>
          <div className="w-1/4">
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
          </div>
        </div>

        {verifyAlgorithm != "RS256" ? (
          <>
            <label className="text-sm">Secret key</label>
            <input
              type="text"
              value={verifySecret}
              onChange={(e) => setVerifySecret(e.target.value)}
              className="p-2 rounded bg-gray-800 border border-gray-600 w-full"
              placeholder="Secret key"
            />
          </>
        ) : (
          <>
            <div className="w-full h-full flex items-center justify-center">
              <Dialog>
                <DialogTrigger
                  style={{
                    backgroundColor: theme,
                    color: textTheme,
                    boxShadow: `0px 0px 5px 1px ${textTheme}`,
                  }}
                  className="p-2 rounded w-3/4 md:w-1/4 font-semibold hover:opacity-80"
                >
                  Public Key
                </DialogTrigger>
                <DialogContent className="flex flex-col  justify-center gap-2 w-full md:w-80 h-[80vh] bg-black border-white border-2 text-white overflow-hidden">
                  <DialogHeader></DialogHeader>
                  <DialogTitle className="text-center py-2">
                    Public Key
                  </DialogTitle>
                  <div className="flex flex-col gap-4">
                    <textarea
                      placeholder={`-----BEGIN PUBLIC KEY-----\n\n\n\n........\n\n\n\n\n\n\n-----END PUBLIC KEY-----`}
                      value={verifyPublicKey}
                      onChange={(e) => setVerifyPublicKey(e.target.value)}
                      className=" p-2 rounded bg-gray-800 border border-gray-600 font-mono text-xs w-full h-80 resize-none"
                    />
                    <DialogClose
                      style={{ backgroundColor: theme, color: textTheme }}
                      className="flex w-full items-center justify-center hover:opacity-80 duration-300 p-2 rounded"
                    >
                      Close
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </div>

      <button
        onClick={handleVerify}
        style={{ backgroundColor: theme, color: textTheme }}
        className="rounded p-2 font-bold w-full mt-2 hover:opacity-90"
      >
        Verify
      </button>

      <div className="mt-2">
        <label className="text-sm">Decoded Payload</label>
        <pre
          style={{
            "--theme": theme,
            border: `1px solid ${theme}`,
            color: theme,
          }}
          className={`bg-black/50 p-2 rounded overflow-auto text-xs break-all h-40 ${styles.scrollContainer}`}
        >
          {verificationResult && JSON.stringify(verificationResult, null, 2)}
        </pre>
      </div>
    </div>
  );
}
