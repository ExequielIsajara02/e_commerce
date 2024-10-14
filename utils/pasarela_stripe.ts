import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CarritoData } from "@/types/types";


// console.log(process.env.DATABASE_URL);
// const stripe= process.env.STRIPE_SECRET_KEY || "";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// const stripe = new Stripe("sk_test_51Q033n2KFuBrFZaE30DlNHMNn5rlBXyjqLV0PwSJkycIzgkvPlZTPVL3y4jFxzysNjVg1AlgfkL26uqGdDrgfKjZ00JMGaBdCx");
//  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY)

export async function crearSesionStripe(cartItems: CarritoData[], idPedido: number) {
    try {
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.producto.nombre,
                },
                unit_amount: item.producto.precio * 100,  // Stripe maneja precios en centavos
            },
            quantity: item.cantidad,
        }));
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/success",
            line_items: lineItems,
            mode: 'payment',
            metadata: {
                idPedido,
              },
        });
        console.log(session)

        return session.url;  // Retorna la sesión creada

    } catch (error) {
        console.error("Error al crear la sesión de Stripe:", error);
        throw new Error("No se pudo crear la sesión de pago");  // Lanzar error para manejo en el componente
    }
}
