import { useState } from 'react';
import { Item } from '@/lib/domain/items/types';

import { Cell } from '../ui/cell';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

type BingoCardProps = {
  disabled?: boolean;
  items: Item[];
  title?: string;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
};

export const BingoCard = ({
  disabled,
  items,
  title,
  isFavourite,
  onToggleFavourite,
}: BingoCardProps) => {
  const [selectedCell, setSelectedCell] = useState<string[]>([]);

  const handleCellClick = (cellId: string) => {
    if (disabled) return;

    setSelectedCell((prev) =>
      prev.includes(cellId)
        ? prev.filter((id) => id !== cellId)
        : [...prev, cellId]
    );
  };

  return (
    <div className="relative space-y-2 w-full">
      {(title || onToggleFavourite) && (
        <div className="flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {onToggleFavourite && (
            <Button
              variant="secondary"
              size="icon"
              onClick={onToggleFavourite}
              aria-label={isFavourite ? 'Unfavourite card' : 'Favourite card'}
            >
              <Icon
                className="text-2xl"
                icon={
                  isFavourite ? 'heroicons:star-16-solid' : 'heroicons:star'
                }
              />
            </Button>
          )}
        </div>
      )}
      <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2">
        {items.map((item: Item) => (
          <Cell
            key={item.id}
            item={item}
            checked={selectedCell.includes(item.id)}
            onClick={() => handleCellClick(item.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
