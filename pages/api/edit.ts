import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/libs/serverAuth';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { nickname, bio, profileImage } = req.body;

    const updateUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        bio,
        nickname,
        profileImage,
      },
    });

    return res.status(200).json(updateUser);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
