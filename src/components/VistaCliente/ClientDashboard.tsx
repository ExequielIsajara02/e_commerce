// ClientDashboard.tsx
import React from 'react';
import { PrismaClient } from '@prisma/client';
import MetricasVentas from '@/app/dashboard/ventas/MetricasVentas';
import MetricasPedidos from '@/app/dashboard/pedidos/MetricasPedidos';
import MetricasProductos from '@/app/dashboard/productos/MetricasProductos';
import Layout from '@/app/dashboard/layout';
import { auth } from '@/auth'; 

const prisma = new PrismaClient();

interface User {
  id_usuario: number;
}

interface  {
  user: User | null; // Puede ser null si no hay sesión
}

interface Props {
  userId: number; // ID del usuario que está logueado
}

const ClientDashboard: React.FC<Props> = ({ userId }) => {
  const [metricasVentas, setMetricasVentas] = React.useState<any>(null);
  const [metricasPedidos, setMetricasPedidos] = React.useState<any>(null);
  const [metricasProductos, setMetricasProductos] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      // Obtener las métricas de ventas
      const ventas = await prisma.pedido.findMany({
        where: { id_usuario: userId, estado: 'finalizado' },
        include: { productos: { include: { producto: true } } },
      });

      const productosMasVendidos = ventas.reduce((acc: Record<string, number>, pedido: any) => {
        pedido.productos.forEach((producto: any) => {
          const nombre = producto.producto.nombre;
          acc[nombre] = (acc[nombre] || 0) + producto.cantidad;
        });
        return acc;
      }, {});

      const comprasFinalizadas = ventas.map((pedido) => ({
        fecha: pedido.fecha.toISOString().split('T')[0],
        estado: pedido.estado,
      }));

      setMetricasVentas({
        productosMasVendidos: Object.entries(productosMasVendidos).map(([nombre, cantidad]) => ({ nombre, cantidad })),
        comprasFinalizadas,
      });

      // Obtener métricas de pedidos
      const totalPedidos = await prisma.pedido.count({
        where: { id_usuario: userId },
      });

      const totalIngresos = await prisma.pedido.aggregate({
        _sum: { precio_final: true },
        where: { id_usuario: userId },
      });

      const ingresosFinales = totalIngresos._sum.precio_final || 0;
      const valorPromedioPedido = totalPedidos > 0 ? ingresosFinales / totalPedidos : 0;

      setMetricasPedidos({
        totalPedidos,
        totalIngresos: ingresosFinales,
        valorPromedioPedido,
      });

      // Obtener métricas de productos
      const totalProductos = await prisma.producto.count();
      const totalIngresosProductos = await prisma.producto.aggregate({
        _sum: { precio: true },
      });

      const ingresosProductos = totalIngresosProductos._sum.precio || 0;
      const valorPromedioProducto = totalProductos > 0 ? ingresosProductos / totalProductos : 0;

      setMetricasProductos({
        totalProductos,
        totalIngresos: ingresosProductos,
        valorPromedioProducto,
      });
    };

    fetchData();
  }, [userId]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard del Cliente</h1>
      <MetricasVentas data={metricasVentas} />
      <MetricasPedidos data={metricasPedidos} />
      <MetricasProductos data={metricasProductos} />
    </Layout>
  );
};

// getServerSideProps para obtener el userId del cliente logueado
export async function getServerSideProps(context: any) {
  const { req } = context;
  const :  = await: any auth: any(); // Asegúrate de que auth() devuelva el tipo correcto

  if (! || !.user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const userId = usuario.id_usuario;

  return {
    props: { userId },
  };
}

export default ClientDashboard;
