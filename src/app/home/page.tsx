import { ProductoData } from "../../../types/ProductData";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";
import { getAllCharges } from "../../../utils/stripe/get-all-charges";
import { postCharges } from "../../../utils/stripe/postCharges";


// const Page = async () => {

//     const charges : any= await getAllCharges();
    // console.log("-----------------------------------------------------");
    // console.log("Modelo charges", charges[0]);
    // const token = await postCharges()

const Page = async () => {
    const productos : ProductoData[] = await getAllProductos();

    return (
        <div>
            <h2>Mostrar productos</h2>
            <VistaProductos/>
        </div>
    );
};

export default Page;