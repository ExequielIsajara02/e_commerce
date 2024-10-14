"use client"

import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { crearSesionStripe } from '../../utils/pasarela_stripe';



export const Carrito: React.FC = () => {
  const { cartItems, setCartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.producto.id_producto !== productId));
  };

  if (!cartItems.length && !isCarritoVisible) {
    return null;
  }
  const handlePay = async () => {
    try {
      // 1. Guarda el pedido en tu base de datos antes de crear la sesión de Stripe.
      const response = await fetch('/api/guardarPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productos: cartItems,
          id_usuario: 1, // Aquí deberías agregar el ID del usuario
          metodo_pago: 'tarjeta', // Reemplaza con el método de pago real
          estado: 'pendiente', // Estado del pedido
          precio_final: 1200 // El precio total del carrito
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar el pedido');
      }
  
      const { idPedido } = await response.json(); // Obtén el ID del pedido guardado
  
      // 2. Crea la sesión de Stripe usando los productos del carrito
      const session = await crearSesionStripe(cartItems, idPedido); // Pasa el ID del pedido a Stripe
  
      // 3. Redirige a Stripe Checkout
      window.location.href = session ?? '';
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };
  

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-300 transform transition-transform duration-300 ease-in-out ${isCarritoVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl">Tu Carrito</h1>
        <button onClick={() => setCarritoVisible(false)} className="text-red-500">x</button>
      </div>

      <div className="p-4 overflow-y-auto h-4/6">
        {cartItems.length === 0 ? (
          <h1 className="text-center">No hay productos en el carrito de compras</h1>
        ) : (
          <ul className="list-none p-0">
            {cartItems.map(item => (
              <li key={item.producto.id_producto} className="flex items-center mb-4">
                <img src={item.producto.imagen} alt={item.producto.nombre} className="w-16 h-16 object-cover mr-4" />
                <div className="flex-1">
                  <span>{item.producto.nombre} - ${item.producto.precio.toFixed(2)} x {item.cantidad}</span>
                  <p className="text-sm text-gray-600">{item.producto.descripcion}</p>
                </div>
                <button className="text-red-500" onClick={() => removeFromCart(item.producto.id_producto)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <h2 className="text-xl">Total: ${getTotalPrice().toFixed(2)}</h2>
        </div>
      )}

      <button className="bg-green-600 text-white w-60 h-10 rounded-lg m-6"
        onClick={handlePay}
      >Pagar</button>
    </div>
  );
};
