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
    <div className="mt-3 col-span-1 lg:col-span-2 h-full">
      <div className="flex flex-col items-center mr-2">
        <div className="space-y-3 w-full">
          {items.map((item, index) => (
            <SidebarItem
              key={`${item.label}__${index}`}
              auth={item.auth}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          ))}
          <hr className="h-px bg-neutral-500 border-0 dark:bg-gray-700" />
          <SidebarItem icon={BiLogOut} label="LogOut" onClick={signOut} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
