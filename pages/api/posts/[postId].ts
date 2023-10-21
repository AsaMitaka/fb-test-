import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';
import serverAuth from '@/libs/serverAuth';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (
    req.method !== 'GET' &&
    req.method !== 'DELETE' &&
    req.method !== 'PATCH' &&
    req.method !== 'POST'
  ) {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid postId');
    }

    let post;
    if (req.method === 'GET') {
      post = await prismadb.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
    }

    if (req.method === 'POST') {
      const { body } = req.body;

      post = await prismadb.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });
    }

    if (req.method === 'DELETE') {
      const comments = await prismadb.comments.delete({
        where: {
          id: postId,
        },
      });

      post = await prismadb.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json({ ...comments, ...post });
    }

    if (req.method === 'PATCH') {
      const { body } = req.body;

      post = await prismadb.post.update({
        where: {
          id: postId,
        },
        data: {
          body,
        },
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
