import Header from '@/lib/components/header';
import ResetItemsButton from '@/lib/components/items/reset-items-button';
import ItemsControl from '@/lib/components/items/items-control';
import ItemsList from '@/lib/components/items/items-list';
import GoBackButton from '@/lib/components/ui/go-back-button';
import useFilteredItems from '@/lib/domain/items/useFilteredItems';
import useSearchedItems from '@/lib/domain/items/useSearchedItems';
import { useBoundStore } from '@/lib/zustand/store';
import { useQueryStates, parseAsString } from 'nuqs';
import { Button } from '@/lib/components/ui/button';

export default function ItemsPage() {
  const [{ category, query }, setFilters] = useQueryStates({
    category: parseAsString,
    query: parseAsString,
  });
  const { items, toggleEligibility, setRarity } = useBoundStore();
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
      {filteredItems.length > 0 ? (
        <ItemsList
          items={filteredItems}
          toggleEligibility={toggleEligibility}
          setRarity={setRarity}
        />
      ) : (
        <div className="flex w-full max-w-xl flex-col items-center gap-3 px-4 py-8 text-center">
          <h2 className="text-xl font-semibold">No items found</h2>
          <p className="text-sm text-muted-foreground">
            Try a different item name or clear the filters.
          </p>
          <Button
            variant="secondary"
            onClick={() => setFilters({ category: null, query: null })}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
