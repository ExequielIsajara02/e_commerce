import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { ProductoData } from "@/types/types";

type Props = {
  producto: ProductoData;
  cantidad: number;
};

export const ButtonAddToCarrito = ({producto, cantidad}: Props) => {
  const { cartItems, setCartItems, setCarritoVisible } = useContext(CartContext);

  const addToCart = (product: ProductoData, cantidad: number) => {
    const existingProduct = cartItems.find(item => item.id_producto === product.id_producto);
    
    if (existingProduct) {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id_producto === product.id_producto 
          ? { ...item, cantidad: item.cantidad + cantidad } 
          : item
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, cantidad}]);
    }

    setCarritoVisible(true);
  };

  return (
    <button 
      className="bg-blue-500 p-1 rounded-lg text-white border border-black" 
      onClick={() => addToCart(producto, cantidad)}
    >
      Agregar al carrito
    </button>
  );
};
