"use client";
import React, { useEffect, useState } from "react";
import { ProductoData } from "../../../types/ProductData";
import CargandoSpinner from "@/components/CargandoSpinner";

interface Props {
  productos: ProductoData[];
}

const ProductForm: React.FC<Props> = ({ productos }) => {
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [productosData, setProductosData] = useState<ProductoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [editProductoId, setEditProductoId] = useState<number | null>(null);
  const [CrearProducto, setCrearProducto] = useState(false);

  // Traer productos de la API
  const traerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/producto");
      const datos = await respuesta.json();
      setProductosData(datos);
    } catch (error) {
      console.error("Error al traer productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    traerProductos();
  }, []);

  // Filtrar productos
  const filteredProducts = productosData.filter(producto => {
    const matchesText = producto.nombre.toLowerCase().includes(filterText.toLowerCase());
    const matchesBrand = !selectedBrand || producto.marca === selectedBrand;
    const matchesType = !selectedType || producto.tipo === selectedType;
    const matchesPrice = producto.precio >= priceRange[0] && producto.precio <= priceRange[1];
    return matchesText && matchesBrand && matchesType && matchesPrice;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => 
    sortOption === "asc" ? a.precio - b.precio : b.precio - a.precio
  );

  const uniqueBrands = Array.from(new Set(productos.map(p => p.marca)));
  const uniqueTypes = Array.from(new Set(productos.map(p => p.tipo)));

  const eliminarProductoLocal = async (id_producto: number) => {
    try {
      const respuesta = await fetch(`/api/producto/${id_producto}`, { method: 'DELETE' });
      if (!respuesta.ok) throw new Error('Error al eliminar el producto');
      setProductosData(prev => prev.filter(producto => producto.id_producto !== id_producto));
    } catch (error) {
      console.error(error);
    }
  };

  const editarProductoLocal = async (id_producto: number) => {
    try {
      const productData = {
        nombre,
        descripcion,
        imagen: imagenUrl,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10),
        marca,
        tipo,
      };

      const respuesta = await fetch(`/api/producto/${id_producto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!respuesta.ok) throw new Error('Error al editar el producto');

      traerProductos();
      resetForm();
      setCrearProducto(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarClick = (producto: ProductoData) => {
    setEditProductoId(producto.id_producto);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setImagenUrl(producto.imagen);
    setPrecio(producto.precio.toString());
    setCantidad(producto.cantidad.toString());
    setMarca(producto.marca);
    setTipo(producto.tipo);
    setCrearProducto(true);
  };

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
      const response = editProductoId !== null
        ? await fetch(`/api/producto/${editProductoId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) })
        : await fetch('/api/producto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(productData) });

      if (!response.ok) throw new Error('Error al enviar el producto');

      traerProductos();
      resetForm();
      setCrearProducto(false);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setImagenUrl('');
    setPrecio('');
    setCantidad('');
    setMarca('');
    setTipo('');
    setEditProductoId(null);
  };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <CargandoSpinner />
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>
                    {/* Botón para mostrar el formulario de crear combos */}
                    <button 
                        onClick={() => { setCrearProducto(true); resetForm(); }} // Reinicia el formulario para crear un nuevo combo
                        className="mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Crear Nuevo Producto
                    </button>
                    {/* Modal para crear o editar combos */}
                    {CrearProducto && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full flex">
                                {/* <div className="flex-1"> */}
                                    <h2 className="text-xl font-semibold mb-4">{editProductoId !== null ? "Editar Producto" : "Crear Producto"}</h2>
                                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white">
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
                                        {/* <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                                            Crear Producto
                                        </button> */}
                                        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                                            {editProductoId !== null ? "Actualizar Producto" : "Crear Producto"}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setCrearProducto(false)} 
                                            className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                        >
                                            Cancelar
                                        </button>
                                    </form>
                                {/* </div> */}
                            </div>
                        </div>
                    )}

                <div className="w-full flex flex-wrap">
                    <div className="w-1/4">
                        <div className="bg-white shadow rounded p-4">
                        <h2 className="font-semibold mb-2">Filtros</h2>
                        <div className="mb-4">
                            <label className="block">Marca:</label>
                            <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                            <option value="">Todas las marcas</option>
                            {uniqueBrands.map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block">Tipo:</label>
                            <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                            <option value="">Todos los tipos</option>
                            {uniqueTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                            </select>
                        </div>
                        
                        <div className="flex justify-between">
                            <div className="flex items-center">
                            <label className="mr-2">Precio: </label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="border rounded px-2 py-1 w-24"
                                min={0}
                                max={priceRange[1]}
                            />
                            <span className="mx-2">-</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="border rounded px-2 py-1 w-24"
                                min={priceRange[0]}
                                max={100000}
                            />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="flex-1 ml-4">
                        <div className="bg-white shadow rounded p-4 mb-4">
                        <h2 className="font-semibold mb-2">Buscar Producto</h2>
                        <div className="mb-4 flex">
                            <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>  
                        </div>
                        
                    </div>
                </div>

                <div className="left-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedProducts.map((producto) => (
                    <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow" key={producto.id_producto}>
                        <p>ID: {producto.id_producto}</p>
                        <p className="mb-1 font-semibold">{producto.nombre}</p>
                        <p className="mb-1 text-gray-600">{producto.descripcion}</p>
                        <p className="mb-2 text-lg font-bold">${producto.precio}</p>

                        <div>
                            <button 
                                onClick={() => handleEditarClick(producto)} 
                                className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => eliminarProductoLocal(producto.id_producto)} 
                                className="text-red-500 hover:text-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
                </div>


            </div>
            )}
        </div>
    );
};

export default ProductForm;
