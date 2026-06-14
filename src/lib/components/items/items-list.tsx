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
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const pressAnimationClasses =
  'translate-3d ring-2 ring-inset after:absolute after:h-full after:w-full after:rounded-md after:bg-primary after:transition-transform active:translate-y-1 relative data-[state=on]:translate-y-1 data-[state=on]:after:h-0';

interface ItemsListProps {
  items: ItemType[];
  toggleEligibility: (id: string) => void;
  setRarity: (id: string, rarity: ItemType['rarity']) => void;
}

export default function ItemsList({
  items,
  toggleEligibility,
  setRarity,
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
              <ItemTitle className="flex-1 min-w-0 truncate">
                {item.name}
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <ToggleGroup
                type="single"
                value={item.rarity}
                onValueChange={(value) =>
                  value && setRarity(item.id, value as ItemType['rarity'])
                }
              >
                <ToggleGroupItem
                  value="common"
                  aria-label="Common"
                  className="w-9 h-9 p-0"
                >
                  C
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="rare"
                  aria-label="Rare"
                  className="w-9 h-9 p-0"
                >
                  R
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="epic"
                  aria-label="Epic"
                  className="w-9 h-9 p-0"
                >
                  E
                </ToggleGroupItem>
              </ToggleGroup>

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
