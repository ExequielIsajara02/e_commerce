import { Header } from "@/components/Header";
// import { useRouter } from "next/navigation";
import VistaProductos from "./VistaProductos";
import { auth } from "@/auth";


const Page = async () => {

    const session = await auth();
    // const router = useRouter();

    /*if(session?.user === null) {
        return null;
    } */

    // console.log(session);

    // Crear un array de string con los roles


    return (
        <div>
            <h2>Mostrar productos</h2>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
            <VistaProductos />
        </div>
    );
};

export default Page;
