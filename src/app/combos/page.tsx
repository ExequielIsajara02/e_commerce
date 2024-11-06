import { authorizationPage } from "../../../utils/authorization";
import AdminCombos from "./CrearCombos";

const Page = async () => {
    await authorizationPage({ roles: ["admin", "editor"] });
    return (
        <div>
            <h1>Crear Combos</h1>
            <AdminCombos/>
        </div>
    )
}

export default Page