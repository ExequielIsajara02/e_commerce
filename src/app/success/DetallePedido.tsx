"use client"


type SessionStripe = {
  id: string | null;
  estado: string | null;
  totalSession: number | null;
  moneda: string | null;
  estadoPago: string | null;
  metodoPago: string[];
  productos: { nombre: string, id_producto: number; cantidad: number }[]; // Ajuste para recibir productos
}

export default function DetallePedido({
  id,
  estado,
  totalSession,
  moneda,
  estadoPago,
  metodoPago,
  productos
}: SessionStripe) {
  const total = totalSession ? totalSession / 100 : 0;

  return (
    <div className="bg-slate-300 text-black flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="text-2xl text-center">Detalle del Pedido</h1>
      <div className="py-8">
        {id ? (
          <div className="bg-slate-200 border rounded-md mb-4 p-4 shadow-sm text-center">
            <h2 className="text-lg font-bold">Código de pedido: {id}</h2>
            <p>Fecha: {new Date().toLocaleDateString()}</p>
            <p>Método de Pago: {metodoPago[0]}</p>
            <p>Estado: {estado}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <h3 className="text-lg font-semibold">Productos:</h3>
            {productos.map((producto, index) => (
              <div key={index}>
                <ul>
                  <li>Producto {producto.nombre}: {producto.cantidad} unidades</li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay pedidos disponibles.</p>
        )}
      </div>
    </div>
  );
}