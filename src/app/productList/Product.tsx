import React from 'react';

// Definir la interfaz para un producto
interface ProductType {
  id_producto: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

interface ProductProps {
  product: ProductType;
  addToCart: (product: ProductType) => void;
}

const Product: React.FC<ProductProps> = ({ product, addToCart }) => {
  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-md">
      <h2 className="text-xl mb-2">{product.nombre}</h2>
      <p className="text-sm mb-2">{product.descripcion}</p>
      <img src={product.imagen} alt={product.nombre} className="mb-2" />
      <p className="text-lg mb-2">${product.precio.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
