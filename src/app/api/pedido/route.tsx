import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {

    const pedidos = await prisma.pedido.findMany()
    console.log(pedidos);
    
    return NextResponse.json(pedidos);
}
    
export async function POST(request: Request) {
    const { id_usuario, productos, fecha, metodo_pago, estado, precio_final, recargos, descuentos } = await request.json();

    // Crear un nuevo pedido
    const guardarPedido = await prisma.pedido.create({
        data: {
            id_usuario,
            fecha: new Date(fecha), // Asegúrate de que la fecha sea del tipo DateTime
            metodo_pago,
            estado,
            precio_final,
            recargos,
            descuentos,
            productos: {
                create: productos.map((producto: any) => ({
                    id_producto: producto.id_producto,
                    cantidad: producto.cantidad,
                })),
            },
        },
    });

    console.log(guardarPedido);
    return NextResponse.json(guardarPedido);
}
