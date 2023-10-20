import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetcherUser } = useUser(userId);
  const router = useRouter();

  const handleClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/user/${userId}`;

      router.push(url);
    },
    [router, userId],
  );

  return (
    <div
      className={`
        ${hasBorder ? 'border-2 border-black' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full hover:opacity-90 cursor-pointer transition
  `}>
      <Image
        alt="avatar"
        fill
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        onClick={handleClick}
        src={fetcherUser?.profileImage || '/images/profile.jpeg'}
      />
    </div>
  );
};

export default Avatar;
