import { Button } from '../ui/button';
import { BingoCard } from '../bingo/bingo-card';
import { Card, CardContent, CardFooter } from '../ui/card';
import { BingoCardType } from '@/lib/domain/card/types';
import ConfirmationDialog from '../blocks/confirmation-dialog';
import { useBoundStore } from '@/lib/zustand/store';
import { useShallow } from 'zustand/react/shallow';

interface CardHistoryItemProps {
  card: BingoCardType;
  onOpen: () => void;
  onDelete: () => void;
  index: number;
}

export default function CardHistoryItem({
  card,
  onOpen,
  onDelete,
  index,
}: CardHistoryItemProps) {
  const { toggleFavourite, renameCard } = useBoundStore(
    useShallow((state) => ({
      toggleFavourite: state.toggleFavourite,
      renameCard: state.renameCard,
    }))
  );
  return (
    <Card className="w-fit">
      <CardContent>
        <BingoCard
          disableCells
          title={card.title}
          items={card.items}
          isFavourite={card.isFavorited}
          onToggleFavourite={() => toggleFavourite(index)}
          onRename={(newTitle) => renameCard(index, newTitle)}
        />
      </CardContent>
      <CardFooter className="gap-2">
        <ConfirmationDialog
          trigger={
            <Button className="w-full" variant="destructive">
              Delete
            </Button>
          }
          title={`Are you sure you want to delete ${card.title}?`}
          description="This action will remove card forever and can't be undone"
          onConfirm={onDelete}
          confirmLabel="Delete"
        />
        <Button className="w-full" variant="secondary" onClick={onOpen}>
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
