
import { auth } from '@/auth'
import LogoutButton from '@/components/logout-button'
import { authorizationRole } from '../../../utils/authorization';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

const AdminPage = async () => {

  // const session = await getServerSession()
  /* if(session?.user?.role !== "admin"){
    return <div>You are not admin</div>
  } */

  const authorize = await authorizationRole({ roles: ['admin', 'editor'] })
  // const router = useRouter();

  if(!authorize){
    console.log("You are not authorized");
    console.log(authorize);
    redirect("/auth/login")
    // router.push("/auth/login");
  }
  else {
    console.log("You are authorized");
    console.log(authorize);
  }

  // console.log(authorize)

  return (
    <div>
      <h1>Welcome Admin</h1>
    </div>
  )
}

export default AdminPage

