import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import AddItemButton from './add-item-button';
import FilterItems from './filter-items';

export default function ItemsControl() {
  return (
    <div className="flex flex-col justify-start w-full max-w-xl">
      <AddItemButton />
      <ScrollArea aria-orientation="horizontal" className="py-4">
        <FilterItems />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
