import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../ui/button';

interface ModalProps {
  actionLabel: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  isOpen: boolean;
  label?: string;
  onClose: () => void;
  onSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({
  actionLabel,
  body,
  disabled,
  footer,
  isOpen,
  label,
  onClose,
  onSubmit,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div className="overflow-x-hidden overflow-y-auto  fixed inset-0 z-50 outline-none focus:outline-none bg-white-800 bg-opacity-70 flex justify-center items-center">
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-center justify-between p-10 rounded-t">
            <h3 className="text-3xl font-semibold text-black">{label}</h3>
            <button className="p-1 ml-auto border-0 transition" onClick={handleClose}>
              <AiOutlineClose
                size={24}
                color="black"
                className="hover:opacity-70 cursor-pointer focus:opacity-70"
              />
            </button>
          </div>
          <div className="relative p-10 flex-auto">{body}</div>
          <div className="flex flex-col gap-2 p-10">
            <Button label={actionLabel} onClick={handleSubmit} outline />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
