import { redirect } from "next/navigation"
import { authorizationPage } from "../../../utils/authorization"

const AdminPage = async () => {


  // const session = await getServerSession()
  const authorize = await authorizationPage({ roles: ["admin", "editor"] });
  if(!authorize){
    redirect("/auth/login")
  }

  // console.log(session)}

  return (
    <div>
      <h1>Welcome Admin</h1>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre>*/}
    </div>
  )
}

export default AdminPage

