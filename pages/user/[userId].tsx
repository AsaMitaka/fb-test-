import PostFeed from '@/components/post/postfeed';
import Header from '@/components/ui/header';
import UserBio from '@/components/user/userbio';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedCurrentUser, isLoading } = useUser(userId as string);
  console.log(userId, fetchedCurrentUser);

  if (isLoading || !fetchedCurrentUser) {
    return (
      <div className="flex flex-col justify-center items-center">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={`${fetchedCurrentUser?.username}`} showBackArrow />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default User;
