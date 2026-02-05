import Header from '@/lib/components/header';
import ItemsList from '@/lib/components/items/items-list';
import GoBackButton from '@/lib/components/ui/go-back-button';

export default function ItemsPage() {
  return (
    <div>
      <Header left={<GoBackButton />} title="Items" />
      <ItemsList />;
    </div>
  );
}
