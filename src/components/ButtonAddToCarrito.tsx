import { CartContext } from "@/context/CartContext";
import { ProductType } from "@/types/ProductType";
import { ProductoData } from "@/types/types";
import { useContext } from "react";

// Definición de la interfaz para las props
interface ButtonAddToCarritoProps {
  producto: ProductoData; 
  cantidad?: number;      
}

export const ButtonAddToCarrito: React.FC<ButtonAddToCarritoProps> = ({ producto, cantidad = 1 }) => {
  const { setCartItems, setCarritoVisible, cartItems } = useContext(CartContext);

  const addToCart = (product: ProductoData, cantidad: number) => {
    const existingItem = cartItems.find((item) => item.producto.id_producto === product.id_producto);
    if (existingItem) {
      existingItem.cantidad += cantidad; // Aumentar la cantidad existente
      setCartItems((prevItems) => [
        ...prevItems.filter((item) => item.producto.id_producto !== product.id_producto), 
        existingItem
      ]);
    } else {
      setCartItems((prevItems) => [...prevItems, { producto: product, cantidad }]);
    }
    
    setCarritoVisible(true);
  };

  return (
    <button 
      className="bg-blue-500 p-1 rounded-lg text-white border border-black" 
      onClick={() => addToCart(producto, cantidad!)} // Asegúrate de que cantidad no sea undefined
    >
      Agregar al carrito
    </button>
  );
};
