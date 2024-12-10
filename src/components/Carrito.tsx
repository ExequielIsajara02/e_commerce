"use client";
import React, { useContext, useState } from 'react';
import { useSession } from "next-auth/react"
import { CartContext, useCartContext } from '@/context/CartContext';
import { crearSesionStripe } from '../../utils/pasarela_stripe';
import { calculateDiscount, canApplyDiscount } from '../../utils/pointsDiscount';

export const Carrito: React.FC = () => {
  const { data: session } = useSession();
  const { cartItems, setCartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);
  const { clearCart } = useCartContext();
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };
  
  // Calcular el descuento aplicable
  const handleApplyDiscount = () => {
    const total = getTotalPrice();
    const puntosUsuario = session?.puntos || 0; // Puntos disponibles del usuario
    const descuento = calculateDiscount(puntosUsuario, total);

    if (canApplyDiscount(total, descuento)) {
      setSelectedDiscount(descuento);
    } else {
      alert("No puedes aplicar este descuento.");
    }
  };

  // Total después de aplicar el descuento
  const totalAfterDiscount = getTotalPrice() - selectedDiscount;

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id_producto !== productId));
  };

  if (!cartItems.length && !isCarritoVisible) {
    return null;
  }

  const handlePay = async () => {
    // Guardar el carrito en localStorage antes de proceder al pago
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const session = await crearSesionStripe(cartItems);
    window.location.href = session ?? '';

    clearCart();
  };

  return (
    <div
      className={`fixed z-10 top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${
        isCarritoVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl">Tu Carrito</h1>
        <button onClick={() => setCarritoVisible(false)} className="text-red-500">x</button>
      </div>
      <div className="p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <h1 className="text-center">No hay productos en el carrito de compras</h1>
        ) : (
          <ul className="list-none p-0">
            {cartItems.map(item => (
              <li key={item.id_producto} className="flex items-center mb-4">
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover mr-4" />
                <div className="flex-1">
                  <span>{item.nombre} - ${item.precio.toFixed(2)} x {item.cantidad}</span>
                  <p className="text-sm text-gray-600">{item.descripcion}</p>
                </div>
                <button className="text-red-500" onClick={() => removeFromCart(item.id_producto)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botón para aplicar descuento */}
      <button
        className={`w-full py-2 rounded-lg mb-4 ${
          selectedDiscount > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'
        }`}
        onClick={handleApplyDiscount}
        disabled={selectedDiscount > 0} // Desactiva el botón si ya hay un descuento aplicado
      >
        {selectedDiscount > 0 ? "Descuento Aplicado" : "Aplicar Descuento"}
      </button>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <h2 className="text-xl">Total antes del descuento: ${getTotalPrice().toFixed(2)}</h2>
          {selectedDiscount > 0 && (
            <>
              <h2 className="text-xl">Descuento aplicado: ${selectedDiscount.toFixed(2)}</h2>
              <h2 className="text-xl">Total después del descuento: ${totalAfterDiscount.toFixed(2)}</h2>
            </>
          )}
        </div>
      )}

      <button className="bg-green-600 text-white w-60 h-10 rounded-lg m-6" onClick={handlePay}>
        Pagar
      </button>
    </div>
  );
};
