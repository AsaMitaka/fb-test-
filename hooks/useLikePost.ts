import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import useCurrent from './useCurrent';
import usePost from './usePost';
import usePosts from './usePosts';
import useLoginModal from './useLoginModal';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrent();
  const { data: fetchPost, mutate: mutateFetchPost } = usePost(postId);
  const { mutate: mutateFetchPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLike = useMemo(() => {
    const like = fetchPost?.likesId || [];

    return like.includes(currentUser?.id);
  }, [currentUser?.id, fetchPost?.likesId]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLike) {
        request = () => axios.delete('/api/likePost/', { data: { postId } });
      } else {
        request = () => axios.post('/api/likePost', { postId });
      }

      await request();
      mutateFetchPost();
      mutateFetchPosts();

      toast.success('Success');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLike, loginModal, mutateFetchPost, mutateFetchPosts, postId]);

  return { hasLike, toggleLike };
};

export default useLike;
