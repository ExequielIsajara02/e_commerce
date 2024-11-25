// MetricasProductos.tsx

import React from 'react';

export interface PropsMetricasProductos {
  data: {
    totalProductos: number;
    totalIngresos: number;
    valorPromedioProducto: number;
  };
}

export const MetricasProductos: React.FC<PropsMetricasProductos> = ({ data }) => {
  return (
    <div className="bg-slate-400 rounded shadow-md p-4 w-1/3 border border-black mx-auto mb-4 mt-4">
      <h2 className="text-lg font-bold text-center">Métricas de Productos</h2>
      <ul className="list-none mb-0">
        <li className="py-2 border-b border-black">Total Productos: {data.totalProductos}</li>
        <li className="py-2 border-b border-black">Total Ingresos: {data.totalIngresos}</li>
        <li className="py-2">Valor Promedio Producto: {data.valorPromedioProducto.toFixed(2)}</li>
      </ul>
    </div>
  );
};

export default MetricasProductos;