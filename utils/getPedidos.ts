
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getPedidos() {
  
  const usuario = await auth();
  const usuarioId = parseInt(usuario?.user?.id || "0");

  
  if (!usuarioId) {
    throw new Error("Usuario no autenticado o ID de usuario inválido");
  }

  
  const pedidos = await prisma.pedido.findMany({
    where: { id_usuario: usuarioId },
    include: {
      productos: {
        include: {
          producto: true,
        },
      },
    },
  });
  console.log(pedidos)
  return pedidos;
}