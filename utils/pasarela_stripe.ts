import { NextResponse } from "next/server";
import { ProductoData } from "../types/ProductData";
import Stripe from "stripe";
// import { CarritoData, ProductoData } from "../types/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");


export async function crearSesionStripe(cartItems: ProductoData[]) {
    try {
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.nombre,
                    metadata: {
                        id_producto: item.id_producto, // Agregar el ID del producto desde la base de datos
                    },
                },
                unit_amount: item.precio * 100,  // Stripe maneja precios en centavos
            },
            quantity: item.cantidad,
        }));
        const session = await stripe.checkout.sessions.create({
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
            line_items: lineItems,
            mode: 'payment'
        });
        

        return session.url;  // Retorna la sesión creada

    } catch (error) {
        console.error("Error al crear la sesión de Stripe:", error);
        throw new Error("No se pudo crear la sesión de pago");  // Lanzar error para manejo en el componente
    }
}
