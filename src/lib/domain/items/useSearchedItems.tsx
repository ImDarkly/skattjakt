import { Item } from './types';

export default function useSearchedItems(items: Item[], query: string | null) {
  return query
    ? items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : items;
}
