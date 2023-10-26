import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { commentId } = req.query;

    if (!commentId || typeof commentId !== 'string') {
      throw new Error(`Invalid commentId`);
    }

    if (req.method === 'GET') {
      const comment = await prismadb.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      return res.status(200).json(comment);
    }

    if (req.method === 'DELETE') {
      const comment = await prismadb.comment.delete({
        where: {
          id: commentId,
        },
      });

      return res.status(200).json(comment);
    }
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
