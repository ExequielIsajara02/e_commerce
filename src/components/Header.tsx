"use client"
import { CartContext } from "@/context/CartContext"
import { useContext } from "react"

export const Header = () => {
    const { cartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);

    const toggleSideBar = () => {
        setCarritoVisible(!isCarritoVisible); // Cambiar visibilidad usando el estado global del contexto
    }

    return (
        <div className="flex justify-between p-6">
            <h1><strong>Titulo</strong></h1>
            <p onClick={toggleSideBar}>
                Cantidad de artículos en el carrito <strong>{cartItems.length}</strong>
            </p>
        </div>
    )
}
