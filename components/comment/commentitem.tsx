import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Avatar from '../user/avatar';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useLikeComment from '@/hooks/useLikeComment';
import useCurrent from '@/hooks/useCurrent';
import useLoginModal from '@/hooks/useLoginModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import usePost from '@/hooks/usePost';
import useCommentModal from '@/hooks/useCommentModal';

interface CommentItemProps {
  data: Record<string, any>;
  postId: string;
  userId?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ data, postId, userId }) => {
  const router = useRouter();

  const { data: currentUser } = useCurrent();
  const { mutate: mutateFetchPost } = usePost(postId);
  const { hasLike, toggleLike } = useLikeComment({ commentId: data.id, postId, userId });

  const loginModal = useLoginModal();
  const commentModal = useCommentModal();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/user/${data.user.id}`);
    },
    [router, data.user.id],
  );

  const LikeIcon = hasLike ? AiFillHeart : AiOutlineHeart;
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

  const handleDeleteComment = useCallback(
    async (event: any) => {
      event.stopPropagation();

      try {
        await axios.delete(`/api/comment/${data.id}`);

        mutateFetchPost();
        toast.success('Comment deleted');
      } catch (error) {
        console.warn(error);
        toast.error('Something went wrong');
      }
    },
    [data.id, mutateFetchPost],
  );

  const handleCommentModal = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (commentModal.isOpen) {
        commentModal.onClose();
      } else {
        commentModal.setCurrentModalId(`${data.id}`);
        commentModal.onOpen();
      }
    },
    [commentModal, data.id],
  );

  return (
    <div className="border-b-[1px] border-neutral-500 px-4 py-2">
      <div className="flex flex-row items-center gap-3 relative">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-black font-semibold cursor-pointer hover:underline"
              onClick={goToUser}>
              {data.user.username}
            </p>
            <span className="text-neutral-500 cursor-pointer">@{data.user.nickname}</span>
          </div>
          <div className="flex flex-col">
            <div className="mt-1 text-black text-xl">{data.body}</div>
            <div className="flex flex-row items-center gap-4 px-4 py-1 ">
              <span
                className="flex gap-1 text-black cursor-pointer hover:text-sky-500"
                onClick={handleLike}>
                {data.likesId.length} <LikeIcon color={hasLike ? 'blue' : ''} size={24} />
              </span>
            </div>
          </div>
        </div>
        {data.user.id === currentUser.id && (
          <div
            className="flex absolute top-0 right-2 justify-start text-black text-2xl cursor-pointer hover:opacity-70"
            onClick={handleCommentModal}>
            {commentModal.isOpen && (
              <div className="flex flex-col px-2 py-1 border-2 border-black z-50 relative">
                <p
                  className="text-black text-lg cursor-pointer hover:underline"
                  onClick={handleDeleteComment}>
                  Delete
                </p>
              </div>
            )}
            ...
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
