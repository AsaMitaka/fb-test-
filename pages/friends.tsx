import { ClipLoader } from 'react-spinners';
import Header from '@/components/ui/header';
import useCurrent from '@/hooks/useCurrent';
import FriendItem from '@/components/friend/friendItem';

const Friends = () => {
  const { data: fetchCurrentUser, isLoading } = useCurrent();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Friend" showBackArrow />
      <div className="flex flex-col gap-1">
        <h1 className="text-black text-xl">Friends List</h1>
        {fetchCurrentUser?.followingIds.length > 0 ? (
          fetchCurrentUser?.followingIds.map((followId: string) => (
            <FriendItem userId={followId} key={followId} />
          ))
        ) : (
          <p className="text-black text-xl">Friends count: 0</p>
        )}
      </div>
    </>
  );
};

export default Friends;
