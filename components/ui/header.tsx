import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const onHandleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-500 p-3">
      <div className="flex flex-row gap-3 items-center w-full">
        {showBackArrow && (
          <AiOutlineArrowLeft
            className="cursor-pointer hover:opacity-70 transition"
            color="black"
            onClick={onHandleBack}
            size={20}
          />
        )}
        <p className="text-black text-xl font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default Header;
