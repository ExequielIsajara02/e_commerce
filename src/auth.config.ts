import type {NextAuthConfig} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/zod";
import db from "./lib/db";
import bcrypt from "bcryptjs";
import {User} from "next-auth"

export default {
    providers: [
        Credentials({
            authorize: async (credentials) :  Promise<User | null> =>{
                
                const {data, success} = loginSchema.safeParse(credentials);

                // Si las credenciales no son correctas o estan vacias dara el siguiente error
                if(!success) {
                    throw new Error("Invalid credentials")
                }

                // Se verificara si el usario existe en la bd buscandolo por email
                const user = await db.usuario.findFirst({
                    where: {
                        correo: data.email
                    }
                });

                if(!user || !user.clave) {
                    throw new Error("Usuario no encontrado")
                }
    
                    // Se verificara si la contraseña de la credential coincide con la guardada en la bd
                const esValida = await bcrypt.compare(data.password, user.clave);
                if(!esValida) {
                    throw new Error("Contraseña incorrecta")
                }

                const userAuth : User = {
                    id: user.id_usuario.toString(),
                    name: user.nombre,
                    email: user.correo,
                    role: user.role
                } 
                return userAuth;
                
            },
        }),
    ],
} satisfies NextAuthConfig