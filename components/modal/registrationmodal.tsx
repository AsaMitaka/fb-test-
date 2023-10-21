import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import useLoginModal from '@/hooks/useLoginModal';
import useRegistrationModal from '@/hooks/useRegistrationModal';
import Input from '../ui/input';
import Modal from './modal';
import axios from 'axios';

const RegistrationModal = () => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const useLogin = useLoginModal();
  const useRegistration = useRegistrationModal();

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/registration', {
        nickname,
        username,
        email,
        password,
      });

      toast.success('Signup success');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onHandleToggle = useCallback(() => {
    if (isLoading) return;

    useRegistration.onClose();
    useLogin.onOpen();
  }, [isLoading, useLogin, useRegistration]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Input
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        placeholder="Username"
        type="text"
        value={username}
      />
      <Input
        onChange={(e) => setNickname(e.target.value)}
        disabled={isLoading}
        placeholder="Name"
        type="text"
        value={nickname}
      />
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
        You have an account?
        <span
          className="ml-2 text-black text-xl hover:underline hover:text-sky-500 cursor-pointer"
          onClick={onHandleToggle}>
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
      isOpen={useRegistration.isOpen}
      label="Create Account"
      onClose={useRegistration.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistrationModal;
