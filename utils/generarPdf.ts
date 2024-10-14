const  {PDFDocument} = require ("pdf-lib")

export async function generarComprobantePDF(correo : any, detalles : any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  page.moveTo(50, 700);
  page.drawText('Comprobante de Pago', { size: 18 });
  
  page.drawLine({
    start: { x: 50, y: 690 },
    end: { x: 550, y: 690 },
    thickness: 1,
  });

  page.moveTo(50, 660);
  page.drawText(`Fecha: ${detalles.fecha}`, { size: 12 });

  page.drawLine({
    start: { x: 50, y: 650 },
    end: { x: 550, y: 650 },
    thickness: 1,
  });

  page.moveTo(50, 620);
  // page.drawText(`Cliente: ${detallesCompra.cliente}`, { size: 12 });
  
  page.moveTo(50, 600);
  page.drawText(`Correo: ${correo}`, { size: 12 });
  
  page.moveTo(50, 570);
  page.drawText('Productos:', { size: 18 });

  let posicionY = 550;
  // detallesCompra.productos.forEach((producto, index) => {
  //   page.moveTo(100, posicionY);
  //   page.drawText(`${index + 1}. ${producto.nombre}`, { size: 12 });
  //   page.moveTo(400, posicionY);
  //   page.drawText(`$${producto.precio.toFixed(2)}`, { size: 12 });
  //   posicionY -= 20;
  // });

  page.drawLine({
    start: { x: 50, y: posicionY - 10 },
    end: { x: 550, y: posicionY - 10 },
    thickness: 1,
  });

  page.moveTo(340, posicionY - 30);
  page.drawText('Total', {size: 12 });

  page.moveTo(390, posicionY - 30);
  // page.drawText(`$${detallesCompra.montoTotal}`, {size: 18 });

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}