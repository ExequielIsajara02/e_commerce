import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request : Request, {params} : {params : Params}) {

    try {
        const usuarioCreado = await prisma.usuario.findUnique({
            where: {
                id_usuario: Number(params.usuarioId),
            }
        });
    
        return NextResponse.json(usuarioCreado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

export async function PUT(request : Request, {params} : {params : Params}) {
    try {
        const {nombre, apellido, correo, telefono, direccion, localidad} = await request.json();
        const usuarioActualizado = await prisma.usuario.update({
            where: {
                id_usuario: Number(params.usuarioId),
            },
            data: {
                nombre,
                apellido,
                correo,
                telefono,
                direccion,
                localidad
            }
        });
        return NextResponse.json(usuarioActualizado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}

export async function DELETE(request : Request, {params} : {params : Params}) {
    try {
        const usuarioBorrado = await prisma.usuario.delete({
            where: {
                id_usuario: Number(params.usuarioId),
            }
        });
        
        return NextResponse.json(usuarioBorrado);
    }catch(error) {
        return NextResponse.json({error}, {status: 404});
    }
}

