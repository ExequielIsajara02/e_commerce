import { auth } from "@/auth";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";
import { ProductoData } from "../../../types/ProductData";

const Page = async () => {
    const session = await auth();
    const response = await getAllProductos();
    
    // Verifica si la respuesta es un array antes de mapear
    const productos = Array.isArray(response)
        ? response.map((producto: any) => ({
            id_producto: producto.id_producto,
            nombre: producto.nombre || "",           // Asignar cadena vacía si es null
            descripcion: producto.descripcion || "",  // Asignar cadena vacía si es null
            imagen: producto.imagen || "",
            precio: producto.precio || 0,
            cantidad: producto.cantidad || 0,
            marca: producto.marca || "",
            tipo: producto.tipo || "",
        }))
        : []; // Si no es un array, inicializa productos como un array vacío

    return (
        <div>
            <h2>Mostrar Productos</h2>
            <VistaProductos 
                productos={productos}
            />
        </div>
    );
};

export default Page;
