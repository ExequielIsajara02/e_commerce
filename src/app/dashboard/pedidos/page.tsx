import React from "react";
import MetricasPedidos from "./MetricasPedidos";
import { prisma } from "@/lib/prisma";
import { authorizationPage } from "../../../../utils/authorization";
import { redirect } from "next/navigation";

const Page = async () => {
  const authorize = await authorizationPage({ roles: ["admin", "editor","user"] });
  console.log("authorize", authorize)
  if (!authorize) {
    redirect("/auth/login");
  }

  const calcularPromedio = (totalPrecio: number, cantidadProducto: number) => {
    return totalPrecio / cantidadProducto;
  };

  const PedidosDb = await prisma.pedido.findMany();
  console.log(PedidosDb);

  const totalPedidos = PedidosDb.length;

  const sumaTotalPedidos = PedidosDb.reduce((total, pedido) => totalPedidos, 0);
  const dataPedido = {
    totalPedidos: totalPedidos,
    totalIngresos: sumaTotalPedidos,
    valorPromedioPedido: calcularPromedio(sumaTotalPedidos, totalPedidos),
  };

  return (
    <div>
      <MetricasPedidos data={dataPedido}></MetricasPedidos>
    </div>
  );
};

export default Page;
