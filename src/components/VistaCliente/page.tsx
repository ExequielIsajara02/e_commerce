// Page.tsx
import React from 'react';
import ClientDashboard from './ClientDashboard';
import { auth } from '@/auth';

interface Props {
  userId: number;
}

const Page: React.FC<Props> = ({ userId }) => {
  return <ClientDashboard userId={userId} />;
};

// getServerSideProps para obtener el userId del cliente logueado
export async function getServerSideProps(context: any) {
  try {
  const  = await auth();

    // Verifica que la sesión y el usuario existan y tengan el campo id_usuario
    if (!session || !.user || typeof session.user.id_usuario === 'client') {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    const userId = session.user.id_usuario;

    return {
      props: { userId },
    };
  } catch (error) {
    console.error('Error al obtener la sesión del usuario:', error);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
}

export default Page;
