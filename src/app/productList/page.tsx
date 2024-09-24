"use client"

import ProductList from './ProductList';
import Link from 'next/link'

const Page = () => {
    const addToCart = () => {};

    return (
      <div>
          <Link href="/carrito" className="flex place-content-end">Ir al Carrito de Compra</Link>
          <ProductList addToCart={addToCart}/>
      </div>
  );
};

export default Page;