import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"
<<<<<<< HEAD
import { prisma } from "@/libs/prisma"
import { ProductType } from "@/types/ProductType";
=======
>>>>>>> master

export async function GET(){

    const productos = await prisma.producto.findMany()
    
    return NextResponse.json(productos);
}

export async function POST(request: Request) {
    const {nombre, descripcion, imagen, precio, cantidad, marca, tipo}: ProductType = await request.json();
    const guardarProducto = await prisma.producto.create({
        data: {
            nombre,
            descripcion,
            imagen,
            precio,
            cantidad,
            marca,
            tipo
        }
    });
    return NextResponse.json("Creating products");
}