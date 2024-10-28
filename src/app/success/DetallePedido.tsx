"use client"
import { CartContext } from "@/context/CartContext";
import { Pedido, PedidoProducto } from "@prisma/client";
import { useContext, useEffect } from "react";
import Stripe from "stripe";
import { createPedido } from "../../../utils/pedido";
import { ProductoData } from "../../../types/ProductData";

type SessionStripe = {
  id: string | null;
  estado: string | null;
  totalSession: number | null;
  moneda: string | null;
  estadoPago: string | null;
  metodoPago: string[];
}

export default function DetallePedido({
  id,
  estado,
  totalSession,
  moneda,
  estadoPago,
  metodoPago,
}: SessionStripe) {

  const context = useContext(CartContext)
  const cartItems: ProductoData[] = context.cartItems;


  //----------------------------------Modelado de datos--------------------------

  let total = 0;
  if (totalSession) {
    total = totalSession / 100
  }

  const pedido : Omit<Pedido, 'id_pedido'> = {
    id_stripe: id || "",
    id_usuario: 1,
    fecha: new Date(),
    metodo_pago: metodoPago[0],
    estado: estado || "",
    precio_final: total, 
    recargos: 0,
    descuentos: 0,
  }

  const pedidosProducto = cartItems.map(p => {
    return {
        id_pedido: id,
        id_producto: p.id_producto,
        cantidad: p.cantidad,
    };
});

useEffect(() => {
  const crearPedido = async () => {
      if (id) {
          console.log("Creando pedido...");
          const response = await fetch('/api/pedido', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...pedido,
                  productos: pedidosProducto,
              }),
          });

          if (!response.ok) {
              console.error('Error al crear el pedido:', response.statusText);
              return;
          }

          const nuevoPedido = await response.json();
          console.log("Nuevo pedido creado:", nuevoPedido);
      }
  };

  crearPedido();
}, [id]);


  return (
    <div className="bg-slate-300 text-black flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="text-2xl text-center">Detalle del Pedido</h1>
      <div className="py-8">
      {id ? (
          <div
            className="bg-slate-200 border rounded-md mb-4 p-4 shadow-sm text-center"
          >
            <h2 className="text-lg font-bold">Pedido creado: {pedido.id_stripe}</h2>
            <p>Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
            <p>Método de Pago: {pedido.metodo_pago}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Total: ${pedido.precio_final?.toFixed(2)}</p>

            {/* Aquí puedes mostrar los productos y sus cantidades */}
            <h3 className="text-lg font-semibold">Productos:</h3>
            {pedidosProducto.map((pedidoProducto, index) => (
              <div key={index}>
                <ul>
                  <li>Producto ID: {pedidoProducto.id_producto}: {pedidoProducto.cantidad} unidades</li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay pedidos disponibles.</p>
        )}
      </div>
    </div>
  )
}