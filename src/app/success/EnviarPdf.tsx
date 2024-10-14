// "use client";
// import React, { useEffect } from 'react';
// import { Pedido } from "@prisma/client";

// interface DetallePedidoProps {
//   pedidos: (Pedido & {
//     productos: {
//       cantidad: number; // La cantidad del producto en el pedido
//       producto: {
//         nombre: string; // Nombre del producto
//         precio: number; // Precio del producto
//       };
//     }[];
//   })[];
// }

// const EnviarPdf = ({ pedidos }: DetallePedidoProps) => {
//   useEffect(() => {
//     const enviarComprobante = async () => {
//       const correo = 'andres.silva41202@gmail.com';
//       try {
//         const detalles = pedidos[0];
//         const pdfRes = await fetch('/api/enviarComprobante', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ correo, detalles }),
//         });

//         if (pdfRes.ok) {
//           console.log('Comprobante enviado con éxito');
//           console.log('Debug: ', detalles)
//         } else {
//           // console.log(pedidos)
//           console.error('Error al enviar el comprobante');
//         }
//       } catch (error) {
//         console.error('Error al hacer la solicitud:', error);
//       }
//     };

//     enviarComprobante();
//   }, []);

//   return <div>Se envió un mail a tu correo con la factura de tu compra</div>;
// };

// export default EnviarPdf;