import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('You must be logged in to access this page');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('No user found');
  }

  return { currentUser };
};

export default serverAuth;
