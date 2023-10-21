import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/libs/serverAuth';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { userId } = req.body;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid userId');
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let followingsUserId = [...(user.followingIds || [])];

    if (req.method === 'POST') {
      followingsUserId.push(currentUser.id);
    }

    if (req.method === 'DELETE') {
      followingsUserId = followingsUserId.filter((followingId) => followingId !== currentUser.id);
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        followingIds: followingsUserId,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
