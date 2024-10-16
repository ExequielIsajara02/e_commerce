import React, { 
  createContext, 
  useState, 
  ReactNode, 
  Dispatch, 
  SetStateAction, 
  useEffect 
} from 'react';
import { Header } from '@/components/Header';
import { Carrito } from '@/components/Carrito';
import { ProductoData } from '../../types/ProductData';

interface CartContextType {
  cartItems: ProductoData[];
  setCartItems: Dispatch<SetStateAction<ProductoData[]>>;
  isCarritoVisible: boolean;
  setCarritoVisible: Dispatch<SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  isCarritoVisible: false,
  setCarritoVisible: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductoData[]>([]);
  const [isCarritoVisible, setCarritoVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error al parsear los datos del carrito desde localStorage:', error);
        }
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

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
