import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prisma';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid postId');
    }

    const post = await prismadb.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('Invalid postId');
    }

    let updateLikesId = [...(post.likesId || [])];

    if (req.method === 'POST') {
      updateLikesId.push(currentUser.id);
    }

    if (req.method === 'DELETE') {
      updateLikesId = updateLikesId.filter((likedId) => likedId !== currentUser.id);
    }

    const updatedPost = await prismadb.post.update({
      where: {
        id: postId,
      },
      data: {
        likesId: updateLikesId,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.warn(error);
    return res.status(400).end();
  }
}
