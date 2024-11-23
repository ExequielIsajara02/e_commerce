import { authorizationPage } from "../../../utils/authorization";
import AdminCombos from "./CrearCombos";
import { obtenerProductos } from "../../../utils/producto";

const Page = async () => {
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
            <h1>Crear Combos</h1>
            <AdminCombos/>
        </div>
    )
}

export default Page