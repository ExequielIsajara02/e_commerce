import { CarritoData } from "@/app/types/types";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const postCharges = async (cartItems: CarritoData[]) => {
  const totalCarrito = cartItems.reduce((total, item) => {
    return total + item.producto.precio * item.cantidad;
  }, 0);
  


  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCarrito,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });
  

};


// const charge = await stripe.charges.create({
//     amount: 999, //CARRITO TOTAL = carrito.total
//     currency: 'usd',
//     description: 'Example charge', //LISTA DE PRODUCTOS
//     source: "",  // TOKEN
//     statement_descriptor: 'Custom descriptor',
//     });
