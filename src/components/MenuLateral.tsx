import Link from 'next/link';
import React from 'react';

const MenuLateral = () => {
  
  return (
    <div className="w-64 bg-slate-600 border-r-2 border-red-900 p-4">
      <h2 className="text-lg font-bold">Menu</h2>
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/pedidos">Métricas de Pedidos</Link>
        </li>
        <li>
          <Link href="/dashboard/productos">Métricas de Productos</Link>
        </li>
        {/* <li>
          <Link href="/dashboard">Categorías</Link>
        </li>
        <li>
          <Link href="/productos">Productos</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default MenuLateral;