import { Header } from "@/components/Header";
import VistaProductos from "./VistaProductos";
import { getAllProductos } from "../../../utils/producto";
import { ProductType } from "@/types/ProductType";
import { ProductoData } from "@/types/types";


const Page = async () => {
    const productos : ProductoData[] = await getAllProductos();
    return (
        <div>
            <h2>Mostrar Productos</h2>
            <VistaProductos productos={productos}/>
        </div>
    );
};

export default Page;
