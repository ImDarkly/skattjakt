import { useRef } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '../ui/item';
import { Switch } from '../ui/switch';
import { Item as ItemType } from '@/lib/domain/items/types';
import { useVirtualizer } from '@tanstack/react-virtual';
import SetAllEligibility from './set-all-eligibility';

interface ItemsListProps {
  items: ItemType[];
  toggleEligibility: (id: string) => void;
}

export default function ItemsList({
  items,
  toggleEligibility,
}: ItemsListProps) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-full w-full max-w-xl flex flex-col justify-center overflow-auto"
    >
      <SetAllEligibility items={items} />
      <ItemGroup
        className="gap-4 max-w-xl w-full relative"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];

          return (
            <Item
              key={item.id}
              variant="outline"
              className={`${item.isEligible ? 'opacity-100' : 'opacity-50'} absolute top-0 left-0 w-full`}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
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
        })}
      </ItemGroup>
    </div>
  );
}
