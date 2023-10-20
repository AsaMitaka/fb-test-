import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const usePost = (postId: string) => {
  const url = postId ? `/api/post/${postId}` : null;
  const { data, mutate, error, isLoading } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default usePost;
