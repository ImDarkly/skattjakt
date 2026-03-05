import { Item } from './types';

export default function useFilteredItems(
  items: Item[],
  category: string | null
) {
  return items.filter((item) => !category || item.category === category);
}
