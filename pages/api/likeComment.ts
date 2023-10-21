import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { commentId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!commentId || typeof commentId !== 'string') {
      throw new Error('Invalid commentId');
    }

    const comment = await prismadb.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new Error('Invalid commentId');
    }

    let updateLikesId = [...(comment.likesId || [])];

    if (req.method === 'POST') {
      updateLikesId.push(currentUser.id);
    }

    if (req.method === 'DELETE') {
      updateLikesId = updateLikesId.filter((likedId) => likedId !== currentUser.id);
    }

    const updatedComment = await prismadb.comment.update({
      where: {
        id: commentId,
      },
      data: {
        likesId: updateLikesId,
      },
    });

    return res.status(200).json(updatedComment);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
