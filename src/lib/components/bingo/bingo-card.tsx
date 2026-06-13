import { useState } from 'react';
import { Item } from '@/lib/domain/items/types';

import { Cell } from '../ui/cell';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Input } from '../ui/input';

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
  const [selectedCell, setSelectedCell] = useState<string[]>([]);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  const handleCellClick = (cellId: string) => {
    if (disableCells) return;
    setSelectedCell((prev) =>
      prev.includes(cellId)
        ? prev.filter((id) => id !== cellId)
        : [...prev, cellId]
    );
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
            title && <h3 className="text-lg font-semibold">{title}</h3>
          )}

          <div className="flex items-center gap-2">
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
      <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-2">
        {items.map((item: Item) => (
          <Cell
            key={item.id}
            item={item}
            checked={selectedCell.includes(item.id)}
            onClick={() => handleCellClick(item.id)}
            disabled={disableCells}
          />
        ))}
      </div>
    </div>
  );
};
