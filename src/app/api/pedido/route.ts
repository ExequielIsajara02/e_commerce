import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {

    const pedidos = await prisma.pedido.findMany()
    // console.log("que hay aca", pedidos);
    
    return NextResponse.json(pedidos);
}
    
export async function POST(request: Request) {
    const {
        id_pedido,
        id_stripe,
        id_usuario,
        fecha,
        metodo_pago,
        estado,
        precio_final,
        recargos,
        descuentos,
        productos, // Asegúrate de que esto es un array de objetos
    } = await request.json();

    try {
        // Crea el pedido en la base de datos
        const nuevoPedido = await prisma.pedido.create({
            data: {
                id_pedido,
                id_stripe,
                id_usuario,
                fecha,
                metodo_pago,
                estado,
                precio_final,
                recargos,
                descuentos,
                // Aquí debes asegurarte de que productos esté en el formato correcto
                productos: {
                    create: productos.map((producto: { id_producto: number; cantidad: number; }) => ({
                        id_producto: producto.id_producto,
                        cantidad: producto.cantidad,
                    })),
                },
            },
        });

        // console.log("NUEVO PEDIDO:",nuevoPedido)
        return NextResponse.json(nuevoPedido);
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        console.log(error)
        return NextResponse.json({ error: "Error al crear el pedido", details: error }, { status: 500 });
    }
}