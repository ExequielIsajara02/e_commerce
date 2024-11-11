// src/app/api/user/puntos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("usuarioId");

  if (!userId) {
    return NextResponse.json({ error: "Se requiere el ID del usuario" }, { status: 400 });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: Number(userId) },
      select: { puntos: true },
    });

    if (!usuario) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const precioFinal = req.nextUrl.searchParams.get("precioFinal");
    const puntosGanados = precioFinal ? Math.floor(Number(precioFinal) / 100) : 0;

    return NextResponse.json({ puntos: usuario.puntos, puntosGanados });
  } catch (error) {
    console.error("Error al obtener puntos:", error);
    return NextResponse.json({ error: "Error al obtener puntos" }, { status: 500 });
  }
}

