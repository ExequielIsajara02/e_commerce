import { useCartContext } from '@/context/CartContext';

const FinalizarCompra = () => {
  const { clearCart } = useCartContext();

  const handleCompraCompleta = () => {
    console.log('Comprar');
    // Procesa la compra aquí
    clearCart(); // Vacía el carrito después de completar la compra
  };

  return (
    <button 
        className="bg-green-600 text-white w-60 h-10 rounded-lg m-6" 
        onClick={handleCompraCompleta}
    >
        <span>Finalizar Compra</span>
    </button>
  );
};

export default FinalizarCompra;
