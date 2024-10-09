import { Header } from "@/components/Header";
import VistaProductos from "./VistaProductos";
import { getAllCharges } from "../../../utils/stripe/get-all-charges";
import { postCharges } from "../../../utils/stripe/postCharges";


const Page = async () => {

    const charges : any= await getAllCharges();
    console.log("-----------------------------------------------------");
    console.log("Modelo charges", charges[0]);
    // const token = await postCharges()
    


    return (
        <div>
            <h2>Mostrar productos</h2>
            <VistaProductos/>
        </div>
    );
};

export default Page;
