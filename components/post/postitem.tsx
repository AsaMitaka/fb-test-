import { useRouter } from 'next/router';
import { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../user/avatar';
import useCurrent from '@/hooks/useCurrent';
import usePostModal from '@/hooks/usePostModal';
import usePosts from '@/hooks/usePosts';
import useLoginModal from '@/hooks/useLoginModal';
import useLikePost from '@/hooks/useLikePost';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();

  const { data: currentUser } = useCurrent();
  const { mutate: mutatePosts } = usePosts(userId);
  const { hasLike, toggleLike } = useLikePost({ postId: data.id, userId });

  const postModal = usePostModal();
  const loginModal = useLoginModal();

  const handleUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/user/${data.user.id}`);
    },
    [data.user.id, router],
  );

  const handlePost = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/posts/${data.id}`);
    },
    [data.id, router],
  );

  const handlePostModal = useCallback(
    (e: any) => {
      e.stopPropagation();

      if (postModal.isOpen && postModal.currentModalId === data.id) {
        postModal.onClose();
      } else {
        postModal.setCurrentModalId(`${data.id}`);
        postModal.onOpen();
      }
    },
    [postModal, data.id],
  );

  const handleDeletePost = useCallback(async () => {
    try {
      await axios.delete(`/api/posts/${data.id}`);
      mutatePosts();

      toast.success('Successfully deleted');
    } catch (error) {
      console.warn(error);
      toast.error('Error deleting post');
    }
  }, [data.id, mutatePosts]);

  const handleLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [currentUser, loginModal, toggleLike],
  );

  const LikeIcon = hasLike ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={handlePost}
      className="border-b-[1px] border-neutral-800 flex flex-col gap-1 relative cursor-pointer">
      <div className="flex flex-row gap-3 px-2 py-3">
        <Avatar userId={data.user.id} />
        <div className="flex flex-col ">
          <p className="text-black hover:underline" onClick={handleUser}>
            {data.user.name}
          </p>
          <p className="text-neutral-800 hover:underline" onClick={handleUser}>
            {data.user.username}
          </p>
          <div className="flex flex-col">
            <div className="text-black text-xl px-4 py-2">{data.body}</div>
            <div className="flex flex-row items-center gap-4 px-4 py-1 ">
              <span
                className="flex gap-1 text-black cursor-pointer hover:text-sky-500"
                onClick={handleLike}>
                {data.likesId.length} <LikeIcon color={hasLike ? 'blue' : ''} size={24} />
              </span>
              <span className="flex gap-1 text-black">
                {data.comments.length} <BiComment color="black" size={24} />
              </span>
            </div>
          </div>
        </div>
        <>
          {data.user.id === currentUser.id && (
            <div
              className="flex absolute top-0 right-2 justify-start text-black text-2xl cursor-pointer hover:opacity-70"
              onClick={handlePostModal}>
              {postModal.isOpen && postModal.currentModalId === data.id && (
                <div className="flex flex-col px-2 py-1 border-2 border-black z-50 relative">
                  <p className="text-black text-lg cursor-pointer hover:underline">Edit</p>
                  <p
                    className="text-black text-lg cursor-pointer hover:underline"
                    onClick={handleDeletePost}>
                    Delete
                  </p>
                </div>
              )}
              ...
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default PostItem;
