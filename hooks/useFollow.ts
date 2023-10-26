import { useCallback, useMemo } from 'react';
import useCurrent from './useCurrent';
import useUser from './useUser';
import useLoginModal from './useLoginModal';
import toast from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrent();
  const { mutate: mutateFetchUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchUser();

      toast.success('Successfully');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchUser, userId]);

  return { isFollowing, toggleFollow };
};

export default useFollow;
