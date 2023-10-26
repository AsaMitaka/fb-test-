import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/libs/serverAuth';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(400).end();
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

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

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === 'POST') {
      updatedFollowingIds.push(userId);
    }

    if (req.method === 'DELETE') {
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.warn(error);
    return res.status(405).end();
  }
}
