"use client";

import { EstadoPedido } from "@prisma/client";
import { useEffect, useState } from "react";
import { UsuarioData } from "../../../types/UsuarioData";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem } from "@nextui-org/react";

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
  productos: { id_producto: number; cantidad: number }[];
  usuario: UsuarioData | null;
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function cargarPedidos() {
    try {
      const response = await fetch("/api/pedido");
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  }

  async function handleEstadoChange(id_pedido: number, nuevoEstado: EstadoPedido) {
    try {
      await fetch(`/api/pedido`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_pedido, estadoPedido: nuevoEstado }),
      });
      cargarPedidos();
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error);
    }
  }

  useEffect(() => {
    cargarPedidos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">ADMINISTRAR PEDIDOS</h1>
      <div className="overflow-x-auto">
        <Table
          aria-label="Tabla de pedidos"
          className="min-w-full border border-gray-300 bg-white rounded-xl text-sm cursor-default"
        >
          <TableHeader>
            <TableColumn className="bg-gray-100 font-semibold text-gray-600 rounded-l-xl text-center py-2 px-2 text-xs sm:text-sm">
              ID PEDIDO
            </TableColumn>
            <TableColumn className="bg-gray-100 font-semibold text-gray-600 text-center py-2 px-2 text-xs sm:text-sm">
              CLIENTE
            </TableColumn>
            <TableColumn className="bg-gray-100 font-semibold text-gray-600 text-center py-2 px-2 text-xs sm:text-sm">
              FECHA
            </TableColumn>
            <TableColumn className="bg-gray-100 font-semibold text-gray-600 rounded-r-xl text-center py-2 px-2 text-xs sm:text-sm">
              ESTADO
            </TableColumn>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200">
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id_pedido} className="hover:bg-gray-50 transition">
                <TableCell className="text-center py-1 px-2 text-xs sm:text-sm">
                  {pedido.id_pedido}
                </TableCell>
                <TableCell className="text-center py-1 px-2 text-xs sm:text-sm">
                  {pedido.usuario
                    ? `${pedido.usuario.nombre} ${pedido.usuario.apellido}`
                    : "Sin nombre"}
                </TableCell>
                <TableCell className="text-center py-1 px-2 text-xs sm:text-sm">
                  {new Date(pedido.fecha).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center py-1 px-2 text-xs sm:text-sm">
                <Select
                    className="max-w-xs border border-gray-300 bg-white rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    selectedKeys={new Set([pedido.estadoPedido])}
                    onSelectionChange={(keys) => {
                      const nuevoEstado = Array.from(keys)[0] as EstadoPedido;
                      handleEstadoChange(pedido.id_pedido, nuevoEstado);
                    }}
                  >
                    <SelectItem
                      key="RECIBIDO"
                      className="py-2 pl-3 pr-10 text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-700"
                    >
                      Recibido
                    </SelectItem>
                    <SelectItem
                      key="PREPARADO"
                      className="py-2 pl-3 pr-10 text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-700"
                    >
                      Preparado
                    </SelectItem>
                    <SelectItem
                      key="DESPACHADO"
                      className="py-2 pl-3 pr-10 text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-700"
                    >
                      Despachado
                    </SelectItem>
                    <SelectItem
                      key="ENTREGADO"
                      className="py-2 pl-3 pr-10 text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-700"
                    >
                      Entregado
                    </SelectItem>
                  </Select>






                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
