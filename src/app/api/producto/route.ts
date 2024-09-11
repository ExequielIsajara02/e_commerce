import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function obtenerProductos() {

    // const productos = await prisma.producto.findMany()
    // console.log(productos);
    
    return NextResponse.json("Getting products");
}

export async function crearProducto(request : any) {
    // const {nombre, descripcion, precio, cantidad} = await request.json();
    /* const guardarProducto = await prisma.producto.create({
        data: {
            nombre,
            descripcion,
            precio,
            cantidad
        }
    });
    console.log(guardarProducto);
    return NextResponse.json("Creating products"); */
}