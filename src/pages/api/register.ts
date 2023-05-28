import { hash } from 'bcrypt';
import prismadb from '../../../lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: null,
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
