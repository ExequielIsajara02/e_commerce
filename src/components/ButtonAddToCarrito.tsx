import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { ProductoData } from "../../types/ProductData";
import { ComboData } from "../../types/ComboData";

type Props = {
  producto?: ProductoData;
  combo?: ComboData;
  cantidad: number;
};

export const ButtonAddToCarrito = ({ producto, combo, cantidad }: Props) => {
  const { cartItems, setCartItems, setCarritoVisible } = useContext(CartContext);

  const addToCart = (product: ProductoData, cantidad: number) => {
    if (!product || !product.id_producto) {
      console.error("El producto es indefinido o no tiene id_producto.");
      return;
    }

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
      setCartItems(prevItems => [...prevItems, { ...product, cantidad }]);
    }
  };

  const addComboToCart = (combo: ComboData, cantidad: number) => {
    combo.productos.forEach(comboProducto => {
      if (comboProducto.producto) {
        addToCart(
          {
            ...comboProducto.producto,
            precio: comboProducto.precioDescuento, // Aplicar el precio con descuento del combo
          },
          cantidad
        );
      } else {
        console.error("El comboProducto no tiene un producto asociado.");
      }
    });
  };

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto, cantidad);
    } else if (combo) {
      addComboToCart(combo, cantidad);
    }
    setCarritoVisible(true);
  };

  return (
    <button 
      className="bg-blue-500 p-1 rounded-lg text-white border border-black" 
      onClick={handleAddToCart}
    >
      Agregar al carrito
    </button>
  );
};
