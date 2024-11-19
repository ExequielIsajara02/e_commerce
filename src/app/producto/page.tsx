import { auth } from "@/auth";
import { obtenerProductos } from "../../../utils/producto";
import ProductForm from "./ProductForm";

const Page = async () => {
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
            <ProductForm
                productos={productos}
            />
        </div>
    );
};

export default Page;
