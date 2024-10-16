import DetallePedido from "@/app/success/DetallePedido";
import getSesionStripe from "../../../utils/stripe/getSesionStripe";
import Stripe from "stripe";

export default async function Page({ searchParams }: { searchParams: { session_id: string } }) {
  const session_id = searchParams.session_id;

  // Obtener los detalles de la sesión de Stripe
  const session : Stripe.Response<Stripe.Checkout.Session> | null = await getSesionStripe(session_id);


  if (!session || session.payment_status !== "paid") {
    return <div>Pago fallido o no completado.</div>;
  }


  const sessionStripe = {
    id: session.id,
    estado: session.status?.toString() || null,
    totalSession: session.amount_total,
    moneda: session.currency,
    estadoPago: session.payment_status.toString()|| null,
    metodoPago: session.payment_method_types,
  }

  return (
    <div>
      <DetallePedido 
      id={sessionStripe.id}
      estado={sessionStripe.estado}
      totalSession={sessionStripe.totalSession}
      moneda={sessionStripe.moneda}
      estadoPago={sessionStripe.estado}
      metodoPago={sessionStripe.metodoPago}
      />
      
    </div>
  );
}
