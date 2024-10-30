"use client"

import React, { useContext, ReactNode } from 'react';
import { CartContext } from '@/context/CartContext';
import { crearSesionStripe } from '../../utils/pasarela_stripe';


export const Carrito: React.FC = () => {
  const { cartItems, setCartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id_producto !== productId));
  };

  if (!cartItems.length) {
    return <h1>No hay productos en el carrito de compras</h1>;
  }

  const handlePay = async () => {
    // Guardar el carrito en localStorage antes de proceder al pago
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const session = await crearSesionStripe(cartItems);
    window.location.href = session ?? '';

  }


  return (
    <div className="w-full max-w-md p-4 border border-gray-300 rounded-md">
      <h1 className="text-2xl mb-4">Tu Carrito</h1>
      <ul className="list-none p-0">
        {cartItems.map(item => (
          <li key={item.id_producto} className="flex items-center mb-4">
            <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover mr-4" />
            <div className="flex-1">
              <span>{item.nombre} - ${item.precio} x {item.cantidad}</span>
              <p className="text-sm text-gray-600">{item.descripcion}</p>
            </div>
            <button className="text-red-500" onClick={() => removeFromCart(item.id_producto)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl mt-4">Total: ${getTotalPrice().toFixed(2)}</h2>

      <button className="bg-green-600 text-white w-60 h-10 rounded-lg m-6"
        onClick={handlePay}
      >Pagar</button>
    </div>
  );
};