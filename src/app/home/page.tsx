import { ProductoData } from "@/types/types";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";
import { ProductType } from "../../../types/ProductData";



const Page = async () => {
    const response = await getAllProductos();
    const productos: ProductoData[] = await response.json();
    return (
        <div>
            <h2>Mostrar Productos</h2>
            <VistaProductos productos={productos}/>
        </div>
    );
};

export default Page;
