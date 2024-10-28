import { auth } from "@/auth";
import { ProductoData } from "@/types/types";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";

const Page = async () => {
    const session = await auth();
    const productos: ProductoData[] = await getAllProductos(); // No es necesario usar .json() aquí
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
