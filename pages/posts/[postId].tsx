import CommentFeed from '@/components/comment/commentfeed';
import Form from '@/components/form/form';
import PostItem from '@/components/post/postitem';
import Header from '@/components/ui/header';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);
  console.log(fetchedPost);

  if (!fetchedPost || isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-black">
        <ClipLoader color="blue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Post" showBackArrow />
      <PostItem data={fetchedPost} userId={fetchedPost?.user?.id} />
      <Form placeholder="comment" postId={postId as string} isComment />
      <CommentFeed
        comments={fetchedPost.comments}
        postId={fetchedPost.id}
        userId={fetchedPost?.user?.id}
      />
    </>
  );
};

export default Post;
