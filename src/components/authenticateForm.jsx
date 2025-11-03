import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function AuthenticateForm() {
  const [modo, setModo] = useState("login");
  return (
    <>
      <div className="w-full items-center justify-center flex gap-2">
        <button onClick={() => setModo("login")}>Login</button>
        <button onClick={() => setModo("register")}>Register</button>
      </div>
      <div>
        {modo === "login" && (
          <div>
            <Login />
          </div>
        )}
        {modo === "register" && (
          <div>
            <Register />
          </div>
        )}
      </div>
    </>
  );
}
