import { NextResponse } from "next/server";
import Stripe from "stripe";
// import * as dotenv from 'dotenv';
import { CartItemType } from "@/types/types";
// dotenv.config();

// console.log(process.env.DATABASE_URL);
// const stripe= process.env.STRIPE_SECRET_KEY || "";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// const stripe = new Stripe("sk_test_51Q033n2KFuBrFZaE30DlNHMNn5rlBXyjqLV0PwSJkycIzgkvPlZTPVL3y4jFxzysNjVg1AlgfkL26uqGdDrgfKjZ00JMGaBdCx");
//  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// console.log()

export async function crearSesionStripe(cartItems: CartItemType[]) {
    try {
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.nombre,
                },
                unit_amount: item.precio * 100,  // Stripe maneja precios en centavos
            },
            quantity: item.cantidad,
        }));
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/success",
            line_items: lineItems,
            mode: 'payment'
        });
        console.log(session)

        return session.url;  // Retorna la sesión creada

    } catch (error) {
        console.error("Error al crear la sesión de Stripe:", error);
        throw new Error("No se pudo crear la sesión de pago");  // Lanzar error para manejo en el componente
    }
}
