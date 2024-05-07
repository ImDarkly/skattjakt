import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import items from '@/lib/api/items.json';
import { useBoundStore } from '@/lib/zustand/store';

import { Cell } from './ui/cell';

type BingoCardProps = {
  disabled?: boolean;
};

export const BingoCard = ({ disabled }: BingoCardProps) => {
  const { card, setCard } = useBoundStore();
  const [selectedCell, setSelectedCell] = useState<number[]>([]);
  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    if (card.length === 0) {
      const newCard = [];

      for (let i = 1; i < 26; i += 1) {
        const item = searchParams.get(`b${i}`);
        if (item) {
          // Find the corresponding item in your data source (items array)
          const selectedItem = items.find((dataItem) => dataItem.tag === item);

          if (selectedItem) {
            // Include id and name properties from the data source
            newCard.push({
              id: selectedItem.id,
              tag: selectedItem.tag,
              name: selectedItem.name,
            });
          }
        }
      }

      if (newCard.length === 25) {
        setCard(newCard);
      }
    }
  }, [searchParams, card, setCard]);

  return (
    <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2">
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
