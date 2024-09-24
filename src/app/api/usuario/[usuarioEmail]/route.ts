import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET(request : Request, {params} : {params : Params}) {

    try {
        const usuarioCreado = await prisma.usuario.findUnique({
            where: {
                correo: String(params.correo),
            }
        });
    
        return NextResponse.json(usuarioCreado);
    }catch(error){
        return NextResponse.json({error}, {status: 404});
    }
}