import { ProductoData } from "../../../types/ProductData";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";

const Page = async () => {
    authorization(["Dev"])
    const productos : ProductoData[] = await getAllProductos();

    return (
        <div>
            <h2>Mostrar productos</h2>
            <VistaProductos />
        </div>
    );
};

export default Page;
function authorization(arg0: string[]) {
    throw new Error("Function not implemented.");
}

