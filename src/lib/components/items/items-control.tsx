import { Item } from '@/lib/domain/items/types';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import AddItemButton from './add-item-button';
import FilterItems from './filter-items';
import SearchItems from './search-items';
import SetAllEligibility from './set-all-eligibility';

interface ItemsControlProps {
  items: Item[];
}

export default function ItemsControl({ items }: ItemsControlProps) {
  return (
    <div className="flex flex-col justify-start w-full max-w-xl">
      <div className="flex flex-row gap-2">
        <SearchItems />
        <AddItemButton />
      </div>
      <ScrollArea aria-orientation="horizontal" className="py-4">
        <FilterItems />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <SetAllEligibility items={items} />
    </div>
  );
}
