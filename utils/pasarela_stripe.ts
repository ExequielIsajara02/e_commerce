import { NextResponse } from "next/server";
import Stripe from "stripe";
// import * as dotenv from 'dotenv';
import { Producto } from "@prisma/client";
// dotenv.config();

console.log(process.env.DATABASE_URL);
// const stripe= process.env.STRIPE_SECRET_KEY || "";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// const stripe = new Stripe("sk_test_51Q033n2KFuBrFZaE30DlNHMNn5rlBXyjqLV0PwSJkycIzgkvPlZTPVL3y4jFxzysNjVg1AlgfkL26uqGdDrgfKjZ00JMGaBdCx");
//  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// console.log()

export async function createStripeSession(producto : Producto) {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/success",
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: producto.nombre,
                        },
                        unit_amount: producto.precio,  // Cantidad en centavos ($20.00 USD)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
        });
        console.log(session.url)

        return session.url;  // Retorna la sesión creada

    } catch (error) {
        console.error("Error al crear la sesión de Stripe:", error);
        throw new Error("No se pudo crear la sesión de pago");  // Lanzar error para manejo en el componente
    }
}
