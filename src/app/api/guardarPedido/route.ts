import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productos, id_usuario, metodo_pago, estado, precio_final, recargos = 0, descuentos = 0 } = body;

    
    const nuevoPedido = await prisma.pedido.create({
      data: {
        id_usuario,
        fecha: new Date(),
        metodo_pago,
        estado,
        precio_final,
        recargos,
        descuentos,
        productos: {
          create: productos.map((item: any) => ({
            cantidad: item.cantidad,
            producto: {
              connect: { id_producto: item.producto.id_producto },
            },
          })),
        },
      },
    });

    return NextResponse.json({ idPedido: nuevoPedido.id_pedido });
  } catch (error) {
    console.error('Error al guardar el pedido:', error);
    return NextResponse.json({ error: 'Error al guardar el pedido' }, { status: 500 });
  }
}
