import { create } from 'zustand';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useEditUserModal = create<EditUserModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useEditUserModal;
