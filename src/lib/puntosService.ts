import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function actualizarPuntos(userId: number, puntosGanados: number) {
  try {
    await prisma.usuario.update({
      where: { id_usuario: userId },
      data: {
        puntos: {
          increment: puntosGanados,
        },
      },
    });
    console.log('Puntos actualizados correctamente');
  } catch (error) {
    console.error('Error al actualizar los puntos:', error);
  }
}