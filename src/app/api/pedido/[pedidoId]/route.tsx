import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request : Request, {params} : {params : Params}) {

    try {
        const pedidoCreado = await prisma.pedido.findUnique({
            where: {
                id_pedido: Number(params.pedidoId),
            }
        });
    
        return NextResponse.json(pedidoCreado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

export async function PUT(request : Request, {params} : {params : Params}) {
    try {
        const {cantidad, fecha, metodo_pago, estado, precio_final} = await request.json();
        const pedidoActualizado = await prisma.pedido.update({
            where: {
                id_pedido: Number(params.pedidoId),
            },
            data: {
            cantidad,
            fecha,
            metodo_pago,
            estado,
            precio_final,
            }
        });
        return NextResponse.json(pedidoActualizado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

export async function DELETE(request : Request, {params} : {params : Params}) {
    try {
        const pedidoBorrado = await prisma.pedido.delete({
            where: {
                id_pedido: Number(params.pedidoId),
            }
        });
        
        return NextResponse.json(pedidoBorrado);
    }catch(error) {
        return NextResponse.json({error}, {status: 404});
    }
}