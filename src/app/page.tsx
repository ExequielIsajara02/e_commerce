import { auth } from "@/auth";
import {obtenerProductos } from "../../utils/producto";
import VistaProductos from "@/components/VistaProductos";
import { Slider } from "@/components/Slider";

const Home = async () => {
  const session = await auth();
  const response = await obtenerProductos();
  
  const productos = Array.isArray(response)
      ? response.map((producto: any) => ({
          id_producto: producto.id_producto,
          nombre: producto.nombre || "",          
          descripcion: producto.descripcion || "",
          imagen: producto.imagen || "",
          precio: producto.precio || 0,
          cantidad: producto.cantidad || 0,
          marca: producto.marca || "",
          tipo: producto.tipo || "",
      }))
      : [];

  return (
      <div>
        <Slider/>
        <h2>Mostrar Productos</h2>
        <VistaProductos 
            productos={productos}
          />
      </div>
  );
}

export default Home;
