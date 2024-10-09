import { auth } from '@/auth'
import LogoutButton from '@/components/logout-button'

const AdminPage = async () => {

  const session = await auth();

  // const session = await getServerSession()
  if(session?.user?.role !== "admin"){
    return <div>You are not admin</div>
  }

  // console.log(session)}

  return (
    <div>
      <h1>Welcome Admin</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogoutButton/>
    </div>
  )
}

export default AdminPage

