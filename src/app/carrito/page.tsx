import React from 'react';
import Carrito from './Carrito';

const Page = () => {
  const removeFromCart = () => {};

  return (
      <div>
          <h1 className='text-black'>Carrito de compra</h1>
          <Carrito/>
      </div>
  );
};

export default Page;