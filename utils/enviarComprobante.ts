import { generarComprobantePDF } from "./generarPdf";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function enviarComprobante(data : any) {

  if (data.status !== 200) {
    console.error('Error: el estado es distinto a 200.');
    return;
  }

  try {
    const correo = "andres.silva41202@gmail.com"
    const pdf = await generarComprobantePDF(correo, data.detallesPedido);
    await transporter.sendMail({
      from: '"E-commerce" <ecommerce.pasantia@gmail.com>',
      to: correo,
      subject: 'Comprobante de Pago - E-commerce',
      text: 'Gracias por tu compra. Te adjuntamos el comprobante de pago.',
      html: `<p>Gracias por tu compra. Aquí tienes tu comprobante.</p>`,
      attachments: [
        {
          filename: 'comprobante_pago.pdf',
          content: pdf,
          contentType: 'application/pdf',
        },
      ],
    });

  } catch (error) {
    console.error('Error al generar el PDF o enviar el correo:', error);
  }
}