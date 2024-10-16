import { Header } from "@/components/Header";
import VistaProductos from "./VistaProductos";
import { auth } from "@/auth";


const Page = async () => {

    const session = await auth();

    if(session?.user === null) {
        return null;
    }

    return (
        <div>
            <h2>Mostrar productos</h2>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <VistaProductos />
        </div>
    );
};

export default Page;
