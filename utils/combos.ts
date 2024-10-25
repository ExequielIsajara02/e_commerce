import { NextResponse } from "next/server";
import { ComboData } from "../types/ComboData";
import { prisma } from "@/lib/prisma";

export async function obtenerCombos() {
    const combos = await prisma.combo.findMany({
        include: {
            productos: {
                include: {
                    producto: true
                }
            }
        }
    });
    // console.log("Combos obtenidos:", combos);
    return combos;
}

export async function crearCombo(data: ComboData) {
    const { nombre, descuento, productos, id_usuario } = data;

    try {
        const nuevoCombo = await prisma.combo.create({
            data: {
                nombre,
                descuento: descuento,
                id_usuario: id_usuario,
            },
        });

        for (const producto of productos) { 
            const productoId = producto.id_producto; 
            const productoData = await prisma.producto.findUnique({
                where: { id_producto: productoId },
            });

            if (!productoData || productoData.precio === null || productoData.precio === undefined) {
                console.error(`Producto con ID ${productoId} no encontrado o no tiene precio.`);
                continue;
            }

            const precioConDescuento = productoData.precio * (1 - nuevoCombo.descuento);
            await prisma.comboProducto.createMany({
                data: {
                    id_combo: nuevoCombo.id_combo,
                    id_producto: productoId,
                    precioDescuento: precioConDescuento,
                },
            });
        }

        return nuevoCombo;

    } catch (error) {
        console.error("Error al crear Combo:", error);
        return NextResponse.json({ error: "Error al crear Combo" }, { status: 500 });
    }
}

export async function eliminarCombo( id: number) {
    try {
        if (!id) throw new Error('ID de combo es necesario');
        await prisma.comboProducto.deleteMany({
            where: {
              id_combo: id, // reemplaza con el ID del combo que estás intentando eliminar
            },
        });
        
        const deletedCombo = await prisma.combo.delete({
            where: {
              id_combo: id,
            },
        });
        
        return { status: 200, message: 'Combo eliminado correctamente' };
        // await prisma.comboProducto.deleteMany({ where: { id_combo: id } });
        // return await prisma.combo.delete({
        //     where: { id_combo: id }
        // });
    } catch (error) {
        console.error("Error al obtener combo:", error);
        return NextResponse.json({ error: "Error al obtener combo" }, { status: 500 });
    }
}