import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Avatar from '../user/avatar';
import useCurrent from '@/hooks/useCurrent';

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data = {} }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: currentUser } = useCurrent();

  const handleUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/user/${data.user.id}`);
    },
    [router, data.user.id],
  );

  const handlePost = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/posts/${data.id}`);
    },
    [data.id, router],
  );

  const handlePostModal = useCallback((e: any) => {
    e.stopPropagation();

    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      onClick={handlePost}
      className="border-b-[1px] border-neutral-800 flex flex-col gap-1 relative cursor-pointer">
      <div className="flex flex-row items gap-3 px-2 py-3">
        <Avatar userId={data.user.id} />
        <div className="flex flex-col ">
          <p className="text-black hover:underline" onClick={handleUser}>
            {data.user.name}
          </p>
          <p className="text-neutral-800 hover:underline" onClick={handleUser}>
            {data.user.username}
          </p>
          <div className="text-black text-xl px-4 py-2">{data.body}</div>
        </div>
        <>
          {data.user.id === currentUser.id && (
            <div
              className="flex absolute top-0 right-2 justify-start text-black text-2xl cursor-pointer hover:opacity-70"
              onClick={handlePostModal}>
              {isOpen && (
                <div className="flex flex-col px-2 py-1 border-2 border-black z-50 relative">
                  <p className="text-black text-lg cursor-pointer hover:underline">Edit</p>
                  <p className="text-black text-lg cursor-pointer hover:underline">Delete</p>
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
