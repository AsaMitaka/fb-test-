import { create } from 'zustand';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useEditPostModal = create<EditPostModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useEditPostModal;
