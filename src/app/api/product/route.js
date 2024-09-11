import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {

    const products = await prisma.product.findMany()
    console.log(products);
    
    return NextResponse.json("Getting products");
}

export async function POST(request) {
    const {name, description, price, stock} = await request.json();
    const saveProduct = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock
        }
    });
    console.log(saveProduct);
    return NextResponse.json("Creating products");
}