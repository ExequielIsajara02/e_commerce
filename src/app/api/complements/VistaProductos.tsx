"use client"
import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import React, { useEffect, useState } from 'react'

const VistaProductos = () => {

    const [productos, setProductos] = useState([])

    const traerProductos = async () => {
        const respuesta = await fetch("http://localhost:3000/api/producto")
        const datos = await respuesta.json()
        setProductos(datos)
        console.log(datos);
        
        return datos
    }

    useEffect(() => {
        traerProductos()
    }, [])
  return (
    <>
        {productos.map((producto) => {

            return (
                <div className="grid grid-cols-4">
                {productos.map((producto: { id: number, nombre: string, descripcion: string, precio: number }) => (
  <div className="border-black border rounded-lg m-4" key={producto.id}>
    <p className="mb-1 mx-4 my-1">{producto.nombre}</p>
    <p className="mb-1 mx-4 my-1">{producto.descripcion}</p>
    <p className="mb-1 mx-4 my-1">${producto.precio}</p>
    <button className="bg-blue-500 p-1 rounded-lg text-white border border-black">Agregar al carrito</button>
                  </div>
                ))}
              </div>
            )
        })}
    </>
  )
}

export default VistaProductos