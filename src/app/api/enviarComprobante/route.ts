import { NextResponse } from "next/server";
import { enviarComprobante } from "../../../../utils/enviarComprobante";

export async function POST(req: Request) {
    try {
        const { id_pago, detallesPedido } = await req.json();
        
        await enviarComprobante({ id_pago,detallesPedido });
        // console.log("DEBUGUEANDO POR AQUI:",detallesPedido)
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error en enviarComprobante:", error);
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}

// // pages/api/enviarComprobante.ts

// import { generarComprobantePDF } from "../../../../utils/generarPdf";
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

// export default async function handler(req: any, res: any) {
//   const { data } = req.body;

//   if (data.status !== 200) {
//     console.error('Error: el estado es distinto a 200.');
//     return res.status(400).json({ message: 'Invalid status' });
//   }

//   try {
//     const correo = "andres.silva41202@gmail.com";
//     const pdf = await generarComprobantePDF(correo, data.detallesPedido);
//     await transporter.sendMail({
//       from: '"E-commerce" <ecommerce.pasantia@gmail.com>',
//       to: correo,
//       subject: 'Comprobante de Pago - E-commerce',
//       text: 'Gracias por tu compra. Te adjuntamos el comprobante de pago.',
//       html: `<p>Gracias por tu compra. Aquí tienes tu comprobante.</p>`,
//       attachments: [
//         {
//           filename: 'comprobante_pago.pdf',
//           content: pdf,
//           contentType: 'application/pdf',
//         },
//       ],
//     });

//     return res.status(200).json({ message: 'Comprobante enviado con éxito' });
//   } catch (error) {
//     console.error('Error al generar el PDF o enviar el correo:', error);
//     return res.status(500).json({ message: 'Error interno del servidor' });
//   }
// }
