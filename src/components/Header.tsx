"use client";
import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState } from "react";

export const Header = () => {
    const { cartItems, isCarritoVisible, setCarritoVisible } = useContext(CartContext);
    const [isMounted, setIsMounted] = useState(false); // Estado para verificar montaje

    useEffect(() => {
        setIsMounted(true); // Establecer que el componente se ha montado
    }, []);

    const toggleSideBar = () => {
        setCarritoVisible(!isCarritoVisible); // Cambiar visibilidad usando el estado global del contexto
    };

    return (
        <div className="flex justify-end p-6">
            {isMounted && ( // Renderiza solo si el componente está montado
                <p onClick={toggleSideBar}>
                    Cantidad de artículos en el carrito <strong>{cartItems.length}</strong>
                </p>
            )}
        </div>
    );
};
