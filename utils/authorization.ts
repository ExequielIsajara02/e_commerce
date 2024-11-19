import { auth } from "@/auth"
import { redirect } from "next/navigation";

interface AuthorizationProps {
    roles: string[];
}

export const authorizationPage = async ({roles}: AuthorizationProps) => {

    const usuario  = await auth();
    const roleUser =  usuario?.user?.role

    if (!roleUser || !roles.includes(roleUser)) {
        redirect("/auth/login")
    }
}



