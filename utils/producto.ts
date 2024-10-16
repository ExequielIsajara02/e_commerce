import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ProductoData } from "@/types/types";


export async function getAllProductos() {
    try {
        const productos = await prisma.producto.findMany();
        console.log(productos);
        return NextResponse.json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
    }
}


async function createProducto(data: ProductoData) {
    // Validaciones básicas de los datos de entrada
    if (!data.nombre || !data.precio || !data.marca || !data.tipo) {
        return NextResponse.json({ error: "Datos incompletos para crear el producto" }, { status: 400 });
    }

    try {
        const nuevoProducto = await prisma.producto.create({ data });
        return NextResponse.json(nuevoProducto, { status: 201 });
    } catch (error) {
        return handleError(error, "Error al crear producto");
    }
}

function handleError(error: unknown, arg1: string) {
    throw new Error("Function not implemented.");
}

