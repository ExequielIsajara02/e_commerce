import { NextResponse } from "next/server"

export function GET(request, {params}) {
    return NextResponse.json("Getting product " + params.productId);
}

export function PUT(request, {params}) {
    return NextResponse.json("Updating product " + params.productId);
}

export function DELETE(request, {params}) {
    return NextResponse.json("Deleting product " + params.productId);
}