import { useCallback, useState } from 'react';
import { Item } from '@/lib/domain/items/types';
import { BINGO_GRID_SIZE } from '@/lib/domain/card/generateCard';

import { Cell } from '../ui/cell';
import { Button } from '../ui/button';
import { Check, Pencil, Star } from 'lucide-react';
import { Input } from '../ui/input';
import { BingoConfetti, type Celebration } from './bingo-confetti';

const gridSide = Math.sqrt(BINGO_GRID_SIZE);
const gridIndices = Array.from({ length: gridSide }, (_, index) => index);
const bingoLines = [
  ...gridIndices.map((row) =>
    gridIndices.map((column) => row * gridSide + column)
  ),
  ...gridIndices.map((column) =>
    gridIndices.map((row) => row * gridSide + column)
  ),
  gridIndices.map((index) => index * gridSide + index),
  gridIndices.map((index) => index * gridSide + gridSide - 1 - index),
];

type BingoCardProps = {
  disableCells?: boolean;
  items: Item[];
  title?: string;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
  onRename?: (title: string) => void;
};

export const BingoCard = ({
  disableCells,
  items,
  title,
  isFavourite,
  onToggleFavourite,
  onRename,
}: BingoCardProps) => {
  const [marks, setMarks] = useState<{
    items: Item[];
    ids: Set<number>;
    celebration: Celebration | null;
    sequence: number;
  }>({ items, ids: new Set(), celebration: null, sequence: 0 });
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  const markedIds = marks.items === items ? marks.ids : undefined;
  const celebration = marks.items === items ? marks.celebration : null;
  const isFullCard = items.length === BINGO_GRID_SIZE;
  const completedLines =
    markedIds && isFullCard
      ? bingoLines.filter((line) => line.every((index) => markedIds.has(index)))
          .length
      : 0;

  const toggleMark = (index: number) => {
    if (disableCells) return;
    setMarks((previous) => {
      const sameCard = previous.items === items;
      const ids = new Set(sameCard ? previous.ids : []);
      const currentCelebration = sameCard ? previous.celebration : null;

      if (ids.delete(index)) {
        return { ...previous, items, ids, celebration: currentCelebration };
      }

      ids.add(index);
      const finishedCard = isFullCard && ids.size === BINGO_GRID_SIZE;
      const finishedLine =
        isFullCard &&
        bingoLines.some(
          (line) => line.includes(index) && line.every((cell) => ids.has(cell))
        );

      if (!finishedCard && !finishedLine) {
        return { ...previous, items, ids, celebration: currentCelebration };
      }

      const sequence = previous.sequence + 1;
      return {
        items,
        ids,
        sequence,
        celebration: {
          sequence,
          kind: finishedCard ? 'card' : 'line',
          x: (((index % gridSide) + 0.5) / gridSide) * 100,
          y: ((Math.floor(index / gridSide) + 0.5) / gridSide) * 100,
        },
      };
    });
  };

  const clearCelebration = useCallback((finished: Celebration) => {
    setMarks((current) =>
      current.celebration === finished
        ? { ...current, celebration: null }
        : current
    );
  }, []);

  const handleSave = () => {
    if (editingTitle && editingTitle.trim()) {
      onRename?.(editingTitle);
    }
    setEditingTitle(null);
  };

  return (
    <div className="relative space-y-2 w-full">
      {(title || onToggleFavourite || onRename) && (
        <div
          className={`flex items-center ${onRename || onToggleFavourite ? 'justify-between' : 'justify-center'} gap-2 h-10`}
        >
          {editingTitle !== null ? (
            <Input
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setEditingTitle(null);
              }}
              autoFocus
            />
          ) : (
            title && (
              <h3
                className="min-w-0 truncate text-lg font-semibold"
                title={title}
              >
                {title}
              </h3>
            )
          )}

          <div className="flex shrink-0 items-center gap-2">
            {onRename && (
              <Button
                variant={editingTitle !== null ? 'default' : 'secondary'}
                size="icon"
                aria-label={
                  editingTitle !== null ? 'Save title' : 'Rename card'
                }
                onClick={(e) => {
                  e.stopPropagation();
                  if (editingTitle !== null) {
                    handleSave();
                  } else {
                    setEditingTitle(title || '');
                  }
                }}
              >
                {editingTitle !== null ? (
                  <Check size={20} aria-hidden="true" />
                ) : (
                  <Pencil size={20} aria-hidden="true" />
                )}
              </Button>
            )}
            {onToggleFavourite && (
              <Button
                variant="secondary"
                size="icon"
                onClick={onToggleFavourite}
                aria-label={isFavourite ? 'Unfavourite card' : 'Favourite card'}
              >
                <Star
                  size={20}
                  aria-hidden="true"
                  fill={isFavourite ? 'currentColor' : 'none'}
                />
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="relative">
        <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2">
          {items.map((item, index) => (
            <Cell
              key={index}
              item={item}
              checked={markedIds?.has(index)}
              onClick={() => toggleMark(index)}
              disabled={disableCells}
            />
          ))}
        </div>
        {celebration && (
          <BingoConfetti
            key={celebration.sequence}
            celebration={celebration}
            onEnd={clearCelebration}
          />
        )}
      </div>
      {!disableCells && (
        <div className="sr-only" role="status">
          {isFullCard && markedIds?.size === BINGO_GRID_SIZE
            ? 'Card complete!'
            : completedLines > 0
              ? `Bingo! ${completedLines} ${completedLines === 1 ? 'line' : 'lines'} completed.`
              : ''}
        </div>
      )}
    </div>
  );
};
