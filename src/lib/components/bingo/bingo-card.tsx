import { useState } from 'react';
import { Item } from '@/lib/domain/items/types';
import { BINGO_GRID_SIZE } from '@/lib/domain/card/generateCard';

import { Cell } from '../ui/cell';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Input } from '../ui/input';

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
  const [marks, setMarks] = useState({ items, ids: new Set<string>() });
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  const markedIds = marks.items === items ? marks.ids : undefined;
  const markedCount = markedIds?.size ?? 0;
  const completedLines =
    markedIds && items.length === BINGO_GRID_SIZE
      ? bingoLines.filter((line) =>
          line.every((index) => markedIds.has(items[index].id))
        ).length
      : 0;

  const handleCellClick = (cellId: string) => {
    if (disableCells) return;
    setMarks((previous) => {
      const ids = new Set(previous.items === items ? previous.ids : []);
      if (ids.has(cellId)) {
        ids.delete(cellId);
      } else {
        ids.add(cellId);
      }
      return { items, ids };
    });
  };

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
                onClick={(e) => {
                  e.stopPropagation();
                  if (editingTitle !== null) {
                    handleSave();
                  } else {
                    setEditingTitle(title || '');
                  }
                }}
              >
                <Icon
                  className="text-2xl"
                  icon={
                    editingTitle !== null
                      ? 'heroicons:check-16-solid'
                      : 'heroicons:pencil-16-solid'
                  }
                />
              </Button>
            )}
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
        </div>
      )}
      {!disableCells && items.length > 0 && (
        <div className="space-y-2 pb-1 text-sm">
          <div
            className="flex items-center justify-between gap-2"
            role="status"
          >
            <span className="text-muted-foreground">
              {markedCount} of {items.length} marked
            </span>
            {completedLines > 0 && (
              <span className="font-semibold">
                Bingo! {completedLines}{' '}
                {completedLines === 1 ? 'line' : 'lines'}
              </span>
            )}
          </div>
          <progress
            className="bingo-progress block h-2 w-full overflow-hidden rounded-full"
            aria-label="Card progress"
            max={items.length}
            value={markedCount}
          />
        </div>
      )}
      <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2">
        {items.map((item: Item) => (
          <Cell
            key={item.id}
            item={item}
            checked={markedIds?.has(item.id)}
            onClick={() => handleCellClick(item.id)}
            disabled={disableCells}
          />
        ))}
      </div>
    </div>
  );
};
