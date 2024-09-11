import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {

    const usuario = await prisma.usuario.findMany()
    console.log(usuario);
    
    return NextResponse.json("Getting usuario");
}

export async function POST(request : any) {
    const {nombre, apellido, correo, telefono, direccion, localidad} = await request.json();
    const saveUsuario = await prisma.usuario.create({
        data: {
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            localidad
        }
    });
    console.log(saveUsuario);
    return NextResponse.json("Creating usuario");
}