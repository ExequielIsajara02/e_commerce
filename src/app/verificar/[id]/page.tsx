"use client"
import { useEffect, useState } from 'react';

const VerificarCuenta = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [mensaje, setMensaje] = useState('Verificando tu cuenta...');

  useEffect(() => {
    const verificarCuenta = async () => {
      try {
        const res = await fetch(`/api/verificar/${id}`, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          setMensaje('¡Cuenta verificada con éxito!');
        } else {
          setMensaje('Error al verificar la cuenta.');
        }
      } catch (error) {
        setMensaje('Error en la verificación.');
      }
    };

    verificarCuenta();
  }, [id]);

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800">Verificación de Cuenta</h1>
        <p className="mt-4 text-lg text-gray-600">
          {mensaje}
        </p>
        <a href="/" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors" >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default VerificarCuenta;
