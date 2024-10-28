"use client"
import { ProductoData } from "../../../types/ProductData";
import { authorizationRole } from "../../../utils/authorization";
import { getAllProductos } from "../../../utils/producto";
import VistaProductos from "./VistaProductos";
import { useRouter } from "next/navigation";

const Page = () => {
    /*const authorize = authorizationRole({ roles: ['admin', 'editor'] })
    const router = useRouter();

    if(!authorize){
        alert("You are not authorized");
        router.push("/auth/login");
    }*/

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

