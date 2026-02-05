import Header from '@/lib/components/header';
import ClearItemsButton from '@/lib/components/items/clear-items-button';
import ItemsList from '@/lib/components/items/items-list';
import GoBackButton from '@/lib/components/ui/go-back-button';

export default function ItemsPage() {
  return (
    <div>
      <Header
        left={<GoBackButton />}
        title="Items"
        right={<ClearItemsButton />}
      />
      <ItemsList />
    </div>
  );
}
