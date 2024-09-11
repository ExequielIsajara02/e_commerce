import { NextResponse } from "next/server"

export function GET(request : any, {params} : any) {

    return NextResponse.json("Getting product " + params.productoId);
}

export function PUT(request : any, {params} : any) {
    return NextResponse.json("Updating product " + params.productoId);
}

export function DELETE(request : any, {params} : any) {
    return NextResponse.json("Deleting product " + params.productoId);
}