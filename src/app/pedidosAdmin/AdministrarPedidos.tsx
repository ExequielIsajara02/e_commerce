"use client";

import { EstadoPedido } from "@prisma/client"; // Importa el enum EstadoPedido
import { useEffect, useState } from "react"; // Necesitarás hooks del cliente
import { UsuarioData } from "../../../types/UsuarioData";

// Define la interfaz para el tipo de pedido
interface Pedido {
  id_pedido: number;
  id_stripe: string;
  id_usuario: number;
  fecha: Date;
  metodo_pago: string;
  estadoCompra: string;
  estadoPedido: EstadoPedido;
  precio_final: number;
  recargos: number;
  descuentos: number;
  productos: { id_producto: number; cantidad: number }[]; // Ajusta según tu estructura de productos
  usuario: UsuarioData | null; // Incluir los datos del usuario
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Usa la interfaz como tipo

  async function cargarPedidos() {
    try {
      const response = await fetch("/api/pedido");
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  }

  // Función para manejar el cambio de estado del pedido
  async function handleEstadoChange(id_pedido: number, nuevoEstado: EstadoPedido) {
    try {
      await fetch(`/api/pedido`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_pedido, estadoPedido: nuevoEstado }),
      });
      cargarPedidos(); // Recargar los pedidos después de actualizar
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  }

  // Carga pedidos al cargar el componente
  useEffect(() => {
    cargarPedidos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrar Pedidos</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID Pedido</th>
            <th className="py-2 px-4 border-b">Nombre del Cliente</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_pedido} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{pedido.id_pedido}</td>
              <td className="py-2 px-4 border-b text-center">
                {pedido.usuario ? `${pedido.usuario.nombre} ${pedido.usuario.apellido}` : "Sin nombre"}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(pedido.fecha).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <select
                  defaultValue={pedido.estadoPedido}
                  onChange={(e) =>
                    handleEstadoChange(pedido.id_pedido, e.target.value as EstadoPedido)
                  }
                  className="p-1 border border-gray-300 rounded"
                >
                  <option value="RECIBIDO">Recibido</option>
                  <option value="PREPARADO">Preparado</option>
                  <option value="DESPACHADO">Despachado</option>
                  <option value="ENTREGADO">Entregado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
