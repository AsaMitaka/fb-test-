import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;

    let post;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid postId');
    }

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

    if (req.method === 'DELETE') {
      post = await prismadb.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return res.status(404).json({ message: 'Post not exist' });
      }

      const comments = await prismadb.comment.findMany({
        where: {
          id: postId,
        },
      });

      if (comments.length > 0) {
        await prismadb.comment.delete({
          where: {
            id: postId,
          },
        });
      }

      await prismadb.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json({ message: 'Deleted' });
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
