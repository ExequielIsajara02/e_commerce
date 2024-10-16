import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PropsMetricasPedidos {
  data?: {
    totalPedidos: number;
    totalIngresos: number;
    valorPromedioPedido: number;
  };
}

const MetricasPedidos: React.FC<PropsMetricasPedidos> = ({ data }) => {
  return (
    <div className="bg-slate-400 rounded shadow-md p-4 w-1/3 border border-black mx-auto mb-4 mt-4">
      <h2 className="text-lg font-bold text-center text-black">Métricas de Pedidos</h2>
      <ul className="list-none mb-0">
        <li className="py-2 border-b border-black">Total Pedidos: {data?.totalPedidos}</li>
        <li className="py-2 border-b border-black">Total Ingresos: {data?.totalIngresos}</li>
        <li className="py-2">Valor Promedio Pedido: {data?.valorPromedioPedido}</li>
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  
}

export default MetricasPedidos;