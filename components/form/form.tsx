import useCurrent from '@/hooks/useCurrent';
import usePosts from '@/hooks/usePosts';
import axios from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Avatar from '../user/avatar';
import Button from '../ui/button';
import useRegistrationModal from '@/hooks/useRegistrationModal';
import useLoginModal from '@/hooks/useLoginModal';

interface FormProps {
  isComment?: boolean;
  placeholder: string;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ isComment, placeholder, postId }) => {
  const useSignUp = useRegistrationModal();
  const useLogin = useLoginModal();
  const { data: currentUser } = useCurrent();
  const { mutate: mutatePosts } = usePosts(postId as string);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      const url = isComment ? `/api/comment?postId=${postId}` : `/api/posts/`;

      await axios.post(url, { body });
      setBody('');
      mutatePosts();

      toast.success('Posted');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, mutatePosts, setBody, body, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-500 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              className="peer resize-none mt-3 w-full text-black p-2 text-[20px] placeholder-neutral-500 focus:border-neutral-500"
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              placeholder={placeholder}
              value={body}
            />
            <hr className="opacity-0 h-[1px] w-full border-neutral-500 transition" />
            <div
              className={
                isComment ? 'mt-1 flex flex-row justify-end' : 'mt-4 flex flex-row justify-end'
              }>
              <Button
                label={isComment ? 'Comment' : 'Post'}
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-black text-2xl">You are not sign in or sign up</h1>
          <div className="mt-2 mb-4 flex flex-row items-center justify-between">
            <Button label="Sign Up" onClick={useSignUp.onOpen} outline secondary />
            <Button label="Login" onClick={useLogin.onOpen} outline />
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
