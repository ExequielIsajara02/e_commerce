import { CartContext } from "@/context/CartContext";
import { ProductType } from "@/types/ProductType";
import { useContext } from "react";

export const ButtonAddToCarrito = (producto: ProductType) => {

const context = useContext(CartContext)


const addToCart = (product : ProductType) => {
    context.setCartItems((prevItems) => [...prevItems, product]);
    context.setCarritoVisible(true);
  };


  return(
    <button className="bg-blue-500 p-1 rounded-lg text-white border border-black" onClick={()=> addToCart(producto)}>Agregar al carrito</button>
  )
}