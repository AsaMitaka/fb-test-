import { useState } from 'react';
import Input from '../ui/input';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <Input
      isRound
      onChange={(e) => setSearch(e.target.value)}
      placeholder={` search`}
      type="text"
      value={search}
    />
  );
};

export default Search;
