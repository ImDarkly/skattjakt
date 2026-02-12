import { useBoundStore } from '@/lib/zustand/store';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { Switch } from '../ui/switch';
import { useQueryState } from 'nuqs';
import { Item as ItemType } from '@/lib/domain/items/types';

interface ItemsListProps {
  items: ItemType[];
  toggleEligibility: (id: string) => void;
}

export default function ItemsList({
  items,
  toggleEligibility,
}: ItemsListProps) {
  return (
    <ItemGroup className="gap-4 max-w-xl w-full">
      {items.map((item) => {
        return (
          <Item key={item.id} variant="outline">
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
      })}
    </ItemGroup>
  );
}
