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

export default function ItemsList() {
  const { items, toggleEligibility } = useBoundStore();

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
