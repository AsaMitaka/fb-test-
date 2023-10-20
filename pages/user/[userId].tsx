import PostFeed from '@/components/post/postfeed';
import Header from '@/components/ui/header';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={`User: ${userId}`} showBackArrow />
      <h1 className="text-black text-xl">User: {userId}</h1>
      <PostFeed userId={userId as string} />
    </>
  );
};

export default User;
