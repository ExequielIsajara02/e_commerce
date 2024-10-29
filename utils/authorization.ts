import { auth } from "@/auth"

interface AuthorizationProps {
    roles: string[];
}

export const authorizationPage = async ({roles}: AuthorizationProps) => {

    const session = await auth();
    const roleUser =  session?.user?.role;
    

    if (!roleUser || !roles.includes(roleUser)) {
        return false;
    }

    return true;


} 