import { create } from 'zustand';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  currentModalId?: string;
  setCurrentModalId: (id: string) => void;
}

const usePostModal = create<PostModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  currentModalId: '',
  setCurrentModalId: (id: string) => set({ currentModalId: id }),
}));

export default usePostModal;
