"use client";
import React, { useState } from "react";

const ProductForm = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenUrl, setImagenUrl] = useState(''); 
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [marca, setMarca] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            nombre,
            descripcion,
            imagen: imagenUrl, 
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad, 10),
            marca,
            tipo,
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
            setImagenUrl(''); // Resetear la URL de la imagen
            setPrecio('');
            setCantidad('');
            setMarca('');
            setTipo('');
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
                <label htmlFor="imagenUrl" className="block text-sm font-medium text-gray-700">URL de la Imagen:</label>
                <input
                    type="text"
                    id="imagenUrl"
                    value={imagenUrl}
                    onChange={(e) => setImagenUrl(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imagenUrl && (
                    <img src={imagenUrl} alt="Vista previa" className="mt-2 w-32 h-32 object-cover" />
                )}
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
            <div className="mb-4">
                <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca:</label>
                <input
                    type="text"
                    id="marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    required
                    className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
                <input
                    type="text"
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
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

export default ProductForm;
