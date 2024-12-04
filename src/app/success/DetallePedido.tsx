
"use client";
import { useState, useEffect } from "react";
import { SessionStripe } from "../../../types/SessionStripe"; 

export default function DetallePedido({
  id,
  estadoCompra,
  totalSession,
  moneda,
  estadoPago,
  metodoPago,
  productos,
  usuarioId,  // Asegúrate de recibir el userId aquí
  
}: SessionStripe & { usuarioId: number }) {
  const [puntosTotales, setPuntosTotales] = useState<number>(0);
  //const [puntosGanados, setPuntosGanados] = useState<number>(0); // Estado para puntos ganados en la compra
  const total = totalSession ? totalSession / 100 : 0;
  const puntosGanados = total ? Math.floor(total / 100) : 0;

  useEffect(() => {
    const obtenerPuntosTotales = async () => {
        try {
          console.log("ID de usuario:", usuarioId);
          const response = await fetch(`/api/usuario/${usuarioId}`); // Usa backticks aquí
          const data = await response.json();
          setPuntosTotales(data.puntos);
        } catch (error) {
          console.error("Error al obtener puntos:", error);
        }
    };
      
      obtenerPuntosTotales();
  }, [usuarioId]);

  return (
      <div className="bg-slate-300 text-black flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h1 className="text-2xl text-center">Detalle del Pedido</h1>
          <div className="py-8">
              {id ? (
                  <div className="bg-slate-200 border rounded-md mb-4 p-4 shadow-sm text-center">
                      <h2 className="text-lg font-bold">Código de pedido: {id}</h2>
                      <p>Fecha: {new Date().toLocaleDateString()}</p>
                      <p>Método de Pago: {metodoPago[0]}</p>
                      <p>Estado: {estadoCompra}</p>
                      <p>Total: ${total.toFixed(2)}</p>
                      
                      {/* Mostrar puntos ganados y totales */}
                      <p>Puntos ganados en esta compra: {puntosGanados}</p>
                      <p>Puntos totales acumulados: {puntosTotales}</p>

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