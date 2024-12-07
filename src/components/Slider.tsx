"use client";

import React, { useEffect, useState } from "react";
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import { ComboData } from "../../types/ComboData";

export const Slider = () => {
  const [combos, setCombos] = useState<ComboData[]>([]);
  const [index, setIndex] = useState(0); // Control del índice actual

  const nextBanner = () => {
    setIndex((prevIndex) => (prevIndex + 1) % combos.length);
  };

  const prevBanner = () => {
    setIndex((prevIndex) => (prevIndex - 1 + combos.length) % combos.length);
  };

  const traerCombos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/combos");
      const datos = await response.json();
      setCombos(datos);
    } catch (error) {
      console.error("Error al traer combos:", error);
    }
  };

  useEffect(() => {
    traerCombos();
  }, []);

  return (
    <div className="bg-slate-950 relative w-full h-auto mb-10 shadow-lg shadow-gray-400">
      <div className="overflow-hidden w-full h-full flex items-center justify-center">
        {/* Contenedor de tarjetas */}
        <div className="flex gap-4 transition-transform duration-500" style={{ transform: `translateX(calc(-${index * 250}px))` }}>
          {combos.map((combo, i) => (
            <div
              key={combo.id_combo}
              className={`transition-all duration-300 ${
                index === i ? "scale-90 opacity-100 z-10" : "scale-75 opacity-75"
              }`}
              style={{
                flex: "0 0 250px", // Ancho fijo de las tarjetas
              }}
            >
              <div className="bg-white p-4 rounded-xl shadow-gray-400 shadow-lg">
                <b className="font-extrabold">{combo.nombre.toUpperCase()}</b>
                <p className="mb-4">
                  Descuento:{" "}
                  <span className="text-green-600 font-semibold">
                    {combo.descuento * 100}%
                  </span>
                </p>
                <div className="overflow-hidden">
                {combo.productos.map((comboProducto, idx) => (
                  <img
                    key={`${combo.id_combo}-${comboProducto.id_producto}-${idx}`}
                    alt={combo.nombre}
                    className="w-full rounded-md object-cover h-[140px]"
                    src={comboProducto.producto?.imagen}
                  />
                ))}
                </div>
                <div className="mt-4 text-center">
                {combo.productos.map((comboProducto, idx) => (
                  <div
                    key={`${combo.id_combo}-${comboProducto.id_producto}-${idx}`}
                    className="mb-2"
                  >
                    <h5 className="text-md font-bold">
                      {comboProducto.producto?.nombre}
                    </h5>
                    <p>
                      Precio: ${comboProducto.precioDescuento || comboProducto.producto?.precio}
                    </p>
                  </div>
                ))}
                  <div className="font-bold text-lg mt-2">
                    Total: $
                    {combo.productos.reduce(
                      (total, comboProducto) =>
                        total + (comboProducto.precioDescuento || 0),
                      0
                    )}
                  </div>
                  <div className="mt-4">
                    <ButtonAddToCarrito combo={combo} cantidad={1} />
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Botones de navegación */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={prevBanner}
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          onClick={nextBanner}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
