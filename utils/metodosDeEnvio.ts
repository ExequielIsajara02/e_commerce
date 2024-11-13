import type { NextApiRequest, NextApiResponse } from 'next';

// Función asincrónica que maneja una petición y genera una respuesta
export async function cotizacion(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const data: any = req.body;

        if (!data) {
            throw new Error("Datos no válidos");
        }

        const result = { processedData: data };

        // Enviar respuesta exitosa
        res.status(200).json({
            success: true,
            message: "Solicitud procesada correctamente",
            data: result
        });
    } catch (error: any) { 
        res.status(500).json({
            success: false,
            message: "Ocurrió un error al procesar la solicitud",
            error: (error instanceof Error) ? error.message : "Error desconocido"
        });
        
    }
}

