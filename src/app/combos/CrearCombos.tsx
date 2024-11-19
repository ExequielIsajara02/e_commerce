"use client";
import React, { useEffect, useState } from "react";
import CargandoSpinner from "@/components/CargandoSpinner";
import { ComboData } from "../../../types/ComboData";
import { ProductoData } from "../../../types/ProductData";
import { ComboCantidadData } from "../../../types/ComboCantidadData";

const AdminCombos = () => {
    const [combos, setCombos] = useState<ComboData[]>([]);
    const [combosCantidad, setCombosCantidad] = useState<ComboCantidadData[]>([]);
    const [productosData, setProductosData] = useState<ProductoData[]>([]);
    const [productos, setProductos] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("");
    const [descuento, setDescuento] = useState("");
    const [id_usuario, setId_usuario] = useState("");
    const [editComboId, setEditComboId] = useState<number | null>(null);
    const [isCreatingCombo, setIsCreatingCombo] = useState(false); // Estado para manejar la visibilidad del formulario
    const [isCreatingComboCantidad, setIsCreatingComboCantidad] = useState(false);
    const [id_comboCantidad, setId_comboCantidad] = useState<number | null>(null);
    const [id_producto, setId_producto] = useState<number | null>(null);
    const [cantidad_minima, setCantidad_minima] = useState<number | null>(null);
    const [descuentoComboCantidad, setDescuentoComboCantidad] = useState<number>(0);


    const traerCombos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/combos");
            const datos = await respuesta.json();
            setCombos(datos);
        } catch (error) {
            console.error("Error al traer combos:", error);
        }
    };

    const traerCombosCantidad = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/combosCantidad");
            const datos = await respuesta.json();
            setCombosCantidad(datos);
        } catch (error) {
            console.error("Error al traer combos:", error);
        }
    };

    const traerProductos = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/producto");
            const datos = await respuesta.json();
            setProductosData(datos);
        } catch (error) {
            console.error("Error al traer productos:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            await traerCombos();
            await traerCombosCantidad();
            await traerProductos();
        };
        fetchData().finally(() => {
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
    const eliminarComboCantidad = async (id_comboCantidad: number) => {
        try {
            const respuesta = await fetch(`/api/combosCantidad/${id_comboCantidad}`, {
                method: 'DELETE',
            });
            if (!respuesta.ok) {
                throw new Error('Error al eliminar el combo');
            }
            console.log('Combo eliminado exitosamente');
            setCombosCantidad((prevCombos) => prevCombos.filter(combo => combo.id_comboCantidad !== id_comboCantidad));
        } catch (error) {
            console.error(error);
        }
    };

    const editarCombo = async (id_combo: number) => {
        try {
            const comboData = {
                nombre,
                descuento: parseFloat(descuento),
                productos: productos.map(id => ({ id_producto: id })),
                id_usuario: (parseInt(id_usuario, 10))
            };

            const respuesta = await fetch(`/api/combos/${id_combo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comboData),
            });

            if (!respuesta.ok) {
                throw new Error('Error al editar el combo');
            }

            console.log('Combo editado exitosamente');
            traerCombos();
            resetForm(); // Resetea el formulario después de editar
            setIsCreatingCombo(false); // Cierra la modal
        } catch (error) {
            console.error(error);
        }
    };
    
    const editarComboCantidad = async (id_comboCantidad: number) => {
        try {
            const comboCantidadData = {
                // nombre,
                id_comboCantidad: id_comboCantidad,
                id_producto: id_producto,
                cantidad_minima: cantidad_minima,
                descuento: descuentoComboCantidad,
            };

            const respuesta = await fetch(`/api/combosCantidad/${id_comboCantidad}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comboCantidadData),
            });

            if (!respuesta.ok) {
                throw new Error('Error al editar el combo');
            }

            console.log('Combo editado exitosamente');
            traerCombosCantidad();
            resetFormComboCantidad(); // Resetea el formulario después de editar
            setIsCreatingComboCantidad(false); // Cierra la modal
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditarClick = (combo: ComboData) => {
        setEditComboId(combo.id_combo);
        setNombre(combo.nombre);
        setDescuento(combo.descuento.toString());
        setProductos(combo.productos ? combo.productos.map((prod) => prod.id_producto) : []);
        setId_usuario(combo.id_usuario.toString());
        setIsCreatingCombo(true);
    };

    const handleEditarComboCantidad = (combo: ComboCantidadData) => {
        setEditComboId(combo.id_comboCantidad);
        // setNombre(combo.nombre);
        setId_producto(combo.id_producto);
        setCantidad_minima(combo.cantidad_minima);
        setDescuentoComboCantidad(combo.descuento);
        setIsCreatingComboCantidad(true);
    };

    const handleAgregarProducto = (productoNum: number) => {
        setProductos((prevProductos) => [...prevProductos, productoNum]);
    };
    

    const handleEliminarProducto = (index: number) => {
        const nuevosProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevosProductos);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editComboId !== null) {
            editarCombo(editComboId);
        } else {
            const descuentoInt = Math.round(parseFloat(descuento));
            if (descuentoInt < 0 || descuentoInt > 100) {
                console.error("El descuento debe estar entre 0 y 100.");
                return;
            }
            const descuentoFloat = parseFloat((descuentoInt / 100).toFixed(2));
            const comboData = {
                nombre,
                descuento: descuentoFloat,
                productos: productos.map(id => ({ id_producto: id })),
                id_usuario: (parseInt(id_usuario, 10)),
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

                // const result = await response.json();
                // setCombos((prevCombos) => [...prevCombos, result]);
                const responseCombos = await fetch('/api/combos');
                const combosActualizados = await responseCombos.json();
                
                setCombos(combosActualizados);
                resetForm();
                setIsCreatingCombo(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const resetForm = () => {
        setNombre('');
        setDescuento('');
        setProductos([]);
        setId_usuario('');
        setEditComboId(null);
    };

    const resetFormComboCantidad = () => {
        setId_comboCantidad(null);
        setId_producto(null);
        setCantidad_minima(null);
        setDescuentoComboCantidad(0);
        setEditComboId(null);
    };
    
    const handleSubmitComboCantidad = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editComboId !== null) {
            editarComboCantidad(editComboId);
        } else {
            const comboCantidadData: ComboCantidadData = {
                id_comboCantidad: id_comboCantidad!,
                id_producto: id_producto!,
                cantidad_minima: cantidad_minima!,
                descuento: descuentoComboCantidad!,
            };
        
            try {
                const response = await fetch('/api/combosCantidad', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(comboCantidadData),
                });
            
                if (!response.ok) {
                    throw new Error('Error al crear ComboCantidad');
                }
            
                // const result = await response.json();
                const responseCombosCantidad = await fetch('/api/combosCantidad');
                const combosCantidadActualizados = await responseCombosCantidad.json();
                // setCombosCantidad((prevCombosCantidad) => [...prevCombosCantidad, result]);
                setCombosCantidad(combosCantidadActualizados);
                resetFormComboCantidad();
                setIsCreatingComboCantidad(false);
            } catch (error) {
                console.error('Error al crear ComboCantidad:', error);
            }
        }
    };


    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <CargandoSpinner />
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Administrar Combos</h1>

                    {/* Botón para mostrar el formulario de crear combos */}
                    <button 
                        onClick={() => { setIsCreatingCombo(true); resetForm(); }} // Reinicia el formulario para crear un nuevo combo
                        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Crear Nuevo Combo
                    </button>
                    
                    {/* Botón para mostrar el formulario de crear combos POR CANTIDAD */}
                    <button 
                        onClick={() => { setIsCreatingComboCantidad(true); resetFormComboCantidad(); }} // Reinicia el formulario para crear un nuevo combo
                        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Crear Nuevo Combo Cantidad
                    </button>

                    {/* Modal para crear o editar combos */}
                    {isCreatingCombo && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full flex">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold mb-4">{editComboId !== null ? "Editar Combo" : "Crear Combo"}</h2>
                                    <form onSubmit={handleSubmit}>
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
                                            <label htmlFor="descuento" className="block text-sm font-medium text-gray-700">Descuento (%):</label>
                                            <input
                                                type="number"
                                                id="descuento"
                                                value={descuento}
                                                onChange={(e) => setDescuento(e.target.value)}
                                                required
                                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <label htmlFor="productos" className="block text-sm font-medium text-gray-700 mb-2">Productos Seleccionados:</label>
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
                                            <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700">ID Admin:</label>
                                            <input
                                                type="number"
                                                id="id_usuario"
                                                value={id_usuario}
                                                onChange={(e) => setId_usuario(e.target.value)}
                                                required
                                                className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                                            {editComboId !== null ? "Actualizar Combo" : "Crear Combo"}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setIsCreatingCombo(false)} 
                                            className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                        >
                                            Cancelar
                                        </button>
                                    </form>
                                </div>

                                <div className="flex-1 ml-4">
                                    <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
                                    <ul className="max-h-[400px] overflow-y-auto">
                                        {productosData.map((producto) => (
                                            <li key={producto.id_producto} className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                                                <span>{producto.nombre}</span>
                                                <button 
                                                    onClick={() => handleAgregarProducto(producto.id_producto)} 
                                                    className="bg-green-500 text-white font-semibold py-1 px-2 rounded hover:bg-green-600"
                                                >
                                                    Agregar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal para crear o editar combos POR CANTIDAD */}
                    {isCreatingComboCantidad && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full flex flex-col">
                                <h2 className="text-xl font-semibold mb-4">{editComboId !== null ? "Editar Combo" : "Crear Combo"}</h2>
                                <form onSubmit={handleSubmitComboCantidad}>
                                    <div className="mb-4">
                                        <label htmlFor="id_producto" className="block text-sm font-medium text-gray-700">
                                            Seleccionar Producto:
                                        </label>
                                        <select
                                            id="id_producto"
                                            value={id_producto ?? ""}
                                            onChange={(e) => setId_producto(parseInt(e.target.value, 10))}
                                            required
                                            className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="" disabled>Selecciona un producto</option>
                                            {productosData.map((producto) => (
                                                <option key={producto.id_producto} value={producto.id_producto}>
                                                    {producto.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="cantidad_minima"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Cantidad Mínima:
                                        </label>
                                        <input
                                            type="number"
                                            id="cantidad_minima"
                                            value={cantidad_minima ?? ""}
                                            onChange={(e) => setCantidad_minima(parseInt(e.target.value, 10))}
                                            required
                                            className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>


                                    <div className="mb-4">
                                        <label
                                            htmlFor="descuento"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Descuento (%):
                                        </label>
                                        <input
                                            type="number"
                                            id="descuento"
                                            value={descuentoComboCantidad}
                                            onChange={(e) => setDescuentoComboCantidad(parseFloat(e.target.value))}
                                            required
                                            className="text-gray-900 mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>


                                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                                            {editComboId !== null ? "Actualizar Combo" : "Crear Combo"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCreatingComboCantidad(false)}
                                        className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Cancelar
                                    </button>
                                    
                                </form>
                            </div>
                        </div>
                    )}


                    <ul className="mt-4">
                        {combos.map((combo) => (
                            <li key={combo.id_combo} className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                                <div>
                                    <p>{combo.nombre}</p> - Descuento: {(combo.descuento * 100).toFixed(0)}%
                                </div>
                                <div>
                                    <p>Productos:</p>
                                    <ul>
                                        {(combo.productos && Array.isArray(combo.productos) ? combo.productos : []).map((producto) => {
                                            const productoEncontrado = productosData.find((prod) => prod.id_producto === producto.id_producto);
                                            return (
                                                <li key={producto.id_producto}>
                                                    {productoEncontrado ? productoEncontrado.nombre : `Producto ID: ${producto.id_producto}`}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <button 
                                        onClick={() => handleEditarClick(combo)} 
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => eliminarCombo(combo.id_combo)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                        {combosCantidad.map((comboCantidad) => (
                            <li key={comboCantidad.id_comboCantidad} className="flex justify-between items-center mb-2 p-2 border border-gray-300 rounded">
                                <div>
                                    <p>Combo ID:</p> {comboCantidad.id_comboCantidad}<br />
                                    <p>Producto ID:</p> {comboCantidad.id_producto}<br />
                                    <p>Cantidad Mínima:</p> {comboCantidad.cantidad_minima}<br />
                                    <p>Descuento:</p> {comboCantidad.descuento}%
                                </div>
                                <div>
                                    <button 
                                        onClick={() => handleEditarComboCantidad(comboCantidad)} 
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => eliminarComboCantidad(comboCantidad.id_comboCantidad)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </div>
    );
};

export default AdminCombos;
