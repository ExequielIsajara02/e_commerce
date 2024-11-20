'use client';
import { FaCheckCircle, FaBoxOpen, FaShippingFast, FaCheck } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Etapa {
  nombre: string;
  icono: JSX.Element;
}

interface SeguimientoCompraProps {
  idPedido: number;
}

export default function SeguimientoCompra({ idPedido }: SeguimientoCompraProps) {
  const [estadoActual, setEstadoActual] = useState<string>("");

  const etapas: Etapa[] = [
    { nombre: "Preparando tu pedido", icono: <FaBoxOpen /> },
    { nombre: "Pedido listo", icono: <FaCheckCircle /> },
    { nombre: "Pedido despachado", icono: <FaShippingFast /> },
    { nombre: "Pedido entregado", icono: <FaCheck /> },
  ];

  // Mapeo entre los estados de la base de datos y las etapas
  const estadoEtapaMap: Record<string, string> = {
    RECIBIDO: "Preparando tu pedido",
    PREPARADO: "Pedido listo",
    DESPACHADO: "Pedido despachado",
    ENTREGADO: "Pedido entregado",
  };

  const obtenerEstadoPedido = async () => {
    try {
      const response = await fetch(`/api/pedido/${idPedido}`);
      const data = await response.json();

      // Validar si el estado existe en el mapeo
      if (estadoEtapaMap[data.estado]) {
        setEstadoActual(estadoEtapaMap[data.estado]);
      } else {
        console.warn("Estado no reconocido:", data.estado);
      }
    } catch (error) {
      console.error("Error al obtener el estado del pedido:", error);
    }
  };

  useEffect(() => {
    if (idPedido) obtenerEstadoPedido();
  }, [idPedido]);

  // Determinar el índice de la etapa actual
  const estadoIndex = etapas.findIndex((etapa) => etapa.nombre === estadoActual);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Seguimiento de compra</h2>
      <div className="flex items-center justify-between">
        {etapas.map((etapa, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {/* Línea de conexión entre las etapas */}
            
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full relative ${
                index <= estadoIndex
                  ? "bg-purple-600 text-white" // Fondo violeta para etapas completadas
                  : "border-2 border-purple-600 text-purple-600"
              }`}
            >
              {etapa.icono}
            </div>
            <p
              className={`text-sm font-medium mt-2 text-center ${
                index === estadoIndex ? "bg-purple-100 p-2 rounded-md" : ""
              }`}
            >
              {etapa.nombre}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
