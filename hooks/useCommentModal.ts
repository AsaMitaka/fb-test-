import { create } from 'zustand';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  currentModalId?: string;
  setCurrentModalId: (id: string) => void;
}

const useCommentModal = create<CommentModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  currentModalId: '',
  setCurrentModalId: (id: string) => set({ currentModalId: id }),
}));

export default useCommentModal;
