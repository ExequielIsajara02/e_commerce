import { NextResponse } from "next/server"
import {prisma} from "../../../lib/db"

export async function GET() {

    const usuario = await prisma.usuario.findMany()
    console.log(usuario);
    
    return NextResponse.json(usuario);
}

export async function POST(request : Request) {
    const {nombre, apellido, correo, clave, telefono, direccion, localidad} = await request.json();
    const guardarUsuario = await prisma.usuario.create({
        data: {
            nombre,
            apellido,
            correo,
            clave,
            telefono,
            direccion,
            localidad,
            cuentaVerificada : false
        }
    });
    console.log(guardarUsuario);
    return NextResponse.json(guardarUsuario);
}