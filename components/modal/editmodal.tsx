import useEditUserModal from '@/hooks/useEditModal';
import Modal from './modal';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const EditUserModal = () => {
  const useEditUser = useEditUserModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    try {
      setIsLoading(true);

      toast.success('Success');
      useEditUser.onClose();
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, useEditUser]);

  const bodyContent = <></>;

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
