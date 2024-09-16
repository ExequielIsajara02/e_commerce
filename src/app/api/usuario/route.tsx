import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {

    const usuario = await prisma.usuario.findMany()
    console.log(usuario);
    
    return NextResponse.json(usuario);
}

export async function POST(request : Request) {
    const {nombre, apellido, correo, telefono, direccion, localidad} = await request.json();
    const guardarUsuario = await prisma.usuario.create({
        data: {
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            localidad
        }
    });
    console.log(guardarUsuario);
    return NextResponse.json(guardarUsuario);
}