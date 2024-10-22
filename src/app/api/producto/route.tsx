import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"
// import prisma  from "../../../lib/db"

export async function GET() {

    const productos = await prisma.producto.findMany()
    console.log(productos);
    
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
    console.log(guardarProducto);
    return NextResponse.json("Creating products");
}