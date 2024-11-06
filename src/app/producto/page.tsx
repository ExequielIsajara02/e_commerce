import { authorizationPage } from "../../../utils/authorization";
import ProductForm from "./ProductForm";

const Page = async () => {
    await authorizationPage({ roles: ["admin", "editor"] });
    return (
        <div>
            <h1>Crear Producto</h1>
            <ProductForm />
        </div>
    );
};

export default Page;
