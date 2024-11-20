import type { NextApiRequest, NextApiResponse } from 'next';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

// Función asincrónica que maneja una petición y genera una respuesta
// utils/metodosDeEnvio.ts

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Origin {
  name: string;
  company: string; // Si es un valor constante, puedes dejarlo así
  email: string;
  phone: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference: string;
  coordinates: Coordinates; // Usamos la interfaz Coordinates para el campo coordinates
}

interface Destination {
  name: string;
  company: string; // Puede ser vacío, así que lo dejamos como string
  email: string; // Puede ser vacío, así que lo dejamos como string
  phone: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  reference: string;
  coordinates: Coordinates; // Usamos la interfaz Coordinates para el campo coordinates
}

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface Packages {
  content: string;
  amount: number;
  type: string; // Puedes especificar un tipo literal si los tipos son limitados
  weight: number;
  insurance: number;
  declaredValue: number;
  weightUnit: string; // Puedes especificar un tipo literal si los valores son limitados, como "LB" o "KG"
  lengthUnit: string; // Puedes especificar un tipo literal si los valores son limitados, como "IN" o "CM"
  dimensions: Dimensions; // Usamos la interfaz Dimensions para el campo dimensions
}

interface Shipment {
  carrier: string; // Puedes especificar un tipo literal si los valores son limitados, como "usps", "fedex", etc.
  type: number; // Si el tipo tiene un rango específico, podrías considerar usar un tipo literal o un enum
}

interface Settings {
  currency: string;
}
  
interface ParamsCotizacion {
    origin: Origin;
    destination: Destination;
    packages: Packages;
    shipment: Shipment;
    settings: Settings;
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
