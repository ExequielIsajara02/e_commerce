const { PDFDocument } = require("pdf-lib");

export async function generarComprobantePDF(correo: any, detalles: any) {
  console.log("Contenido de detallesPedido en generarComprobantePDF:", JSON.stringify(detalles, null, 2));

  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);

  // Obtener la fecha actual y formatearla
  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Encabezado del comprobante
  page.moveTo(50, 700);
  page.drawText("Comprobante de Pago", { size: 18 });

  page.drawLine({
    start: { x: 50, y: 690 },
    end: { x: 550, y: 690 },
    thickness: 1,
  });

  // Mostrar la fecha actual en el campo de "Fecha"
  page.moveTo(50, 660);
  page.drawText(`Fecha: ${fechaFormateada}`, { size: 12 });

  page.drawLine({
    start: { x: 50, y: 650 },
    end: { x: 550, y: 650 },
    thickness: 1,
  });

  page.moveTo(50, 620);
  page.drawText(`Correo: ${correo}`, { size: 12 });

  // Sección de productos
  page.moveTo(50, 570);
  page.drawText("Productos:", { size: 18 });

  let posicionY = 550;

  // Línea separadora
  page.drawLine({
    start: { x: 50, y: posicionY - 10 },
    end: { x: 550, y: posicionY - 10 },
    thickness: 1,
  });

  // Agregar cada producto con precio total de cantidad * precio
  detalles.productos.forEach((producto: any) => {
    const precioTotal = producto.cantidad * producto.precio;  // Calcular el total por producto

    if (posicionY < 100) { // Verificar si necesita una nueva página
      page = pdfDoc.addPage([600, 800]);
      posicionY = 750;
    }

    page.moveTo(50, posicionY);
    page.drawText(`Nombre: ${producto.nombre}`, { size: 12 });
    page.moveTo(200, posicionY);
    page.drawText(`Cantidad: ${producto.cantidad}`, { size: 12 });
    page.moveTo(340, posicionY);
    page.drawText(`Precio: $${precioTotal.toFixed(2)}`, { size: 12 });  // Mostrar el precio total por producto con formato

    posicionY -= 20;
  });

  // Total al final con formato de moneda
  const totalFormateado = `$${(detalles.total / 100).toFixed(2)}`;
  page.moveTo(340, posicionY - 30);
  page.drawText("Total", { size: 12 });
  page.moveTo(390, posicionY - 30);
  page.drawText(totalFormateado, { size: 12 });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
