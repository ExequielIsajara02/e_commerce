import { auth } from "@/auth"
import { redirect } from "next/navigation";

interface AuthorizationProps {
    roles: string[];
}

export const authorizationPage = async ({roles}: AuthorizationProps) => {

    const  = await auth();
    const roleUser =  ?.user?.role;

    if (!roleUser || !roles.includes(roleUser)) {
        redirect("/auth/login")
    }
}



