'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}

export default Providers;