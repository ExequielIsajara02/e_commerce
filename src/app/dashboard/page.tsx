import { prisma } from "@/lib/prisma";
import { ProductType } from "../../../types/ProductData";
import { getAllProductos } from "../../../utils/producto";

const Page = async () => {
      /**----------------Funciones que se utilizaran en ambos casos------------------------------------------------ */
  const calcularPromedio = (totalPrecio: number, cantidadProducto: number) => {
    return totalPrecio / cantidadProducto;
  };



  /** -------------------------Data Productos------------------------------------------------------------------ */
  
  
  const arrayProductos = await getAllProductos();
  
  const sumaPrecioArray = arrayProductos.reduce((precioFinal: any, element : any) => {
    return precioFinal + element.precio;
  }, 0);
  
  
  const dataProducto = {
    totalProductos: arrayProductos.length,
    totalIngresos: sumaPrecioArray,
    valorPromedioProducto: calcularPromedio(sumaPrecioArray, arrayProductos.length),
  };
  
  /** -------------------------Data Productos------------------------------------------------------------------ */

  const PedidosDb = await prisma.pedido.findMany();
  console.log(PedidosDb);

  const totalPedidos = PedidosDb.length;

  const sumaTotalPedidos = PedidosDb.reduce((total, pedido) => totalPedidos, 0);
  const dataPedido = {
    totalPedidos: totalPedidos,
    totalIngresos: sumaTotalPedidos,
    valorPromedioPedido: calcularPromedio(sumaTotalPedidos, totalPedidos),
  };

    return(
        <div>
  
        <h1 className="text-black w-1/2 border-2 border-red-900 mx-auto text-center mt-3 font-bold rounded-md ">selecciona la metrica que quieras vizualizar </h1>
        </div>    )
}

export default Page;