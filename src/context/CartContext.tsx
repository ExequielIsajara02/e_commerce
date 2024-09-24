import React, { 
  createContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction 
} from 'react';
import { ProductoData } from '../types/types';

// Definir la interfaz del contexto
interface CartContextType {
  cartItems: ProductoData[];
  setCartItems: Dispatch<SetStateAction<ProductoData[]>>;
}

// Crear el contexto
const CartContext = createContext<CartContextType>({ cartItems: [], setCartItems: ()=> {}});

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductoData[]>([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Exportar el contexto
export { CartContext };
