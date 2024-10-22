import { ProductoData } from "../../../types/ProductData";
import { getAllProductos } from "../../../utils/producto";
import { Header } from "@/components/Header";
// import { useRouter } from "next/navigation";
import VistaProductos from "./VistaProductos";
import { auth } from "@/auth";


const Page = async () => {

    const session = await auth();
    const productos : ProductoData[] = await getAllProductos();
    // const router = useRouter();

    /*if(session?.user === null) {
        return null;
    } */

    // console.log("Console Log Session:",session);

    // Crear un array de string con los roles





// const Page = async () => {

//     const charges : any= await getAllCharges();
    // console.log("-----------------------------------------------------");
    // console.log("Modelo charges", charges[0]);
    // const token = await postCharges()

// const Page = async () => {

    return (
        <div>
            <h2>Mostrar productos</h2>
            <VistaProductos/>
        </div>
    );
};

export default Page;