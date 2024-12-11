import { NextResponse } from 'next/server';
import { auth } from '@/auth';  // Utiliza el auth configurado con next-auth
import { prisma } from '@/lib/prisma';
// import { unstable_getServerSession } from "next-auth/next";


// Esta función maneja la verificación de la cuenta
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // const session = await unstable_getServerSession(req);  // Obtener la sesión del servidor
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No estás autenticado' }, { status: 401 });
  }

  const { id } = params;

  if (session.user.id !== id) {
    return NextResponse.json({ error: 'No tienes permitido verificar esta cuenta' }, { status: 403 });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: Number(id) },
    });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Actualizamos la cuenta a verificada en la base de datos
    const usuarioActualizado = await prisma.usuario.update({
      where: { id_usuario: Number(id) },
      data: { cuentaVerificada: true },
    });

    // Actualizamos la sesión para reflejar el cambio en el estado de la cuenta
    // Usamos el callback de NextAuth para asegurar que el estado de `cuentaVerificada` se actualice

    return NextResponse.json({ message: 'Cuenta verificada con éxito', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error al verificar la cuenta:', error);
    return NextResponse.json({ error: 'Error en la verificación' }, { status: 500 });
  }
}
