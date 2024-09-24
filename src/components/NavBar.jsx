import Link from "next/link";
// import { getServerSession } from "next-auth@4";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const NavBar = async () => {
  // const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <nav className="flex justify-between bg-gray-950 text-white px-24">
      <h1>E-Commerce</h1>

      {/* <ul className="flex gap-x-2">
        <li>
          <Link href="/">Home</Link>
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
                <li>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link href="/api/auth/signout">Logout</Link>
                </li>
            </>
        )}
      </ul>*/}
    </nav>
  );
};

export default NavBar;
