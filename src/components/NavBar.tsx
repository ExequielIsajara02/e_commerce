import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "./logout-button";

const NavBar = async () => {
  const session = await auth();
  console.log("Session en NavBar: ", session);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24">
      <h1>E-Commerce</h1>

      <ul className="flex gap-x-2 justify-center items-center py-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/compras">Mis Compras</Link>
        </li>
        <li>
          <Link href="/cuenta">Mi Cuenta</Link>
        </li>
        {!session?.user ? (
          <>
            <li className="bg-purple-600 rounded-md p-1">
              <Link href="/auth/login">Ingresá o registrate</Link>
            </li>
          </>
        ) : (
          <>
            {
              session?.user?.role === "admin" && (
                    <>
                    <li>
                      <Link href="/producto">Productos</Link>
                    </li>
                    <li>
                      <Link href="/combos">Combos</Link>
                    </li>
                <>
                  <li>
                    <Link href="/dashboard/pedidos">Dashboard</Link>
                  </li>
                    </>
                  <li>
                    <Link href="/pedidosAdmin">Pedidos</Link>
                  </li>
                </>
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
