"use client";
import React from 'react'

const UsuarioForm = () => {
    const onSubmit = async (e: any) =>{
      e.preventDefault()
        const nombre = e.target.nombre.value
        const apellido = e.target.apellido.value
        const correo = e.target.correo.value
        const telefono = e.target.telefono.value
        const direccion = e.target.direccion.value
        const localidad = e.target.localidad.value


        const bodyReq = {
          nombre : e.target.nombre.value,
          apellido : e.target.apellido.value,
          correo : e.target.correo.value,
          telefono : e.target.telefono.value,
          direccion : e.target.direccion.valueww
        }

      const res = await fetch('/api/usuario', {
        method: 'POST',
        body: JSON.stringify({nombre, apellido, correo, telefono, direccion, localidad }),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json()
      // console.log(data)

      const correoRes = await fetch('/api/enviarMail', {
        method: 'POST',
        body: JSON.stringify({ bodyReq }),
        headers: {
            'Content-Type': 'application/json',
        },
      });

    }
  return (
    <div className='h-screen flex justify-center items-center'>
        <form className='bg-slate-800 p-10 w-2/4'
        onSubmit={onSubmit}
        >
            <input type="text" placeholder='Nombre' id='nombre'
            className='border border-gray-400 mb-4 w-full text-black'
            />
            <input type="text" placeholder='Apellido' id='apellido'
            className='border border-gray-400 mb-4 w-full text-black'
            />
            <input type="text" placeholder='Correo' id='correo'
            className='border border-gray-400 mb-4 w-full text-black'
            />
            <input type="text" placeholder='Teléfono' id='telefono'
            className='border border-gray-400 mb-4 w-full text-black'
            />
            <input type="text" placeholder='Dirección' id='direccion'
            className='border border-gray-400 mb-4 w-full text-black'
            />
            <input type="text" placeholder='Localidad' id='localidad'
            className='border border-gray-400 mb-4 w-full text-black'
            />
            
            <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >Crear</button>
        </form>
    </div>
  )
}

export default UsuarioForm


