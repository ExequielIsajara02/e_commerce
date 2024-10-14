"use client";
import React, { useState } from 'react';
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import { ProductoData } from '@/types/types';

interface Props {
  productos: ProductoData[];
}

const VistaProductos: React.FC<Props> = ({ productos }) => {
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);

  // Filtrar productos
  const filteredProducts = productos.filter(producto => {
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

  // Generar opciones de marca y tipo dinámicamente
  const uniqueBrands = Array.from(new Set(productos.map(p => p.marca)));
  const uniqueTypes = Array.from(new Set(productos.map(p => p.tipo)));

  return (
    <div className="flex p-4">
      {/* Tarjeta de filtros a la izquierda */}
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

          <div className="mb-4">
            <label className="block">Rango de Precio:</label>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="border rounded px-2 py-1 w-full mb-2"
              min={0}
              max={priceRange[1]}
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="border rounded px-2 py-1 w-full"
              min={priceRange[0]}
              max={100000}
            />
          </div>
        </div>
      </div>

      {/* Tarjeta de búsqueda a la derecha */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedProducts.map((producto) => (
            <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow" key={producto.id_producto}>
              <p>ID: {producto.id_producto}</p>
              <p className="mb-1 font-semibold">{producto.nombre}</p>
              <p className="mb-1 text-gray-600">{producto.descripcion}</p>
              <p className="mb-2 text-lg font-bold">${producto.precio}</p>
              <ButtonAddToCarrito producto={producto} cantidad={1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VistaProductos;
