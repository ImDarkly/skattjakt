import { Button } from '../ui/button';
import { BingoCard } from '../bingo/bingo-card';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../ui/card';
import { BingoCardType } from '@/lib/domain/card/types';
import ConfirmationDialog from '../blocks/confirmation-dialog';

interface CardHistoryItemProps {
  card: BingoCardType;
  onOpen: () => void;
  onDelete: () => void;
}

export default function CardHistoryItem({
  card,
  onOpen,
  onDelete,
}: CardHistoryItemProps) {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <BingoCard disabled items={card.items} />
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
