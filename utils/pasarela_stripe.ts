import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CarritoData } from "../types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");


export async function crearSesionStripe(cartItems: CarritoData[]) {
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
            mode: 'payment'
        });
        

        return session.url;  // Retorna la sesión creada

    } catch (error) {
        console.error("Error al crear la sesión de Stripe:", error);
        throw new Error("No se pudo crear la sesión de pago");  // Lanzar error para manejo en el componente
    }
}
