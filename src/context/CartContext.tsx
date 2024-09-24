import React, { 
  createContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  useEffect 
} from 'react';
import { ProductoData } from '../types/types';

// Definir la interfaz del contexto
interface CartContextType {
  cartItems: ProductoData[];
  setCartItems: Dispatch<SetStateAction<ProductoData[]>>;
}

// Crear el contexto
const CartContext = createContext<CartContextType>({ cartItems: [], setCartItems: () => {} });

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductoData[]>(() => {
    // Cargar el carrito del local storage
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  

  useEffect(() => {
    // Guardar el carrito en el local storage cada vez que cambie
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };