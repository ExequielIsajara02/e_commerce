const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ecommerce.pasantia@gmail.com",
    pass: "wsxemdwfuiutlmcp",
  },
});

export async function POST(req, res) {
  try {
    const correo  = await req.json();
    console.log("Debug Json recibido: ", correo)
    const email = correo.bodyReq.correo
    console.log("Debug: ", email)
    
    await transporter.sendMail({
      from: '"Validacion de correo electrónico" <ecommerce.pasantia@gmail.com>',
      to: email,
      subject: "Bienvenido",
      text: "Gracias por registrarte!",
      html: "<b>Gracias por registrarte!</b>",
    });

    return new Response(JSON.stringify({ message: 'Correo enviado con éxito.' }), { status: 200 });
} catch (error) {
  console.error('Error al enviar correo:', error);
  return new Response(JSON.stringify({ error: 'Error al enviar correo.' }), { status: 500 });
}
}