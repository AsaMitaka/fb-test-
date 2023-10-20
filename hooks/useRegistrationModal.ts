import { create } from 'zustand';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useRegistrationModal = create<RegistrationModalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useRegistrationModal;
