import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { Switch } from '../ui/switch';
import { Item as ItemType } from '@/lib/domain/items/types';
import VirtualizedList from '../ui/virtualized-list';

interface ItemsListProps {
  items: ItemType[];
  toggleEligibility: (id: string) => void;
}

export default function ItemsList({
  items,
  toggleEligibility,
}: ItemsListProps) {
  return (
    <VirtualizedList
      count={items.length}
      estimateSize={80}
      className="max-w-xl px-4"
      renderItem={(index) => {
        const item = items[index];
        return (
          <Item
            variant="outline"
            className={`${item.isEligible ? 'opacity-100' : 'opacity-50'}`}
          >
            <ItemMedia variant="image">
              <img src={`./items/${item.id}.png`} alt={item.name} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{item.name}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Switch
                onCheckedChange={() => toggleEligibility(item.id)}
                checked={item.isEligible}
              />
            </ItemActions>
          </Item>
        );
      }}
    />
  );
}
