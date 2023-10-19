import SidebarItem from './sidebarItem';
import { signOut } from 'next-auth/react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiNews, BiLogOut } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';

const Sidebar = () => {
  const items = [
    {
      href: '/',
      label: 'Main',
      icon: BiNews,
    },
    {
      auth: true,
      href: '/friends',
      label: 'Friends',
      icon: FaUserFriends,
    },
    {
      auth: true,
      href: '/users',
      label: 'Account',
      icon: AiOutlineUser,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <SidebarItem
          key={`${item.label}__${index}`}
          auth={item.auth}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
      <SidebarItem icon={BiLogOut} label="LogOut" onClick={signOut} />
    </div>
  );
};

export default Sidebar;
