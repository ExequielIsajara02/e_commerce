"use client";

import React, { useState } from 'react';
import ProductList from '../../../utils/ProductList';
import Cart from '../../../utils/Cart';


// Definir la interfaz para un producto en el carrito
interface CartItemType {
  id_producto: number; 
  nombre: string;
  descripcion: string; 
  imagen: string; 
  precio: number;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (product: { id_producto: number; nombre: string; precio: number; imagen: string; descripcion: string }) => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(item => item.id_producto === product.id_producto);
      if (productIndex > -1) {
        // El producto ya está en el carrito, actualizar la cantidad
        const newCart = [...prevCart];
        newCart[productIndex].cantidad += 1;
        return newCart;
      } else {
        // El producto no está en el carrito, añadirlo con cantidad 1
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id_producto !== productId)); // Cambiado a id_producto
  };

  return (
    <div className="flex justify-between p-5">
      <ProductList addToCart={addToCart} className="flex-1 mx-2.5" />
      <Cart cartItems={cart} removeFromCart={removeFromCart} className="flex-1 mx-2.5" />
    </div>
  );
};

export default Carrito;
