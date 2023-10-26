import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const useComment = (commentId: string) => {
  const url = commentId ? `/api/comment/${commentId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useComment;
