import React from 'react'
import MetricasProductos from './MetricasProductos';
import { ProductoData } from '@/app/types/types';
import { getAllProductos } from '../../../../utils/producto';

const Page = async () => {

    const calcularPromedio = (totalPrecio: number, cantidadProducto: number) => {
        return totalPrecio / cantidadProducto;
      };

    const arrayProductos: ProductoData[] = await getAllProductos();
  
  const sumaPrecioArray = arrayProductos.reduce((precioFinal, element) => {
    return precioFinal + element.precio;
  }, 0);
  
  
  const dataProducto = {
    totalProductos: arrayProductos.length,
    totalIngresos: sumaPrecioArray,
    valorPromedioProducto: calcularPromedio(sumaPrecioArray, arrayProductos.length),
  };
  return (
    <div><MetricasProductos data={dataProducto}></MetricasProductos></div>
  )
}

export default Page;