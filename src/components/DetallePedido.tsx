// import { Pedido } from "@prisma/client";

// // Importamos el tipo de PedidoProducto para utilizarlo en las props
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

// export default async function DetallePedido({ pedidos }: DetallePedidoProps) {
  
//   return (
//     <div className="bg-slate-300 text-black flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <h1 className="text-2xl text-center">Detalle del Pedido</h1>
//       <div className="py-8">
//         {pedidos.length > 0 ? (
//           pedidos.map((pedido) => (
//             <div
//               key={pedido.id_pedido}
//               className="bg-slate-200 border rounded-md mb-4 p-4 shadow-sm text-center"
//             >
//               <h2 className="text-lg font-bold">Pedido número: {pedido.id_pedido}</h2>
//               <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
//               <p>Método de Pago: {pedido.metodo_pago}</p>
//               <p>Estado: {pedido.estado}</p>
//               <p>Precio Final: ${pedido.precio_final}</p>

//               {/* Aquí mostramos los productos y sus cantidades */}
//               <h3 className="text-lg font-semibold">Productos:</h3>
//               {pedido.productos.map((pedidoProducto) => (
//                 <div key={pedidoProducto.producto.nombre}>
//                   <p>{pedidoProducto.producto.nombre}: {pedidoProducto.cantidad} unidades</p>
//                 </div>
//               ))}
//             </div>
//           ))
//         ) : (
//           <p>No hay pedidos disponibles.</p>
//         )}
//       </div>
//     </div>
//   )
// }
 