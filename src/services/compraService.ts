// src/services/compraService.ts
import { actualizarPuntos } from '@/lib/puntosService';

export async function finalizarCompra(userId: number) {
  try {
    // Lógica de la compra: procesar la compra, verificar inventario, etc.
    
    // Actualizar puntos del usuario
    const puntosGanados = 10; // Puedes cambiar la lógica de cálculo de puntos aquí
    await actualizarPuntos(userId, puntosGanados);

    // Retornar un resultado de éxito
    return { success: true, message: 'Compra finalizada y puntos actualizados' };
  } catch (error) {
    console.error('Error en finalizarCompra:', error);
    throw new Error('Error al finalizar la compra');
  }
}
