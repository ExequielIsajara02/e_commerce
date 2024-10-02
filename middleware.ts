import NextAuth from "next-auth"
import authConfig from "./src/auth.config"
import { NextResponse } from "next/server"

export const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = [
  "/auth/login",
  "/registro",
  "/error"
];

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}