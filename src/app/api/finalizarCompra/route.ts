import { NextResponse } from 'next/server';
import { actualizarPuntos } from '@/lib/puntosService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, detallesCompra, metodoPago, estado, precioFinal, recargos, descuentos } = await request.json();
    
    // Lógica personalizada de la compra (por ejemplo, validación de stock, etc.)

    // Actualizar puntos
    const puntosGanados = 10; // Define los puntos ganados
    await actualizarPuntos(userId, puntosGanados);

    // Registrar la compra en la base de datos
    await prisma.pedido.create({
      data: {
        id_usuario: userId,
        fecha: new Date(),
        metodo_pago: metodoPago,
        estado: estado,
        precio_final: precioFinal,
        recargos: recargos,
        descuentos: descuentos,
        detalles: JSON.stringify(detallesCompra),  // Convierte detallesCompra a JSON si es un objeto
      },
    });

    return NextResponse.json({ message: 'Compra finalizada y puntos actualizados' });
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    return NextResponse.json({ error: 'Error al finalizar la compra' }, { status: 500 });
  }
}
