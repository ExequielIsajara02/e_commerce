export type SessionStripe = {
    id: string | null;
    estado: string | null;
    totalSession: number | null;
    moneda: string | null;
    estadoPago: string | null;
    metodoPago: string[];
    productos: { nombre: string, id_producto: number; cantidad: number }[]; // Ajuste para recibir productos
  }