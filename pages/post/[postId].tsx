import PostItem from '@/components/post/postitem';
import Header from '@/components/ui/header';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (!fetchedPost || isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={`Post ${postId}`} showBackArrow />
      <h1 className="text-black text-xl">Post: {postId}</h1>
      <PostItem data={fetchedPost} userId={fetchedPost?.user?.id} />
    </>
  );
};

export default Post;
