import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { CarritoData } from '../types/types'; // Asegúrate de que esta ruta sea correcta
import { Header } from '@/components/Header';
import { Carrito } from '@/components/Carrito';

// Definir la interfaz del contexto
interface CartContextType {
  cartItems: CarritoData[];
  setCartItems: Dispatch<SetStateAction<CarritoData[]>>;
  isCarritoVisible: boolean;
  setCarritoVisible: Dispatch<SetStateAction<boolean>>;
}

// Crear el contexto con valores por defecto
const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  isCarritoVisible: false,
  setCarritoVisible: () => {},
});

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CarritoData[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [isCarritoVisible, setCarritoVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Estado para controlar el montaje

  useEffect(() => {
    setIsMounted(true); // Establecer que el componente se ha montado
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems,
      isCarritoVisible, 
      setCarritoVisible
    }}>
      <Header />
      <Carrito />
      {isMounted && children} {/* Renderiza los hijos solo si el componente está montado */}
    </CartContext.Provider>
  );
};

export { CartContext };
