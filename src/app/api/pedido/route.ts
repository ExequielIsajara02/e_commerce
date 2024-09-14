import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {

    const productos = await prisma.producto.findMany()
    console.log(productos);
    
    return NextResponse.json("Getting products");
}
    
export async function POST(request : any) {
    const {id_pedido, id_usuario, id_producto, cantidad, fecha, metodo_pago, estado, precio_final} = await request.json();
    const guardarPedido = await prisma.pedido.create({
        data: {
            id_pedido,
            id_usuario,
            id_producto,
            cantidad,
            fecha,
            metodo_pago,
            estado,
            precio_final
        
        }
    });
    console.log(guardarPedido);
    return NextResponse.json("Creating pedido");
}