import { auth } from "@/auth"
import LogoutButton from "@/components/logout-button"
 
export default async function DashboardPage() {
  const session = await auth();
  console.log("Session ", session);
  
 
  // if (!session) {
  //   return <div>No autenticado</div>
  // }
 
  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton/>
    </div>
  )
}