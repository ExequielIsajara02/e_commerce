import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { allowedNodeEnvironmentFlags } from "process";
import { crearProducto, obtenerProductos } from "../../../../utils/producto";

export async function GET() {
    try {
        const productos = await obtenerProductos();
        return NextResponse.json(productos);
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const nuevoProducto = await crearProducto(data);
        return NextResponse.json(nuevoProducto);
    } catch (error) {
        return NextResponse.json({ error: "Error al crear combo" }, { status: 500 });
    }
}

function handleError(error: unknown, message: string) {
    console.error(message, error);
    return NextResponse.json({ error: message }, { status: 500 });
}
