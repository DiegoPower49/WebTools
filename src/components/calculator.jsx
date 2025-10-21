"use client";
import React, { useState } from "react";

const Calculator = ({ theme, textTheme, hoverTheme, hoverTextTheme }) => {
  const [input, setInput] = useState(""); // Estado para el input del usuario
  const [result, setResult] = useState("");
  const [hover, setHover] = useState(false);

  // Manejar la entrada del usuario
  const handleInput = (value) => {
    const newInput = input + value;
    setInput(newInput);

    // Calcular automáticamente
    try {
      const evalResult = eval(newInput); // Evalúa la expresión
      setResult(evalResult.toString());
    } catch {
      setResult(""); // Si hay un error (expresión inválida), limpiar resultado
    }
  };

  // Realizar la operación
  const calculateResult = () => {
    try {
      // Evaluar la expresión ingresada
      const result = eval(input); // Nota: Usa eval con precaución
      setResult(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  // Limpiar la entrada
  const clearInput = () => {
    setInput("");
    setResult("");
  };

  return (
    <div
      style={{ border: `2px solid ${theme}` }}
      className={`h-full border- rounded-xl overflow-hidden`}
    >
      <div className="h-full  p-5 md:px-10 grid grid-cols-2">
        <div className="h-full  grid grid-row-[1fr,2fr] ">
          <div className="flex w-full p-2  text-xl text-white items-center justify-center ">
            EQUAL TO =
          </div>
          {result && `= ${result}` ? (
            <div
              className={`grid h-full p-2  text-white items-start justify-center  ${
                result.length > 10 ? "text-sm" : "text-3xl"
              }`}
            >
              {result}
            </div>
          ) : (
            <div className="w-full p-2 text-right text-black h-5"></div>
          )}
        </div>

        <div className="  grid grid-cols-1  align-middle">
          <div className="p-2 flex items-center">
            <input
              type="text"
              value={input}
              readOnly
              className="w-full p-2 text-right text-xl text-black bg-white border border-gray-300 rounded-md"
            />
          </div>
          <div className="p-2 grid grid-cols-4 gap-2">
            {[
              "7",
              "8",
              "9",
              "/",
              "4",
              "5",
              "6",
              "*",
              "1",
              "2",
              "3",
              "-",
              "0",
              ".",
              "+",
            ].map((symbol) => (
              <button
                key={symbol}
                onClick={() => handleInput(symbol)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {symbol}
              </button>
            ))}
          </div>
          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              backgroundColor: hover ? hoverTheme : theme,
              color: hover ? hoverTextTheme : textTheme,
            }}
            onClick={clearInput}
            className="m-2 p-2 text-white rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
