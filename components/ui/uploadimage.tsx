import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadImageProps {
  disabled?: boolean;
  label?: string;
  onChange: (base64: string) => void;
  value?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ disabled, label, onChange, value }) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    disabled,
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-black text-center border-2 border-sky-500 border-dotted rounded-md cursor-pointer hover:bg-neutral-100',
      })}>
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height={100} width={100} alt="drop image" />
        </div>
      ) : (
        <p className="text-black">{label}</p>
      )}
    </div>
  );
};

export default UploadImage;
