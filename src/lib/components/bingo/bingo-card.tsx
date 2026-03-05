import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useBoundStore } from '@/lib/zustand/store';

import { Cell } from '../ui/cell';
import { Item } from '@/lib/domain/items/types';
import { BINGO_GRID_SIZE } from '@/lib/domain/card/generateCard';

type BingoCardProps = {
  disabled?: boolean;
};

export const BingoCard = ({ disabled }: BingoCardProps) => {
  const items = useBoundStore((state) => state.items);
  const { card, setCard } = useBoundStore();
  const [selectedCell, setSelectedCell] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  const handleCellClick = (cellId: string) => {
    if (disabled) return;

    setSelectedCell((prev) =>
      prev.includes(cellId)
        ? prev.filter((id) => id !== cellId)
        : [...prev, cellId]
    );
  };

  useEffect(() => {
    if (card.length === 0) {
      const newCard = Array.from(
        { length: BINGO_GRID_SIZE },
        (_, index) => index + 1
      ).map((index) =>
        items.find((item: Item) => item.id === searchParams.get(`b${index}`))
      );

      if (newCard.length === BINGO_GRID_SIZE) {
        setCard(newCard);
      }
    }
  }, [searchParams]);

  return (
    <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2">
      {card.map((item: Item) => (
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
