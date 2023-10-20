import Search from './search';

const SearchBar = () => {
  return (
    <div className="col-span-1 lg:col-span-2 h-full mt-3">
      <div className="flex flex-col items-center ml-2">
        <Search />
        <hr className="h-px bg-neutral-200 border-0 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default SearchBar;
