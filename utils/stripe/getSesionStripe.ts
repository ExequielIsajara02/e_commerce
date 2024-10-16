import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export default async function getSesionStripe(session_id: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "line_items.data.price.product"],
      });
      return session;
    } catch (error) {
      console.error("Error al obtener la sesión de Stripe:", error);
      return null;
    }
  }