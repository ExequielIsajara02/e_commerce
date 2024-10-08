import { Pedido } from "@prisma/client";
import DetallePedido from "@/components/DetallePedido";
import { prisma } from "@/libs/prisma";

export default async function Page() {
  const pedidos: Pedido[] = await prisma.pedido.findMany();
  return (
    <div>
      
      {/* se renderiza el componente DetallePedido */}
      <DetallePedido  pedidos={pedidos}/>
    </div>

  );
}

  