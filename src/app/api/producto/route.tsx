import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET() {

    const productos = await prisma.producto.findMany()
    
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
    return NextResponse.json("Creating products");
}