import { ClipLoader } from 'react-spinners';
import Header from '@/components/ui/header';
import useCurrent from '@/hooks/useCurrent';
import FriendItem from '@/components/friend/friendItem';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Friends = () => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useCurrent();

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

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
      <div className="flex flex-col">
        <h1 className="text-black text-xl border-b-[1px] border-neutral-500">Friends List</h1>
        {currentUser?.followingIds.length > 0 ? (
          currentUser?.followingIds.map((followId: string) => (
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
