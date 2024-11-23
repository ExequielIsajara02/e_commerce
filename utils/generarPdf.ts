const { PDFDocument } = require("pdf-lib");

export async function generarComprobantePDF(correo: any, detalles: any) {
  console.log("Contenido de detallesPedido en generarComprobantePDF:", JSON.stringify(detalles, null, 2));

  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);

  const fechaActual = new Date();
  const fechaFormateada = fechaActual.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  page.moveTo(50, 700);
  page.drawText("Comprobante de Pago", { size: 18 });

  page.drawLine({
    start: { x: 50, y: 690 },
    end: { x: 550, y: 690 },
    thickness: 1,
  });

  page.moveTo(50, 660);
  page.drawText(`Fecha: ${fechaFormateada}`, { size: 12 });

  page.drawLine({
    start: { x: 50, y: 650 },
    end: { x: 550, y: 650 },
    thickness: 1,
  });

  page.moveTo(50, 620);
  page.drawText(`Correo: ${correo}`, { size: 12 });

  page.moveTo(50, 570);
  page.drawText("Productos:", { size: 18 });

  let posicionY = 550;

  page.drawLine({
    start: { x: 50, y: posicionY - 10 },
    end: { x: 550, y: posicionY - 10 },
    thickness: 1,
  });

  detalles.productos.forEach((producto: any) => {
    const precioTotal = producto.cantidad * producto.precio;

    if (posicionY < 100) {
      page = pdfDoc.addPage([600, 800]);
      posicionY = 750;
    }

    page.moveTo(50, posicionY);
    page.drawText(`Nombre: ${producto.nombre}`, { size: 12 });
    page.moveTo(200, posicionY);
    page.drawText(`Cantidad: ${producto.cantidad}`, { size: 12 });
    page.moveTo(340, posicionY);
    page.drawText(`Precio: $${precioTotal.toFixed(2)}`, { size: 12 });

    posicionY -= 20;
  });

  const totalFormateado = `$${(detalles.total / 100).toFixed(2)}`;
  page.moveTo(340, posicionY - 30);
  page.drawText("Total", { size: 12 });
  page.moveTo(390, posicionY - 30);
  page.drawText(totalFormateado, { size: 12 });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
