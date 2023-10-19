import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import useLoginModal from '@/hooks/useLoginModal';
import useRegistrationModal from '@/hooks/useRegistrationModal';
import Input from '../ui/input';
import Modal from './modal';

const RegistrationModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegistrationModal();

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      toast.success('Success');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <>
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
    </>
  );

  const footerContent = (
    <div>
      <p className="text-black text-xl">
        You have an account?
        <span
          className="text-black text-xl hover:underline hover:text-sky-500 cursor-pointer"
          onClick={handleToggle}>
          Login!
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      actionLabel="Sign Up"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      label="Create Account"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistrationModal;
