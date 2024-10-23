import { auth } from "@/auth";
import router from "next/router";

const authorization = async (roles : string[]) => {
    const session = await auth();
    const roleUser =  session?.user?.role;
    if(roleUser){
        if(!roles.includes(roleUser)){
            router.push("/auth/login")
        }
    }
}


