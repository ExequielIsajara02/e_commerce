import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Params }) {
    try {
      // Obtener el pedido usando el ID de pedido
      const pedidoCreado = await prisma.pedido.findUnique({
        where: {
          id_pedido: params.pedidoId,
        },
        include: {
          usuario: {
            select: {
              puntos: true, // Puntos totales acumulados del usuario
            },
          },
        },
      });
  
      // Verificar si el pedido existe
      if (!pedidoCreado) {
        return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
      }
  
      // Calcular los puntos ganados en esta compra
      const puntosGanados = Math.floor(pedidoCreado.precio_final / 100); // Ajusta el cálculo según sea necesario
      const puntosTotales = pedidoCreado.usuario.puntos;
     
      // Responder con el pedido, los puntos ganados y los puntos totales
      return NextResponse.json({
        pedido: pedidoCreado,
        puntosGanados,
        puntosTotales,
      });
    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      return NextResponse.json({ error: "Error al obtener el pedido" }, { status: 500 });
    }
  }



// export async function PUT(request : Request, {params} : {params : Params}) {
//     try {
//         const {cantidad, fecha, metodo_pago, estado, precio_final} = await request.json();
//         const pedidoActualizado = await prisma.pedido.update({
//             where: {
//                 id_pedido: params.pedidoId,
//             },
//             data: {
//             cantidad,
//             fecha,
//             metodo_pago,
//             estado,
//             precio_final,
//             }
//         });
//         return NextResponse.json(pedidoActualizado);
//     }catch(error){
//         return NextResponse.json({error}, {status: 404});
//     }
// }

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