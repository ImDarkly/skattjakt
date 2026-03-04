import Header from '@/lib/components/header';
import ResetItemsButton from '@/lib/components/items/reset-items-button';
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
    <div className="flex h-screen flex-col items-center gap-4">
      <Header
        left={<GoBackButton />}
        title="Items"
        right={<ResetItemsButton />}
      />
      <ItemsControl items={filteredItems} />
      <ItemsList items={filteredItems} toggleEligibility={toggleEligibility} />
    </div>
  );
}
