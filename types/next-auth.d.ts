import { Default } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface  {
    user: {
      id?: string;
      role?: string;
    } & Default["user"];
  }

  interface User {
    id?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}