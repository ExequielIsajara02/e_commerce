import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {

    const pedidos = await prisma.pedido.findMany()
    console.log(pedidos);
    
    return NextResponse.json(pedidos);
}
    
export async function POST(request : Request) {
    const { id_usuario, id_producto, cantidad, fecha, metodo_pago, estado, precio_final} = await request.json();
    const guardarPedido = await prisma.pedido.create({
        data: {
            id_usuario,
            id_producto,
            cantidad,
            fecha,
            metodo_pago,
            estado,
            precio_final,
        
        }
    });
    console.log(guardarPedido);
    return NextResponse.json(guardarPedido); 
}