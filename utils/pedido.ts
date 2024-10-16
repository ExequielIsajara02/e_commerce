import { prisma } from "@/libs/prisma";
import { PedidoData } from "../src/app/types/types";
import { NextResponse } from "next/server";
import { Pedido } from "@prisma/client";

// Función para obtener todos los pedidos
export async function getAllPedidos() {
    try {
        return await prisma.pedido.findMany();
    } catch (error) {
        console.error("Error al recuperar pedidos:", error);
        throw new Error("Error al recuperar pedidos");
    }
}

// Función para crear un nuevo pedido
export async function createPedido(data: any) {
    try {
        const res = await prisma.pedido.create({data});
        console.log(res)
        return res
    } catch (error) {
        console.error("Error creando pedido:", error);
        throw new Error("Error creando pedido");
    }
}

export async function getPedidoById( id: string){
    try {
        return await prisma.pedido.findUnique({
            where: { id_pedido: parseInt(id) }
        });
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
    }
}