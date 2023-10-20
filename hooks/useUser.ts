import fetcher from '@/libs/fetcher';
import useSWR from 'swr';

const useUser = (userId: string) => {
  const url = userId ? `/api/post/${userId}` : null;
  const { data, mutate, error, isLoading } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useUser;
