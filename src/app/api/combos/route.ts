import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { crearCombo, eliminarCombo, obtenerCombos } from "../../../../utils/combos";

export async function GET() {
  try {
      const combos = await obtenerCombos();
      return NextResponse.json(combos);
  } catch (error) {
      return NextResponse.json({ error: "Error al obtener combos" }, { status: 500 });
  }
}

// export async function GET() {
//     const combos = await prisma.combo.findMany({
//         include: {
//             productos: {
//                 include: {
//                     producto: true
//                 }
//             }
//         }
//     });
//     return NextResponse.json(combos);
// }

export async function POST(request: Request) {
  try {
      const data = await request.json();
      const nuevoCombo = await crearCombo(data);
      return NextResponse.json(nuevoCombo);
  } catch (error) {
      return NextResponse.json({ error: "Error al crear combo" }, { status: 500 });
  }
}
// export async function POST(request: Request) {
//     const { nombre, descuento, productos, id_usuario } = await request.json();
    
//     // Crear el combo primero
//     const nuevoCombo = await prisma.combo.create({
//       data: {
//         nombre,
//         descuento: parseFloat(descuento),
//         id_usuario: parseInt(id_usuario, 10),
//       },
//     });
  
//     // Conectar los productos al combo recién creado
//     for (const id_producto of productos) {
//       // Obtener el producto para acceder a su precio
//       const producto = await prisma.producto.findUnique({
//         where: { id_producto: id_producto },
//       });

//       if (!producto || producto.precio === null || producto.precio === undefined) {
//         console.error(`Producto con ID ${id_producto} no encontrado o no tiene precio.`);
//         continue;  // Saltar este producto si no existe o si no tiene precio
//       }

//       const precioConDescuento =producto.precio * (1 - nuevoCombo.descuento);
//       await prisma.comboProducto.createMany({
//         data:{
//           id_combo: nuevoCombo.id_combo, // Usamos el ID del combo recién creado
//           id_producto: id_producto,
//           precioDescuento: precioConDescuento,
//         },
//       });      
//     }
//     // Devolver el combo creado
//     return NextResponse.json(nuevoCombo);
//   }
  


// export async function DELETE(request: Request) {
//   try {
//     const { id } = await request.json(); // Obtener el ID del cuerpo de la solicitud

//     if (!id) {
//         return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
//     }

//     const resultado = await eliminarCombo(id);
//     return NextResponse.json(resultado, { status: 200 });
// } catch (error) {
//     console.error("Error en la solicitud DELETE:", error);
//     return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
// }
// }
