import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Avatar from '../user/avatar';

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data = {} }) => {
  const router = useRouter();

  const handleUser = useCallback(() => {
    router.push(`/user/${data.user.id}`);
  }, [router, data.user.id]);

  const handlePost = useCallback(() => {
    router.push(`/post/${data.id}`);
  }, [data.id, router]);

  return (
    <div
      onClick={handlePost}
      className="border-[1px] border-neutral-800 flex flex-col gap-1 cursor-pointer">
      <div className="flex flex-row items-center gap-3 px-2 py-3 border-b-[1px]">
        <Avatar userId={data.user.id} />
        <div className="flex flex-col ">
          <p className="text-black hover:underline" onClick={handleUser}>
            {data.user.name}
          </p>
          <p className="text-neutral-800 hover:underline" onClick={handleUser}>
            {data.user.username}
          </p>
        </div>
      </div>
      <div className="text-black text-xl">{data.body}</div>
    </div>
  );
};

export default PostItem;
