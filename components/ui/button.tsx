import { IconType } from 'react-icons';

interface ButtonProps {
  disabled?: boolean;
  icon?: IconType;
  label: string;
  onClick: () => void;
  outline?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ disabled, icon: Icon, label, onClick }) => {
  const handleClick = () => {
    if (disabled) return;

    return onClick();
  };

  return (
    <button onClick={handleClick}>
      {Icon && <Icon size={24} color="white" />}
      <div>{label}</div>
    </button>
  );
};

export default Button;
