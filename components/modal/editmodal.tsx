import useEditUserModal from '@/hooks/useEditModal';
import Modal from './modal';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../ui/input';
import useCurrent from '@/hooks/useCurrent';
import useUser from '@/hooks/useUser';
import UploadImage from '../ui/uploadimage';
import axios from 'axios';

const EditUserModal = () => {
  const { data: currentUser } = useCurrent();
  const { mutate: mutateFetchUser } = useUser(currentUser?.id);
  const useEditUser = useEditUserModal();

  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBio(currentUser?.bio);
    setNickname(currentUser?.nickname);
    setProfileImage(currentUser?.profileImage);
  }, [currentUser?.bio, currentUser?.profileImage, currentUser?.nickname]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        bio,
        nickname,
        profileImage,
      });
      mutateFetchUser();

      toast.success('Success');
      useEditUser.onClose();
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [bio, mutateFetchUser, nickname, profileImage, setIsLoading, useEditUser]);

  const bodyContent = (
    <div className="mt-4 flex flex-col gap-3">
      <Input
        disabled={isLoading}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        type="text"
        value={nickname}
      />
      <Input
        disabled={isLoading}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        type="text"
        value={bio || ''}
      />
      <UploadImage
        disabled={isLoading}
        label="Profile Image"
        onChange={(image) => setProfileImage(image)}
        value={profileImage}
      />
    </div>
  );

  return (
    <Modal
      actionLabel="Save"
      body={bodyContent}
      disabled={isLoading}
      isOpen={useEditUser.isOpen}
      label="Edit User"
      onClose={useEditUser.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default EditUserModal;
