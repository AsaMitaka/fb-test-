import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(404).end();
  }
  try {
    const { userId } = req.query;
    const { currentUser } = await serverAuth(req, res);

    if (req.method === 'POST') {
      const { body } = req.body;

      const post = await prismadb.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === 'GET') {
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
    }
  } catch (error) {
    console.warn(error);
  }
}
