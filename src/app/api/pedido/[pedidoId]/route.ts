import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Params }) {
    const pedidoId = Number(params.pedidoId); // Convertir a número, asumiendo que id_pedido es un entero
  
    if (isNaN(pedidoId)) {
      return NextResponse.json({ error: "ID de pedido inválido" }, { status: 400 });
    }
  
    try {
      const pedido = await prisma.pedido.findUnique({
        where: { id_pedido: pedidoId },
        select: { estadoPedido: true } // Solo obtener el estado
      });
  
      if (!pedido) {
        return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
      }
  
      return NextResponse.json({ estado: pedido.estadoPedido });
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      return NextResponse.json({ error: "Error al obtener el pedido" }, { status: 500 });
    }
  }

export async function DELETE(request : Request, {params} : {params : Params}) {
    try {
        const pedidoBorrado = await prisma.pedido.delete({
            where: {
                id_pedido: params.pedidoId,
            }
        });
        
        return NextResponse.json(pedidoBorrado);
    }catch(error) {
        return NextResponse.json({error}, {status: 404});
    }
}