import useCurrent from '@/hooks/useCurrent';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  auth?: boolean;
  icon: IconType;
  href?: string;
  label: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ auth, icon: Icon, href, label, onClick }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: fetchCurrentUser } = useCurrent();

  const goToHref = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !fetchCurrentUser) {
      return loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [auth, fetchCurrentUser, href, loginModal, onClick, router]);

  return (
    <div
      className="w-full flex flex-row gap-3 px-2 py-3 text-black rounded-md cursor-pointer hover:bg-neutral-200"
      onClick={goToHref}>
      <Icon size={24} />
      <p className="hidden lg:block">{label}</p>
    </div>
  );
};

export default SidebarItem;
