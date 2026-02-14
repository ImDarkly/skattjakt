import Header from '@/lib/components/header';
import ClearItemsButton from '@/lib/components/items/clear-items-button';
import ItemsControl from '@/lib/components/items/items-control';
import ItemsList from '@/lib/components/items/items-list';
import GoBackButton from '@/lib/components/ui/go-back-button';
import useFilteredItems from '@/lib/domain/items/useFilteredItems';
import useSearchedItems from '@/lib/domain/items/useSearchedItems';
import { useBoundStore } from '@/lib/zustand/store';
import { useQueryState } from 'nuqs';

export default function ItemsPage() {
  const [category] = useQueryState('category');
  const [query] = useQueryState('query');
  const { items, toggleEligibility } = useBoundStore();
  const searchedItems = useSearchedItems(items, query);
  const filteredItems = useFilteredItems(searchedItems, category);

  return (
    <div className="flex flex-col items-center gap-4">
      <Header
        left={<GoBackButton />}
        title="Items"
        right={<ClearItemsButton />}
      />
      <ItemsControl />
      <ItemsList items={filteredItems} toggleEligibility={toggleEligibility} />
    </div>
  );
}
