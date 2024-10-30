"use client";
import React, { useEffect, useState } from "react";
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import CargandoSpinner from "@/components/CargandoSpinner";
import { ProductoData } from "../../types/ProductData";
import { ComboData } from "../../types/ComboData";

const VistaProductos = () => {
  const [productos, setProductos] = useState<ProductoData[]>([]);
  const [combos, setCombos] = useState<ComboData[]>([]); 
  const [loading, setLoading] = useState(true);

  const traerProductos = async () => {
    try {
      const respuesta = await fetch("/api/producto");
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  };

  const traerCombos = async () => {
    try {
      const respuesta = await fetch("/combos");
      const datos = await respuesta.json();
      setCombos(datos);
    } catch (error) {
      console.error("Error al traer combos:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([traerProductos(), traerCombos()]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <CargandoSpinner />
      ) : (
        <div>
          <h2>Productos</h2>
          <div className="grid grid-cols-4">
            {productos.map((producto) => (
              <div className="border-black border rounded-lg m-4" key={producto.id_producto}>
                <p>ID: {producto.id_producto}</p>
                <p className="mb-1 mx-4 my-1">{producto.nombre}</p>
                <p className="mb-1 mx-4 my-1">{producto.descripcion}</p>
                <p className="mb-1 mx-4 my-1">${producto.precio}</p>
                <ButtonAddToCarrito {...producto} />
              </div>
            ))}
          </div>

          <h2>Combos</h2>
          <div className="grid grid-cols-4">
            {combos.map((combo) => (
              <div className="border-black border rounded-lg m-4 p-4" key={combo.id_combo}>
              <h3 className="text-lg font-bold mb-2">ID Combo: {combo.id_combo}</h3>
              <h4 className="text-md mb-2">{combo.nombre}</h4>
              <p className="mb-4">Descuento: <span className="text-green-600 font-semibold">{combo.descuento * 100}%</span></p>
            
              {/* Productos en el combo */}
              <div className="grid grid-cols-1 gap-4">
                {combo.productos.map((comboProducto) => (
                  <div key={comboProducto.id_producto} className="border rounded-lg p-4 shadow-md">
                    <h5 className="text-md font-bold mb-2">Producto: {comboProducto.producto?.nombre}</h5>
                    <p className="mb-1">Precio original: <span className="line-through">${comboProducto.producto?.precio}</span></p>
                    <p className="mb-1">Precio con descuento: <span className="text-green-500 font-bold">${comboProducto.precioDescuento}</span></p>
                  </div>
                ))}
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaProductos;
