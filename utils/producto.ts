import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductoData } from "../types/ProductData";


export async function getAllProductos(){
        return prisma.producto.findMany();
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