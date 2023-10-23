import useUser from '@/hooks/useUser';
import Avatar from '../user/avatar';
import { ClipLoader } from 'react-spinners';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface FriendItemProps {
  userId: string;
}

const FriendItem: React.FC<FriendItemProps> = ({ userId }) => {
  const { data: fetchCurrentUser, isLoading } = useUser(userId);
  const router = useRouter();
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
    <div className="flex flex-row items-center" onClick={goToUser}>
      <Avatar hasBorder userId={userId} />
      <div className="flex flex-col">
        <p className="text-black text-xl cursor-pointer hover:underline">
          {fetchCurrentUser?.nickname}
        </p>
        <p className="text-neutral-800 text-sm cursor-pointer">@{fetchCurrentUser?.username}</p>
      </div>
    </div>
  );
};

export default FriendItem;
