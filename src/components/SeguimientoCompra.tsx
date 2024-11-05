import { FaCheckCircle, FaBoxOpen, FaShippingFast, FaCheck } from "react-icons/fa";

export default function SeguimientoCompra() {
  const etapas = [
    { nombre: "Recibimos tu pedido", fecha: "21/05", hora: "20:01", icono: <FaBoxOpen /> },
    { nombre: "Pedido confirmado", fecha: "21/05", hora: "20:51", icono: <FaCheckCircle /> },
    { nombre: "Pedido despachado", fecha: "21/05", hora: "21:30", icono: <FaShippingFast /> },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Seguimiento de compra</h2>
      <div className="flex items-center justify-between relative">
        {/* Línea de fondo que conecta todos los iconos */}
        <div className="absolute top-6 left-24 right-24 h-0.5 bg-purple-600 transform -translate-y-1/2 z-0"></div>

        {etapas.map((etapa, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                index === etapas.length - 1
                  ? "bg-purple-600 text-white"
                  : "border-2 border-purple-600 text-purple-600"
              }`}
            >
              {etapa.icono}
            </div>
            <p className="text-sm font-medium mt-2 text-center">{etapa.nombre}</p>
            <p className="text-xs text-gray-500">
              {etapa.fecha} / {etapa.hora}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-gray-700 text-center">
        <p>
          <FaCheck className="inline-block text-purple-600 mr-1" /> Recibe el 24 de mayo
        </p>
      </div>
    </div>
  );
}
