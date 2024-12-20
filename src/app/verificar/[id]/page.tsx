"use client";
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react";  // Importar hooks de next-auth

const VerificarCuenta = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: session, status } = useSession();  // Obtenemos la sesión actual
  const [mensaje, setMensaje] = useState('Verificando tu cuenta...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarCuenta = async () => {
      try {
        const res = await fetch(`/api/verificar/${id}`, { method: 'GET' });
        const data = await res.json();

        if (res.ok) {
          setMensaje('¡Cuenta verificada con éxito!');

          // Actualizamos el estado de la sesión si la cuenta fue verificada con éxito
          if (session?.user) {
            session.user.cuentaVerificada = true; // Actualizamos el valor de cuentaVerificada en la sesión
          }
        } else {
          setMensaje(data.error || 'Error en la verificación.');
        }
      } catch (error) {
        setMensaje('Error en la verificación.');
      } finally {
        setLoading(false);
      }
    };

    verificarCuenta();
  }, [id, session]);

  useEffect(() => {
    const refreshSession = async () => {
      const updatedSession = await getSession();
      console.log("Sesión actualizada: ", updatedSession);
    };
  
    if (!loading) refreshSession();
  }, [loading]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800">Verificación de Cuenta</h1>
        
        {loading ? (
          <div className="flex items-center justify-center mt-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <p className="mt-4 text-lg text-gray-600">
            {mensaje}
          </p>
        )}

        {!loading && (
          <a href="/" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors">
            Volver al inicio
          </a>
        )}
      </div>
    </div>
  );
};

export default VerificarCuenta;
