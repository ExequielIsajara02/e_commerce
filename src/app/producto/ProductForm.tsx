"use client";
import React, { useEffect, useState } from "react";

const ProductForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [productos, setProductos] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
        const productData = {
            nombre,
            descripcion,
            imagen,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad, 10),
        };

        try {
            const response = await fetch('/api/producto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            const result = await response.json();
            console.log(result);
            setNombre('');
            setDescripcion('');
            setImagen('');
            setPrecio('');
            setCantidad('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-black text-xl font-semibold mb-4">Crear Producto</h2>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-900">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción:</label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen URL:</label>
                <input
                    type="text"
                    id="imagen"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad:</label>
                <input
                    type="number"
                    id="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Crear Producto
            </button>
        </form>
    );
}
=======
    const productData = {
      nombre,
      descripcion,
      imagen,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad, 10),
    };

    try {
      const response = await fetch("/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      const result = await response.json();
      console.log(result);
      // Restablecer formulario o mostrar un mensaje de éxito
      setNombre("");
      setDescripcion("");
      setImagen("");
      setPrecio("");
      setCantidad("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProducts = async () => {
    const data = await fetch("/api/producto");
    const response = await data.json();
    setProductos(response);
    console.log(response);
    
    return response;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen URL:</label>
          <input
            type="text"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
      {/* {productos.map(producto => {
        return <div>
            <p>{producto}</p>
        </div>
      })} */}
    </div>
  );
};
>>>>>>> 0a6d94e7da3292ec4971e5abe6850a74c3aaa1cf

export default ProductForm;
