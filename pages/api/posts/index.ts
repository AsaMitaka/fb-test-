import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(404).end();
  }
  try {
    const { userId } = req.query;

    let posts;
    if (userId && typeof userId === 'string') {
      posts = await prismadb.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      posts = await prismadb.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.warn(error);
  }
}
