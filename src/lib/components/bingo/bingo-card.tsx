import { useState } from 'react';
import { Item } from '@/lib/domain/items/types';

import { Cell } from '../ui/cell';

type BingoCardProps = {
  disabled?: boolean;
  items: Item[];
};

export const BingoCard = ({ disabled, items }: BingoCardProps) => {
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
  );
};
