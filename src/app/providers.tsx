'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from '../context/CartContext';
import { NextUIProvider } from "@nextui-org/react";


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
