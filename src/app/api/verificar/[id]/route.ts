import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const actualizarUsuario = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: { cuentaVerificada: true },
    });

    return NextResponse.json({ message: 'Cuenta verificada con éxito', user: actualizarUsuario });
  } catch (error) {
    console.error('Error al verificar la cuenta:', error);
    return NextResponse.json({ error: 'Error al verificar la cuenta' }, { status: 500 });
  }
}
