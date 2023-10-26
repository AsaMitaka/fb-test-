import useCurrent from '@/hooks/useCurrent';
import useUser from '@/hooks/useUser';
import Avatar from './avatar';
import Button from '../ui/button';
import useEditUserModal from '@/hooks/useEditModal';
import { useCallback } from 'react';
import useFollow from '@/hooks/useFollow';
import useLoginModal from '@/hooks/useLoginModal';

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrent();
  const { data: fetchedCurrentUser } = useUser(userId as string);
  const { isFollowing, toggleFollow } = useFollow(userId);
  console.log(isFollowing);

  const useEditUser = useEditUserModal();
  const loginModal = useLoginModal();

  const handleFollow = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleFollow();
  }, [currentUser, loginModal, toggleFollow]);
  console.log(fetchedCurrentUser);

  return (
    <div className="border-b-[1px] border-black p-2 pb-4">
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 items-center justify-between p-2">
          <Avatar userId={userId} isLarge hasBorder />
          <div className="flex justify-end p-2">
            {currentUser?.id === userId ? (
              <Button label="Edit" onClick={useEditUser.onOpen} />
            ) : (
              <Button
                label={isFollowing ? 'Unfollow' : 'Follow'}
                onClick={handleFollow}
                outline={isFollowing}
                secondary={!isFollowing}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-black text-2xl">{fetchedCurrentUser?.username}</p>
          <p className="text-neutral-600 text-sm">@{fetchedCurrentUser?.nickname}</p>
          <p className="text-black text-sm">{fetchedCurrentUser?.bio}</p>
          <div className="mt-1 flex flex-row items-center gap-5">
            <div className="flex items-center gap-1">
              <p className="text-black cursor-pointer hover:underline">
                {fetchedCurrentUser?.followersCount || 0}
              </p>
              <p className="text-neutral-500">Followers</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-black cursor-pointer hover:underline">
                {fetchedCurrentUser?.followingIds?.length}
              </p>
              <p className="text-neutral-500">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
