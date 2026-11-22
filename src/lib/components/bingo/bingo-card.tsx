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
  const [marks, setMarks] = useState({ items, ids: new Set<number>() });
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  const markedIds = marks.items === items ? marks.ids : undefined;
  const markedCount = markedIds?.size ?? 0;
  const completedLines =
    markedIds && items.length === BINGO_GRID_SIZE
      ? bingoLines.filter((line) => line.every((index) => markedIds.has(index)))
          .length
      : 0;

  const toggleMark = (index: number) => {
    if (disableCells) return;
    setMarks((previous) => {
      const ids = new Set(previous.items === items ? previous.ids : []);
      if (ids.has(index)) {
        ids.delete(index);
      } else {
        ids.add(index);
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
      {!disableCells && items.length > 0 && (
        <details className="rounded-md border bg-background text-sm">
          <summary className="cursor-pointer rounded-md px-3 py-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
            Item checklist
          </summary>
          <ul className="grid gap-1 border-t p-2 sm:grid-cols-2">
            {items.map((item, index) => (
              <li key={index}>
                <label className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-accent">
                  <input
                    type="checkbox"
                    checked={markedIds?.has(index) ?? false}
                    onChange={() => toggleMark(index)}
                    className="h-4 w-4 shrink-0 accent-primary"
                  />
                  <span>{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};
