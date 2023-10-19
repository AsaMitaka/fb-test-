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

  const goToHref = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth) {
      return;
    } else if (href) {
      router.push(href);
    }
  }, [auth, href, router, onClick]);

  return (
    <div onClick={goToHref}>
      <Icon size={24} />
      {label}
    </div>
  );
};

export default SidebarItem;
