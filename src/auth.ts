import NextAuth from "next-auth"
import { db } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  session: { strategy: "jwt" },  
})