"use client";
import React, { useEffect, useState } from "react";
import CargandoSpinner from "@/components/CargandoSpinner";
import { ComboData } from "../../../types/ComboData";

const AdminCombos = () => {
    const [combos, setCombos] = useState<ComboData[]>([]);
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    const [descuento, setDescuento] = useState("");
    const [producto, setProducto] = useState("");
    const [productos, setProductos] = useState<number[]>([]);
    const [id_usuario, setId_usuario] = useState("");

    const traerCombos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/combos");
            const datos = await respuesta.json();
            setCombos(datos);
        } catch (error) {
            console.error("Error al traer combos:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        traerCombos().finally(() => {
            setLoading(false);
        });
    }, []);

    const eliminarCombo = async (id_combo: number) => {
        try {
            const respuesta = await fetch(`/api/combos/${id_combo}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar el combo');
            }
            console.log('Combo eliminado exitosamente');
            setCombos((prevCombos) => prevCombos.filter(combo => combo.id_combo !== id_combo));
        } catch (error) {
            console.error(error);
        }
    };

    // Maneja el submit del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const comboData = {
            nombre,
            descuento: parseFloat(descuento),
            productos: productos.map(id => ({ id_producto: id })),
            id_usuario: parseInt(id_usuario, 10),
        };

        try {
            const response = await fetch('/api/combos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comboData),
            });

            if (!response.ok) {
                throw new Error('Error al crear el combo');
            }

            const result = await response.json();
            setCombos((prevCombos) => [...prevCombos, result]); // Agrega el nuevo combo a la lista
            setNombre('');
            setDescuento('');
            setProducto('');
            setProductos([]);
            setId_usuario('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAgregarProducto = () => {
        const productoNum = parseInt(producto, 10);

        if (!isNaN(productoNum)) {
            setProductos((prevProductos) => [...prevProductos, productoNum]);
            setProducto('');
        }
    };

    const handleEliminarProducto = (index: number) => {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
    };

    return (
        <div>
            {loading ? (
                <CargandoSpinner />
            ) : (
                <div>
                    <h1>Administrar Combos</h1>
                    <div className="grid grid-cols-4 gap-4">
                        {combos.map((combo) => (
                            <div className="border-black border rounded-lg m-4 p-4" key={combo.id_combo}>
                                <h3 className="text-lg font-bold mb-2">ID Combo: {combo.id_combo}</h3>
                                <h4 className="text-md mb-2">{combo.nombre}</h4>
                                <p className="mb-4">Descuento: <span className="text-green-600 font-semibold">{combo.descuento * 100}%</span></p>
                                <button 
                                    onClick={() => eliminarCombo(combo.id_combo)} 
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Formulario para crear combos */}
                    <h2 className="text-xl font-semibold mt-10">Crear Combo</h2>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
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
                            <label htmlFor="descuento" className="block text-sm font-medium text-gray-700">Descuento:</label>
                            <input
                                type="number"
                                id="descuento"
                                value={descuento}
                                onChange={(e) => setDescuento(e.target.value)}
                                required
                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Agregar Producto:</label>
                            <input
                                type="text"
                                id="producto"
                                value={producto}
                                onChange={(e) => setProducto(e.target.value)}
                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button 
                                type="button" 
                                onClick={handleAgregarProducto} 
                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                + Agregar Producto
                            </button>
                        </div>

                        <ul className="mb-4">
                            {productos.map((prod, index) => (
                                <li key={index} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
                                    {prod}
                                    <button 
                                        type="button" 
                                        onClick={() => handleEliminarProducto(index)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mb-4">
                            <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700">ID admin:</label>
                            <input
                                type="number"
                                id="id_usuario"
                                value={id_usuario}
                                onChange={(e) => setId_usuario(e.target.value)}
                                required
                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Crear Combo
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminCombos;
