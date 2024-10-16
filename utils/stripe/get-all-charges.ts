import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function getAllCharges(){
    const res = await stripe.charges.list()
    return res.data
}