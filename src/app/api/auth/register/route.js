import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const data = await request.json();

    const usuarioEncontrado = await db.usuario.findUnique({
      where: {
        correo: data.correo,
      },
    });

    if (usuarioEncontrado) {
      console.log("El usuario ya existe");

      return NextResponse.json(
        {
          message: "El email ya existe",
        },
        {
          status: 400,
        }
      );
    }

    // Encriptado de clave antes de crear el usuario
    const hashClave = await bcrypt.hash(data.clave, 10);
    const nuevoUsuario = await db.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        clave: hashClave,
        telefono: data.telefono,
        direccion: data.direccion,
        localidad: data.localidad,
      },
    });

    // Muestra un usuario sin el campo clave
    const { clave: _, ...usuario } = nuevoUsuario;
    return NextResponse.json(usuario);
  } catch (error) {
    console.log("error",error)
    return NextResponse.json({
      message: error.message,
    }, {
        status: 500
    });
  }
}
