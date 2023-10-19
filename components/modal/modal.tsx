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
    <div className="">
      <div className="">
        <div className="">
          <div>
            {label}
            <div onClick={handleClose}>
              <AiOutlineClose size={24} color="white" />
            </div>
          </div>
          <div>{body}</div>
          <div>
            <Button label={actionLabel} onClick={handleSubmit} />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
