"use server"
import { loginSchema } from "@/libs/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";

export const loginAction = async(
    values: z.infer<typeof loginSchema>
) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
    } catch(error) {
        console.log(error);
    }
}