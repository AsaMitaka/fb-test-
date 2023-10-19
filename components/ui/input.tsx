interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder: string;
  type?: string;
  value: string;
}

const Input: React.FC<InputProps> = ({ onChange, disabled, placeholder, type, value }) => {
  return (
    <input
      className="w-full text-lg p-4 bg-white text-black border-2 border-sky-500 rounded-md outline-none focus:border-sky-800 focus:border-2 transition disabled:bg-neutral-200 disabled:opacity-70"
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default Input;
