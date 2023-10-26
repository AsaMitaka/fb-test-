import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import useCurrent from './useCurrent';
import useLoginModal from './useLoginModal';
import useComment from './useComment';
import usePost from './usePost';

const useLikeComment = ({
  commentId,
  postId,
  userId,
}: {
  commentId: string;
  postId: string;
  userId?: string;
}) => {
  const { data: currentUser } = useCurrent();
  const { data: fetchComment, mutate: mutateFetchComment } = useComment(commentId);
  const { mutate: mutateFetchPost } = usePost(postId);

  const loginModal = useLoginModal();

  const hasLike = useMemo(() => {
    const like = fetchComment?.likesId || [];

    return like.includes(currentUser?.id);
  }, [currentUser?.id, fetchComment?.likesId]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLike) {
        request = () => axios.delete('/api/likeComment/', { data: { commentId } });
      } else {
        request = () => axios.post('/api/likeComment', { commentId });
      }

      await request();
      mutateFetchComment();
      mutateFetchPost();

      toast.success('Success');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    }
  }, [commentId, currentUser, hasLike, loginModal, mutateFetchComment, mutateFetchPost]);

  return { hasLike, toggleLike };
};

export default useLikeComment;
