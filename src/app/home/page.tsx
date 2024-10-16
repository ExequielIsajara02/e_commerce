import { ProductoData } from "../../../types/ProductData";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";

const Page = async () => {
    const productos : ProductoData[] = await getAllProductos();

    return (
        <div>
            <h2>Mostrar productos</h2>
            <VistaProductos />
        </div>
    );
};

export default Page;
