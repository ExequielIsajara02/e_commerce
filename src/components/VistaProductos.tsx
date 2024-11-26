"use client";
import React, { useEffect, useState } from 'react';
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito";
import { ComboData } from '../../types/ComboData';
import { ProductoData } from '../../types/ProductData';
import { ComboCantidadData } from '../../types/ComboCantidadData';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";



interface Props {
  productos: ProductoData[];
}

const VistaProductos: React.FC<Props> = ({ productos }) => {
  const [filterText, setFilterText] = useState("");
  const [sortOption, setSortOption] = useState<"asc" | "desc">("asc");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [combos, setCombos] = useState<ComboData[]>([]); 
  const [comboCantidad, setComboCantidad] = useState<ComboCantidadData[]>([]);
  const [loading, setLoading] = useState(true);

  const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});

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

  // Filtrar combos
  const filteredCombos = combos.filter(combo => {
    const matchesText = combo.nombre.toLowerCase().includes(filterText.toLowerCase());
    const matchesPrice = combo.productos.reduce((total, producto) => total + (producto.precioDescuento || 0), 0) >= priceRange[0] &&
                         combo.productos.reduce((total, producto) => total + (producto.precioDescuento || 0), 0) <= priceRange[1];
    return matchesText && matchesPrice;
  });

  // Ordenar combos
  const sortedCombos = [...filteredCombos].sort((a, b) => 
    sortOption === "asc" ? 
    a.productos.reduce((total, producto) => total + (producto.precioDescuento || 0), 0) - b.productos.reduce((total, producto) => total + (producto.precioDescuento || 0), 0) :
    b.productos.reduce((total, producto) => total + (producto.precioDescuento || 0), 0) - a.productos.reduce((total, producto) => total + (producto.precioDescuento || 0), 0)
  );

  // Generar opciones de marca y tipo dinámicamente
  const uniqueBrands = Array.from(new Set(productos.map(p => p.marca)));
  const uniqueTypes = Array.from(new Set(productos.map(p => p.tipo)));


  const traerCombos = async () => {
    try {
      const [comboCantidadRes, respuesta] = await Promise.all([
        fetch("http://localhost:3000/api/combosCantidad"), // Endpoint para ComboCantidad
        fetch("http://localhost:3000/api/combos")
      ]);
      const comboCantidadData = await comboCantidadRes.json();
      const datos = await respuesta.json();
      
      setComboCantidad(comboCantidadData);
      setCombos(datos);

    } catch (error) {
      console.error("Error al traer combos:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([traerCombos()]).finally(() => {
      setLoading(false);
    });
  }, []);

  // Verificar si un producto tiene descuento por cantidad
  const tieneDescuentoCantidad = (id_producto: number) => {
    return comboCantidad.some(
      (combo) => combo.id_producto === id_producto
    );
  };

  // Manejar el cambio de cantidad
  const handleCantidadChange = (id: string, value: number) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: Math.max(1, value),
    }));
  };
  


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
        </div>

        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {/* {sortedProducts.map((producto) => (
            <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow" key={producto.id_producto}>
              <p>ID: {producto.id_producto}</p>
              <p className="mb-1 font-semibold">{producto.nombre}</p>
              <p className="mb-1 text-gray-600">{producto.descripcion}</p>
              
              
              {tieneDescuentoCantidad(producto.id_producto) && (
                <div className="mb-2 text-sm text-green-600">
                  ¡Descuento disponible al comprar en cantidad!
                </div>
              )}
              <p className="mb-2 text-lg font-bold">${producto.precio}</p>

              {producto.cantidad > 0 ? (
                <>
                  <input
                    type="number"
                    value={cantidades[producto.id_producto.toString()] || 1}
                    onChange={(e) => handleCantidadChange(producto.id_producto.toString(), Number(e.target.value))}
                    className="border rounded px-2 py-1 w-24 mb-2"
                    min={1}
                  />
                
                  <ButtonAddToCarrito producto={producto} cantidad={cantidades[producto.id_producto.toString()] || 1} />
                </>
              ) : (
                <p className="text-red-500 font-semibold">SIN STOCK</p>
              )}
            </div>
          ))} */}

          {sortedProducts.map((producto) => (
            <Card className='bg-white p-2 rounded-xl shadow-gray-700 shadow-lg' shadow="lg" key={producto.id_producto}
            //  isPressable onPress={() => console.log("item pressed")}
             >
            <CardBody className="overflow-visible p-0 text-center">
              <b>{producto.nombre}</b>
              <Image
                shadow="lg"
                radius="lg"
                width="100%"
                alt={producto.nombre}
                className="w-full shadow-gray-700  shadow-lg rounded-md object-cover h-[140px]"
                src={producto.imagen}
              />
            </CardBody>
            <CardFooter className="flex flex-col text-small justify-between">
              {producto.cantidad > 0 ? (
                <>
                  <div className='flex w-full justify-between'>
                    <p className="text-default-500">Precio: {producto.precio}</p>
                    <input
                      type="number"
                      value={cantidades[producto.id_producto.toString()] || 1}
                      onChange={(e) => handleCantidadChange(producto.id_producto.toString(), Number(e.target.value))}
                      className="border rounded px-2 py-1 w-24 mb-2"
                      min={1}
                    />
                  
                  </div>
                </>
              ) : (
                <p className="text-red-500 font-semibold">SIN STOCK</p>
              )}
              <div className='absolute top-15'>
                <ButtonAddToCarrito producto={producto} cantidad={cantidades[producto.id_producto.toString()] || 1} />
              </div>
            </CardFooter>
          </Card>
          ))}
        </div>

        <h2>Combos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedCombos.map((combo) => (
            <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition-shadow" key={combo.id_combo}>
              <h3 className="text-lg font-bold mb-2">{combo.nombre}</h3>
              <h4 className="text-md mb-2">ID Combo: {combo.id_combo}</h4>
              <p className="mb-4">Descuento: <span className="text-green-600 font-semibold">{combo.descuento * 100}%</span></p>
            
              {/* Productos en el combo */}
              <div className="grid grid-cols-1 gap-4">
                {combo.productos.map((comboProducto) => (
                  <div key={comboProducto.id_producto} className="border rounded-lg p-2 shadow-md w-50">
                    <h5 className="text-md font-bold mb-2">{comboProducto.producto?.nombre}</h5>
                    <p>Precio: ${comboProducto.precioDescuento || comboProducto.producto?.precio}</p>
                  </div>
                ))}
                <div className="font-bold text-lg mt-2">
                  Total : $
                  {combo.productos.reduce((total, comboProducto) => total + (comboProducto.precioDescuento || 0), 0)}
                </div>
                
                <ButtonAddToCarrito combo={combo} cantidad={cantidades[combo.id_combo.toString()] || 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VistaProductos;