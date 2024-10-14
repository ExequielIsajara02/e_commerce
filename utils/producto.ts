import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { ProductoData } from "@/types/types";

// Manejo de errores 
const handleError = (error: any, message: string) => {
    console.error(message, error);
    return NextResponse.json({ error: message }, { status: 500 });
};

export async function GET(request: Request) {
    return getAllProductos();
}

export async function POST(request: Request) {
    const data: ProductoData = await request.json();
    return createProducto(data);
}

export async function getAllProductos() : Promise<ProductoData[]> {
    try {
        return await prisma.producto.findMany();
        
    } catch (error) {
        throw ( "Error al obtener productos: " + error);
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

