import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"
import { db } from "@/lib/db";

export async function GET() {

    const productos = await db.producto.findMany();
    
    return NextResponse.json(productos);
}

export async function POST(request: Request) {
    const {nombre, descripcion, imagen, precio, cantidad} = await request.json();
    const guardarProducto = await prisma.producto.create({
        data: {
            nombre,
            descripcion,
            imagen,
            precio,
            cantidad,
        }
    });
    return NextResponse.json(guardarProducto);
}