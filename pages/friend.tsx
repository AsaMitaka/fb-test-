import Header from '@/components/ui/header';

const Friend = () => {
  return (
    <>
      <Header label="Friend" showBackArrow />
      <div className="flex flex-col gap-1">
        <h1 className="text-black text-xl">Friends List</h1>
      </div>
    </>
  );
};

export default Friend;
