// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";
// import { prisma } from '@/libs/prisma';
// import { generarComprobantePDF } from "../../../../utils/generarPdf";
// import { buffer } from 'micro';

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2024-06-20",
// });

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     res.setHeader("Allow", "POST");
//     return res.status(405).end("Method Not Allowed");
//   }

//   const buf = await buffer(req);
//   const sig = req.headers["stripe-signature"] as string;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
//   } catch (err) {
//     const error = err as Error;
//     console.error(`Error al verificar la firma del webhook: ${error}`);
//     return res.status(400).send(`Webhook Error: ${error.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;

//     try {
//       if (session.metadata && session.metadata.idPedido) {
//         const idPedido = session.metadata.idPedido;

//         const detallesPedido = await prisma.pedido.findUnique({
//           where: { id_pedido: Number(idPedido) },
//           include: { productos: { include: { producto: true } } },
//         });

//         const correo = session.customer_email || "andres.silva41202@gmail.com";
//         const pdfBuffer = await generarComprobantePDF(correo, detallesPedido);

//         await transporter.sendMail({
//           from: '"E-commerce" <ecommerce.pasantia@gmail.com>',
//           to: correo,
//           subject: 'Comprobante de Pago - E-commerce',
//           text: 'Gracias por tu compra. Te adjuntamos el comprobante de pago.',
//           html: `<p>Gracias por tu compra. Aquí tienes tu comprobante.</p>`,
//           attachments: [
//             {
//               filename: 'comprobante_pago.pdf',
//               content: pdfBuffer,
//               contentType: 'application/pdf',
//             },
//           ],
//         });
//         res.status(200).json({ received: true });
//       } else {
//         console.error("No se encontró idPedido en los metadatos de la sesión.");
//         return res.status(400).send("Error: No se encontró idPedido en los metadatos.");
//       }

//     } catch (error) {
//       console.error("Error al generar el PDF o enviar el correo:", error);
//       res.status(500).json({ error: "Error al procesar el comprobante" });
//     }
//   } else {
//     res.status(400).json({ error: "Evento no manejado" });
//   }
// }
