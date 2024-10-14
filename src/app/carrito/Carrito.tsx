"use client"

import React, { useContext, ReactNode } from 'react';
import { CartContext } from '@/context/CartContext';

const Carrito: React.FC = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id_producto !== productId));
  };

  if (!cartItems.length) {
    return <h1>No hay productos en el carrito de compras</h1>;
  }


  return (
    <div className="w-full max-w-md p-4 border border-gray-300 rounded-md">
      <h1 className="text-2xl mb-4">Tu Carrito</h1>
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
      <h2 className="text-xl mt-4">Total: ${getTotalPrice().toFixed(2)}</h2>
    </div>
  );
};

export default Carrito;

