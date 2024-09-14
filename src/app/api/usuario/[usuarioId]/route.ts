import { NextResponse } from "next/server"

export function GET(request : any, {params}: any) {
    return NextResponse.json("Getting usuario" + params.usuarioId);
}

export function PUT(request : any, {params} : any) {
    return NextResponse.json("Updating usuario" + params.usuarioId);
}

export function DELETE(request : any, {params}: any) {
    return NextResponse.json("Deleting usuario" + params.usuarioId);
}