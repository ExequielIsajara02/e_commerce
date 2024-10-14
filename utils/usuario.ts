import { NextResponse } from "next/server";
<<<<<<< HEAD
import prisma from "../src/lib/db"
import { UsuarioData } from "../src/app/types/types";



// Maneja la solicitud GET para obtener todos los usuarios


=======
import { prisma } from "@/libs/prisma";
import { UsuarioData } from "../src/app/types/types";

// Maneja la solicitud GET para obtener todos los usuarios
>>>>>>> master
export async function GET() {
    try {
        return await prisma.usuario.findMany();
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
}

export async function getUsuarioById( id: number) {
    try {
        return await prisma.usuario.findUnique({
            where: { id_usuario: id }
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}

<<<<<<< HEAD

export async function getUsuarioByEmail( email : string) {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                correo: email, 
            }
        });
       

        return usuario;

    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}


=======
>>>>>>> master
export async function updateUsuario( data: UsuarioData) {
    try {
        return await prisma.usuario.update({
            where: { id_usuario: data.id_usuario},
            data
        });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
    }
}

export async function deleteUsuario( id: number) {
    try {
        return await prisma.usuario.delete({
            where: { id_usuario: id }
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
    }
}

// Maneja la solicitud POST para crear un nuevo usuario
export async function createUsuario(data: UsuarioData) {
<<<<<<< HEAD
    try {
        const usuarioGuardado = await prisma.usuario.create({
            data: data
        });
        return NextResponse.json(usuarioGuardado);
=======
    try {    
        return await prisma.usuario.create({data});
>>>>>>> master
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
    }
}
<<<<<<< HEAD

=======
>>>>>>> master
