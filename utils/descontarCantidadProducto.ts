// utils/descontarCantidadProductos.ts
import { prisma } from "@/lib/prisma";


interface Producto {
  id_producto: number;
  cantidad: number;
}

export async function descontarCantidadProductos(productos: Producto[]) {
  try {
    for (const producto of productos) {
      await prisma.producto.update({
        where: { id_producto: producto.id_producto },
        data: {
          cantidad: {
            decrement: producto.cantidad,
          },
        },
      });
    }
    console.log("Descuento de productos realizado exitosamente");
  } catch (error) {
    console.error("Error al descontar cantidad de productos:", error);
    throw new Error("Error al descontar cantidad de productos");
  }
}
