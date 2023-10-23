import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Avatar from '../user/avatar';

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();

      router.push(`/user/${data.user.id}`);
    },
    [router, data.user.id],
  );

  return (
    <div className="border-b-[1px] border-neutral-500 px-4 py-2">
      <div className="flex flex-row items-center gap-3">
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
          <div className="mt-1 text-black text-xl">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
