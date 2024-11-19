import type { NextApiRequest, NextApiResponse } from 'next';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

// Función asincrónica que maneja una petición y genera una respuesta
// utils/metodosDeEnvio.ts

interface Origen {
    codigoPostal: string;
    pais: string;
}
  
interface Destino {
    codigoPostal: string;
    pais: string;
}
  
interface Dimensiones {
    largo: number;
    ancho: number;
    alto: number;
}
  
interface ParamsCotizacion {
    origen: Origen;
    destino: Destino;
    peso: number; // Peso en kilogramos
    dimensiones: Dimensiones;
    // Agrega otros parámetros según la documentación de la API
}
  
export const cotizacion = async (url: string, params: ParamsCotizacion): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: 'POST', // O 'GET', según la API
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer c6eea51bdee084304f08c7f126c760fa52d6b848785681eab0c3a37719da3944"
          // Agrega aquí cualquier encabezado adicional que necesites, como autenticación
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Devuelve los datos de la cotización
    } catch (error) {
      console.error("Error al realizar la cotización:", error);
      throw error; // Lanza el error para que pueda ser manejado donde se llame a esta función
    }
};
