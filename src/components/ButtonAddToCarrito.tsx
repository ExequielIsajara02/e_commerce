import { ProductoData } from "@/app/types/types";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export const ButtonAddToCarrito = (producto: ProductoData) => {
  const { cartItems, setCartItems, setCarritoVisible } = useContext(CartContext);

  const addToCart = (product: ProductoData) => {
    const existingProduct = cartItems.find(item => item.id_producto === product.id_producto);
    
    if (existingProduct) {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id_producto === product.id_producto 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, cantidad: 1 }]);
    }

    setCarritoVisible(true);
  };

  return (
    <button 
      className="bg-blue-500 p-1 rounded-lg text-white border border-black" 
      onClick={() => addToCart(producto)}
    >
      Agregar al carrito
    </button>
  );
};