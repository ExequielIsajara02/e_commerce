import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                productos: {
                    include: {
                        producto: true,
                    },
                },
                
                usuario: true, // Incluir los datos del usuario asociado
                  
            },
        });
        return NextResponse.json(pedidos);
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        return NextResponse.json({ error: "Error al obtener pedidos" }, { status: 500 });
    }
}


    
export async function POST(request: Request) {
    const {
        id_pedido,
        id_stripe,
        id_usuario,
        fecha,
        metodo_pago,
        estadoCompra,
        estadoPedido,
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
                estadoCompra,
                estadoPedido,
                precio_final,
                recargos,
                descuentos,
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

export async function PATCH(request: Request) {
    const { id_pedido, estadoPedido } = await request.json();

    try {
        const pedidoActualizado = await prisma.pedido.update({
            where: { id_pedido },
            data: { estadoPedido },
        });

        return NextResponse.json(pedidoActualizado);
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        return NextResponse.json({ error: "Error al actualizar el estado del pedido" }, { status: 500 });
    }
}