"use client"
import React, { useEffect, useState } from 'react';
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import { ProductType } from "@/types/ProductType";

const VistaProductos: React.FC = () => {
  const [productos, setProductos] = useState<ProductType[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({}); // Objeto para almacenar cantidades

  const traerProductos = async () => {
    const respuesta = await fetch("http://localhost:3000/api/producto");
    const datos = await respuesta.json();
    setProductos(datos);
  };

  useEffect(() => {
    traerProductos();
  }, []);

  const handleChange = (id: number, value: number) => {
    setCantidades((prev) => ({ ...prev, [id]: value })); // Actualiza la cantidad para el producto correspondiente
  };

  return (
    <div className="grid grid-cols-4">
      {productos.map((producto) => {
        const cantidad = cantidades[producto.id_producto] || 1; // Obtener cantidad o usar 1 como valor por defecto

        return (
          <div className="border-black border rounded-lg m-4" key={producto.id_producto}>
            <p>ID: {producto.id_producto}</p>
            <p className="mb-1 mx-4 my-1">{producto.nombre}</p>
            <p className="mb-1 mx-4 my-1">{producto.descripcion}</p>
            <p className="mb-1 mx-4 my-1">${producto.precio}</p>
            <input
              type="number"
              min="1"
              value={cantidad} // Usar el valor de cantidad del estado
              onChange={(e) => handleChange(producto.id_producto, Number(e.target.value))} // Manejar cambio de cantidad
              className="border rounded w-20 px-2 py-1 mb-2"
            />
            <ButtonAddToCarrito 
              producto={producto} 
              cantidad={cantidad} // Pasar la cantidad correctamente
            />
          </div>
        );
      })}
    </div>
  );
}

export default VistaProductos;
