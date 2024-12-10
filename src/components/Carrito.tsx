"use client";

import { useSession } from "next-auth/react"
import React, { useContext, useEffect, useState } from "react";
import { CartContext, CartItem, useCartContext } from "@/context/CartContext";
import { crearSesionStripe } from "../../utils/pasarela_stripe";
import { calculateDiscount, canApplyDiscount } from '../../utils/pointsDiscount';
import { ProductoData } from "../../types/ProductData";
import { ComboCantidadData } from "../../types/ComboCantidadData";

export const Carrito: React.FC = () => {
  const { data: session } = useSession();
  const { cartItems, setCartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);
  const { clearCart } = useCartContext();
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [combosCantidad, setCombosCantidad] = useState<ComboCantidadData[]>([]);

  const traerCombos = async () => {
    try {
      const comboCantidadRes = await fetch("http://localhost:3000/api/combosCantidad");
      const comboCantidadData: ComboCantidadData[] = await comboCantidadRes.json();
      setCombosCantidad(comboCantidadData);
    } catch (error) {
      console.error("Error al traer combos:", error);
    }
  };

  useEffect(() => {
    traerCombos();
  }, []);

  const applyComboDiscounts = (cartItems: CartItem[], combosCantidad: ComboCantidadData[]) => {
    return cartItems.map((item: CartItem) => {
      if (item.producto) {
        const combo = combosCantidad.find(
          (c) => c.id_producto === Number(item.producto?.id_producto)
        );

        const precioBase = item.producto.precioOriginal || item.producto.precio;

        if (combo) {
          const cumpleCombo = item.cantidad >= combo.cantidad_minima;
          const precioConDescuento = precioBase * (1 - combo.descuento / 100);

          return {
            ...item,
            producto: {
              ...item.producto,
              precioOriginal: precioBase,
              precio: cumpleCombo ? precioConDescuento : precioBase,
            },
          };
        } else {
          console.log(`No combo found for product ${item.producto.id_producto} ------`);
          return {
            ...item,
            producto: {
              ...item.producto,
              precioOriginal: precioBase,
              precio: precioBase,
            },
          };
        }
      }

      return item;
    });
  };

  const getTotalPrice = () => {
    const itemsConDescuento = applyComboDiscounts(cartItems, combosCantidad);
    console.log("Items con descuento:", itemsConDescuento);

    const total = itemsConDescuento.reduce((total: number, item: CartItem) => {
      if (item.producto && typeof item.producto.precio === "number") {
        return total + item.producto.precio * item.cantidad;
      }
      return total;
    }, 0);

    console.log("Total price calculated:", total);
    return total;
  };

  const handleApplyDiscount = () => {
    const total = getTotalPrice();
    const puntosUsuario = session?.user?.puntos || 0;

    console.log("Applying Discount - Total:", total);
    console.log("Applying Discount - User Points:", puntosUsuario);

    const descuento = calculateDiscount(puntosUsuario, total);
    console.log("Applying Discount - Calculated Discount:", descuento);

    const canApply = canApplyDiscount(total, descuento);

    if (canApply) {
      setSelectedDiscount(descuento);
    } else {
      alert("No puedes aplicar este descuento.");
    }
  };
  
  const totalAfterDiscount = getTotalPrice() - selectedDiscount;

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.producto?.id_producto !== productId));
  };

  const updateCantidad = (idProducto: string, nuevaCantidad: number) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.producto?.id_producto === idProducto
          ? { ...item, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 }
          : item
      );
      return applyComboDiscounts(updatedCart, combosCantidad); // Recalcular descuentos
    });
  };

  const handlePay = async () => {
    // Guardar el carrito en localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Crear sesión de Stripe asegurando que los datos cumplan con ProductoData
    const session = await crearSesionStripe(
      cartItems.map((item) => {
        if (!item.producto) {
          throw new Error(`El producto del carrito está incompleto: ${JSON.stringify(item)}`);
        }
        return {
          id_producto: item.producto.id_producto,
          nombre: item.producto.nombre,
          descripcion: item.producto.descripcion,
          imagen: item.producto.imagen,
          precio: item.producto.precio,
          marca: item.producto.marca,
          tipo: item.producto.tipo,
          precioOriginal: item.producto.precioOriginal,
          cantidad: item.cantidad,
        };
      })
    );

    // Redirigir al usuario a la URL de la sesión de Stripe
    window.location.href = session ?? "";

    // Limpiar el carrito
    clearCart();
  };

  if (!cartItems.length && !isCarritoVisible) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${isCarritoVisible ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl">Tu Carrito</h1>
        <button onClick={() => setCarritoVisible(false)} className="text-red-500">
          x
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-3/4">
        {cartItems.length === 0 ? (
          <h1 className="text-center">No hay productos en el carrito de compras</h1>
        ) : (
          <ul className="list-none p-0">
            {cartItems.map((item) =>
              item.producto ? (
                <li key={item.producto.id_producto} className="flex items-center mb-4">
                  <img
                    src={item.producto.imagen}
                    alt={item.producto.nombre}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <span>{item.producto.nombre}</span>
                    <div>
                      <span>${item.producto.precio.toFixed(2)}</span>
                      {item.producto.precioOriginal && item.producto.precioOriginal > item.producto.precio && (
                        <span className="line-through text-red-500 ml-2">
                          ${item.producto.precioOriginal.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-gray-200 p-1 rounded-md text-lg font-bold"
                        onClick={() => updateCantidad(item.producto!.id_producto, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-12 mx-2 text-center border rounded-md"
                        value={item.cantidad}
                        readOnly
                      />
                      <button
                        className="bg-gray-200 p-1 rounded-md text-lg font-bold"
                        onClick={() => updateCantidad(item.producto!.id_producto, item.cantidad + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-red-500 ml-4"
                    onClick={() => removeFromCart(item.producto!.id_producto)}
                  >
                    Remove
                  </button>
                </li>
              ) : (
                <li key={item.producto} className="text-red-500">
                  Producto no válido
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* Botón para aplicar descuento */}
      <button
        className={`w-full py-2 rounded-lg mb-4 ${selectedDiscount > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        onClick={handleApplyDiscount}
        disabled={selectedDiscount > 0} // Desactiva el botón si ya hay un descuento aplicado
      >
        {selectedDiscount > 0 ? "Descuento Aplicado" : "Aplicar Descuento"}
      </button>

      <div className="bg-white flex flex-col w-full items-center absolute bottom-5 m-auto justify-center">
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <h2 className="text-xl">Total antes del descuento: ${getTotalPrice().toFixed(2)}</h2>
            {selectedDiscount > 0 && (
              <>
                <h2 className="text-xl">Descuento aplicado: ${selectedDiscount.toFixed(2)}</h2>
                <h2 className="text-xl">Total después del descuento: ${totalAfterDiscount.toFixed(2)}</h2>
              </>
            )}
            <button className="bg-green-600 text-white w-60 h-10 rounded-lg m-6" onClick={handlePay}>
              Pagar
            </button>
          </div>
        )}
      </div>
    </div>
  )}