import { prisma } from "@/lib/prisma";


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
export async function createPedido(data : any) {
    try {
        return await prisma.pedido.create({data});
    } catch (error) {
        console.error("Error creando pedido:", error);
        throw new Error("Error creando pedido");
    }
}