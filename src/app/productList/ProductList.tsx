"use client";

import React, { useState, useEffect } from 'react';
import Product from './CartProduct';
import { ProductoData } from '@/types/types';

// Datos de productos simulados
const mockProducts: ProductoData[] = [
  { id_producto: 1, nombre: 'Product 1', descripcion: 'Descripción de Product 1', imagen: 'https://placehold.co/120x60/png', precio: 19.99, cantidad: 10 },
  { id_producto: 2, nombre: 'Product 2', descripcion: 'Descripción de Product 2', imagen: 'https://placehold.co/120x60/png', precio: 29.99, cantidad: 5 },
  { id_producto: 3, nombre: 'Product 3', descripcion: 'Descripción de Product 3', imagen: 'https://placehold.co/120x60/png', precio: 39.99, cantidad: 8 },
];


const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductoData[]>([]);

  useEffect(() => {
    // Simula la llamada a una API
    setProducts(mockProducts);
  }, []);

  return (
    <div className="product-list">
      <h1>Products</h1>
      {products.map(product => (
        <Product key={product.id_producto} product={product}/> 
      ))}
    </div>
  );
};

export default ProductList;
