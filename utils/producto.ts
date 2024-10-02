import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductoData } from "../src/app/types/types";

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

export async function getProductById( id: number) {
    try {
        return await prisma.producto.findUnique({
            where: { id_producto: id }
        });
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
    }
}

export async function createProducto(data: ProductoData) {
    try {
        return await prisma.producto.create({data});
    } catch (error) {
        console.error("Error al crear producto:", error);
        return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
    }
}