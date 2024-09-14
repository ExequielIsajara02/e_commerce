import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request : Request, {params} : {params : Params}) {

    try {
        const productoCreado = await prisma.producto.findUnique({
            where: {
                id_producto: Number(params.productoId),
            }
        });
    
        return NextResponse.json(productoCreado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

export async function PUT(request : Request, {params} : {params : Params}) {
    try {
        const {nombre, descripcion, imagen, precio, cantidad} = await request.json();
        const productoActualizado = await prisma.producto.update({
            where: {
                id_producto: Number(params.productoId),
            },
            data: {
                nombre,
                descripcion,
                imagen,
                precio,
                cantidad
            }
        });
        return NextResponse.json(productoActualizado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

export async function DELETE(request : Request, {params} : {params : Params}) {
    try {
        const productoBorrado = await prisma.producto.delete({
            where: {
                id_producto: Number(params.productoId),
            }
        });
        
        return NextResponse.json(productoBorrado);
    }catch(error) {
        return NextResponse.json({error}, {status: 404});
    }
}