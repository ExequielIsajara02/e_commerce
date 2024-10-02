import { handlers } from "@/auth";
export const { GET, POST } = handlers

/* const usuario = await prisma.usuario.findUnique({
  where: {
    correo: credentials.email, 
  }
});
if(!usuario) { return null }
const matchPassword = await bcrypt.compare(credentials.password, usuario.clave);
if(!matchPassword) { return null }
console.log(usuario); 

const handler = NextAuth(authOptions); */
