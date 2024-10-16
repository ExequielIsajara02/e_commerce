
"use client"
import React, { useEffect, useState } from 'react'
import { ButtonAddToCarrito } from "@/components/ButtonAddToCarrito"
import { ProductoData } from '../types/types'

const VistaProductos = () => {

    const [productos, setProductos] = useState([])

    const traerProductos = async () => {
        const respuesta = await fetch("http://localhost:3000/api/producto")
        const datos = await respuesta.json()
        setProductos(datos)
        
        return datos
    }

    useEffect(() => {
        traerProductos()
    }, [])
  return (

                <div className="grid grid-cols-4">
                {productos.map((producto: ProductoData) => (
                  <div className="border-black border rounded-lg m-4" key={producto.id_producto}>
                    <p>ID: {producto.id_producto}</p>
                    <p className="mb-1 mx-4 my-1">{producto.nombre}</p>
                    <p className="mb-1 mx-4 my-1">{producto.descripcion}</p>
                    <p className="mb-1 mx-4 my-1">${producto.precio}</p>
                    <ButtonAddToCarrito {...producto} />
                  </div>
                ))}
              </div>
          )
}

export default VistaProductos
