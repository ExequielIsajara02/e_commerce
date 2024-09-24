import Carrito from './Carrito';

const Page = () => {
  const removeFromCart = () => {};

  return (
      <div>
          <h1>Carrito de compra</h1>
          <Carrito cartItems={[]} removeFromCart={removeFromCart}/>
      </div>
  );
};

export default Page;