import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return res.status(405).end();
  }

  try {
    const { username, nickname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        username,
        nickname,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
