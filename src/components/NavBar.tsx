import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "./logout-button";

const NavBar = async () => {
  const session = await auth();
  console.log(session);

  return (
    <nav className="flex justify-between bg-gray-950 text-white px-24">
      <h1>E-Commerce</h1>

      <ul className="flex gap-x-2 justify-center items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/producto">Productos</Link>
        </li>
        <li>
          <Link href="/combos">Combos</Link>
        </li>
        <li>
          <Link href="/compras">Mis Compras</Link>
        </li>
        {!session?.user ? (
            <>
                <li>
                    <Link href="/auth/login">Login</Link>
                </li>
                <li>
                    <Link href="/registro">Register</Link>
                </li>
            </>
        ) : (
            <>
                {
                  session?.user?.role === "admin" && (
                    <li>
                      <Link href="/dashboard">Dashboard</Link>
                    </li>
                  )
                }
                <li>
                  <LogoutButton />
                </li>
            </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
