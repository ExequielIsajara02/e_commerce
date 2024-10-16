"use client";

import React, { useState, useEffect, useContext } from 'react';
import Product from './CartProduct';
import { CartContext } from '../../context/CartContext';
import { ProductoData } from '../../../types/PedidoData';

// Datos de productos simulados
const mockProducts: ProductoData[] = [
  { id_producto: 1, nombre: 'Product 1', descripcion: 'Descripción de Product 1', imagen: 'https://placehold.co/120x60/png', precio: 19.99, cantidad: 10 },
  { id_producto: 2, nombre: 'Product 2', descripcion: 'Descripción de Product 2', imagen: 'https://placehold.co/120x60/png', precio: 29.99, cantidad: 5 },
  { id_producto: 3, nombre: 'Product 3', descripcion: 'Descripción de Product 3', imagen: 'https://placehold.co/120x60/png', precio: 39.99, cantidad: 8 },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductoData[]>([]);
  const context = useContext(CartContext); // Obtener el contexto del carrito

  useEffect(() => {
    // Simula la llamada a una API
    setProducts(mockProducts);
  }, []);

  const addToCart = (product: ProductoData) => {
    // Añadir el producto al carrito
    context.setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id_producto}>
          <Product product={product} />
          <button onClick={() => addToCart(product)}>Añadir al carrito</button>
        </div>
      ))}
      <h2>Carrito</h2>
      <ul>
        {context.cartItems.map(item => (
          <li key={item.id_producto}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
