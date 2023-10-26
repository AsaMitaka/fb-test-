import useUser from '@/hooks/useUser';
import Avatar from '../user/avatar';
import { ClipLoader } from 'react-spinners';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface FriendItemProps {
  userId: string;
}

const FriendItem: React.FC<FriendItemProps> = ({ userId }) => {
  const router = useRouter();
  const { data: fetchCurrentUser, isLoading } = useUser(userId);

  const goToUser = useCallback(() => {
    router.push(`/user/${fetchCurrentUser?.id}`);
  }, [fetchCurrentUser?.id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <div className=" group">
      <div
        className="w-full px-2 py-3 flex flex-row items-center gap-3 border-b-[1px] border-neutral-500 cursor-pointer group-hover:bg-neutral-200"
        onClick={goToUser}>
        <Avatar hasBorder userId={userId} />
        <div className="flex flex-col">
          <p className="text-black text-xl cursor-pointer group-hover:underline">
            {fetchCurrentUser?.nickname}
          </p>
          <p className="text-neutral-800 text-sm cursor-pointer">@{fetchCurrentUser?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
