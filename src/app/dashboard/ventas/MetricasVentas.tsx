import React from 'react';
import { PrismaClient } from '@prisma/client';
// import { Line } from 'react-chartjs-2';

interface PropsMetricasVentas {
  data: {
    productosMasVendidos: { nombre: string; cantidad: number }[];
    comprasFinalizadas: { fecha: string; estado: string }[];
  };
}

const MetricasVentas: React.FC<PropsMetricasVentas> = ({ data }) => {

  const { productosMasVendidos, comprasFinalizadas } = data;
  
  return (
   <div>
      <h2>Productos Más Vendidos</h2>
      <ul>
        {productosMasVendidos.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - Cantidad: {producto.cantidad}
          </li>
        ))}
      </ul>

      <h2>Compras Finalizadas</h2>
      <ul>
        {comprasFinalizadas.map((compra, index) => (
          <li key={index}>
            Fecha: {compra.fecha}, Estado: {compra.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default MetricasVentas;