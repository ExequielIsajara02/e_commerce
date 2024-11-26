'use client';

import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NextUIProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </NextUIProvider>
  );
}

export default Providers;
