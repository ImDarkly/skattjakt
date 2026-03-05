import { useQueryState } from 'nuqs';
import { Input } from '../ui/input';
import { ChangeEvent } from 'react';

export default function SearchItems() {
  const [query, setQuery] = useQueryState('query');

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setQuery(query ? query : null);
  }

  return (
    <Input
      onChange={(e) => handleSearch(e)}
      value={query ?? ''}
      placeholder="Search..."
    />
  );
}
