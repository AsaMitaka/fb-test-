import { IconType } from 'react-icons';

interface ButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: IconType;
  label: string;
  large?: boolean;
  onClick: () => void;
  outline?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  fullWidth,
  icon: Icon,
  label,
  large,
  onClick,
  outline,
  secondary,
}) => {
  const handleClick = () => {
    if (disabled) return;

    return onClick();
  };

  return (
    <button
      className={`
        border-2
        disabled:opacity-70
        disabled:cursor-not-allowed
        focus:bg-gray-200
        focus:border-neutral-800
        font-semibold
        ${fullWidth ? 'w-full' : 'w-fit'}
        hover:bg-gray-200
        ${large ? 'px-5 py-3 text-xl' : 'px-4 py-2 text-md'}
        ${outline ? 'bg-transparent text-neutral-800 border-black' : ''}
        ${secondary ? 'bg-sky-500 border-sky-800 text-black' : 'border-black bg-white'}
        text-black 
        transition
    `}
      onClick={handleClick}>
      {Icon && <Icon size={24} color="black" />}
      <div>{label}</div>
    </button>
  );
};

export default Button;
