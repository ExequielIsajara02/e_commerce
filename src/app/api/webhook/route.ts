const { NextResponse } = require("next/server")
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
    const body = await request.text();
    console.log(body);
    console.log('Webhook recibido');

    return NextResponse.json('recibiendo webhook')
}
