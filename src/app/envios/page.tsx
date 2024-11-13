"use client"
import React from 'react'
import { cotizacion } from '../../../utils/metodosDeEnvio';
import type {NextApiResponse } from 'next';

const pageEnvio =  () => {
  const enviar = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "3660937cea96f5e98cd92fcb57e20e884a3185f08b1f73f69e9054fa7c5eb09d");

    var requestData = JSON.stringify({
        "origin": {
          "name": "USA",
          "company": "enviacommarcelo",
          "email": "juanpedrovazez@hotmail.com",
          "phone": "8182000536",
          "street": "351523",
          "number": "crescent ave",
          "district": "other",
          "city": "dallas",
          "state": "tx",
          "country": "US",
          "postalCode": "75205",
          "reference": "",
          "coordinates": {
            "latitude": "32.776272",
            "longitude": "-96.796856"
          }
        },
        "destination": {
          "name": "francisco",
          "company": "",
          "email": "",
          "phone": "8180180543",
          "street": "4th street",
          "number": "24",
          "district": "other",
          "city": "reno",
          "state": "nv",
          "country": "US",
          "postalCode": "89503",
          "reference": "",
          "coordinates": {
            "latitude": "39.512132",
            "longitude": "-119.906585"
          }
        },
        "packages": [
          {
            "content": "zapatos",
            "amount": 1,
            "type": "box",
            "weight": 1,
            "insurance": 0,
            "declaredValue": 0,
            "weightUnit": "LB",
            "lengthUnit": "IN",
            "dimensions": {
              "length": 11,
              "width": 15,
              "height": 20
            }
          }
        ],
        "shipment": {
          "carrier": "usps",
          "type": 1
        },
        "settings": {
          "currency": "USD"
        }
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '3660937cea96f5e98cd92fcb57e20e884a3185f08b1f73f69e9054fa7c5eb09d'
        },
        body: JSON.stringify(requestData)
    };

    try {
        // Hacer la solicitud HTTP POST a la API
    
            const res = await fetch('/api/cotizacion', requestOptions);

            // Esperar la respuesta
            const data = await res.json();
    
            if (res.ok) {
                console.log('Respuesta exitosa:', data);
            } else {
                console.error('Error en la solicitud:', data);
            }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
  }

  return (
    <div>
        <h1>Page Envio</h1>
        <button onClick={enviar}></button>
    </div>
  )
}

export default pageEnvio