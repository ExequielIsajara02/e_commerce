import { Pedido } from "@prisma/client";
import DetallePedido from "@/components/DetallePedido";
import { prisma } from "@/libs/prisma";
// import EnviarPdf from "./EnviarPdf";

export default async function Page() {
  const pedidos = await prisma.pedido.findMany({
    include: {
      productos: {
        include: {
          producto: true,
        },
      },
    },
  });

  return (
    <div>
      <DetallePedido pedidos={pedidos}/>
      {/* <EnviarPdf pedidos={pedidos}/> */}
    </div>
  );
}
