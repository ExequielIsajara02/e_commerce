import { NextResponse } from "next/server"

export function obtenerProducto(request : any, {params} : any) {

    return NextResponse.json("Getting product " + params.productoId);
}

export function actualizarProducto(request : any, {params} : any) {
    return NextResponse.json("Updating product " + params.productoId);
}

export function borrarProducto(request : any, {params} : any) {
    return NextResponse.json("Deleting product " + params.productoId);
}