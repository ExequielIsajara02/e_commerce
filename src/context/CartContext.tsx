import React, { 
  createContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  useEffect 
} from 'react';
import { ProductoData } from '../types/types';
import { Header } from '@/components/Header';
import { Carrito } from '@/components/Carrito';

// Definir la interfaz del contexto
interface CartContextType {
  cartItems: ProductoData[];
  setCartItems: Dispatch<SetStateAction<ProductoData[]>>;
  isCarritoVisible: boolean;
  setCarritoVisible: Dispatch<SetStateAction<boolean>>;
}

// Crear el contexto
const CartContext = createContext<CartContextType>({
  cartItems: [], 
  setCartItems: () => {},
  isCarritoVisible: false,
  setCarritoVisible: () => {},
});

// Proveedor del contexto
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductoData[]>([]);
  const [isCarritoVisible, setCarritoVisible] = useState(false); 

  useEffect(() => {
    // Verificar si estamos en el lado del cliente antes de acceder al localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    // Guardar el carrito en el localStorage cada vez que cambie
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
      <Header/>
      <Carrito />
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
