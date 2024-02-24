import { useState } from 'react';

import { useBoundStore } from '@/lib/zustand/store';

import { Cell } from './ui/cell';

type BingoCardProps = {
  disabled?: boolean;
};

export const BingoCard = ({ disabled }: BingoCardProps) => {
  const { card } = useBoundStore();
  const [selectedCell, setSelectedCell] = useState<number[]>([]);

  const handleCellClick = (cellId: number) => {
    if (disabled) {
      return;
    }

    if (selectedCell.includes(cellId)) {
      setSelectedCell((prevSelectedCell) =>
        prevSelectedCell.filter((id) => id !== cellId)
      );
    } else {
      setSelectedCell((prevSelectedCell) => [...prevSelectedCell, cellId]);
    }
  };

  return (
    <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2 overflow-hidden rounded-2xl">
      {card.map(({ id, tag, name }) => (
        <Cell
          key={id}
          id={id}
          tag={tag}
          name={name}
          checked={selectedCell.includes(id)}
          onClick={() => handleCellClick(id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
