import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import useLoginModal from '@/hooks/useLoginModal';
import useRegistrationModal from '@/hooks/useRegistrationModal';
import Input from '../ui/input';
import Modal from './modal';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const useLogin = useLoginModal();
  const useRegistration = useRegistrationModal();

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      toast.success('Logged in');
      signIn('credentials', {
        email,
        password,
      });
      useLogin.onClose();
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, setIsLoading, useLogin]);

  const onHandleToggle = useCallback(() => {
    if (isLoading) return;

    useLogin.onClose();
    useRegistration.onOpen();
  }, [isLoading, useLogin, useRegistration]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        placeholder="Email"
        type="email"
        value={email}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-2">
      <p className="text-black text-xl">
        You dont have an account?
        <span
          className="ml-2 text-black text-xl hover:underline hover:text-sky-500 cursor-pointer"
          onClick={onHandleToggle}>
          Create!
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      actionLabel="Login"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={useLogin.isOpen}
      label="Login"
      onClose={useLogin.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginModal;
