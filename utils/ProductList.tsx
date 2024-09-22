import React, { useState, useEffect } from 'react';
import Product from './Product';

// Definir la interfaz para un producto
interface ProductType {
  id_producto: number;  
  nombre: string;       
  descripcion: string;  
  imagen: string;       
  precio: number;       
  cantidad: number;     
}

// Datos de productos simulados
const mockProducts: ProductType[] = [
  { id_producto: 1, nombre: 'Product 1', descripcion: 'Descripción de Product 1', imagen: 'url_de_imagen_1', precio: 19.99, cantidad: 10 },
  { id_producto: 2, nombre: 'Product 2', descripcion: 'Descripción de Product 2', imagen: 'url_de_imagen_2', precio: 29.99, cantidad: 5 },
  { id_producto: 3, nombre: 'Product 3', descripcion: 'Descripción de Product 3', imagen: 'url_de_imagen_3', precio: 39.99, cantidad: 8 },
];

interface ProductListProps {
  addToCart: (product: any) => void;
  className?: string;
}


const ProductList: React.FC<ProductListProps> = ({ addToCart, className }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Simula la llamada a una API
    setProducts(mockProducts);
  }, []);

    return (
    <div className={className}> // Utilizamos la propiedad className
      {/* contenido del componente */}
    </div>
  );


  return (
    <div className="product-list">
      <h1>Products</h1>
      {products.map(product => (
        <Product key={product.id_producto} product={product} addToCart={addToCart} /> 
      ))}
    </div>
  );
};

export default ProductList;
