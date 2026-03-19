import { BingoCardType } from '@/lib/domain/card/types';
import { Button } from '../ui/button';
import { BingoCard } from '../bingo/bingo-card';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card';
import VirtualizedList from '../ui/virtualized-list';

interface CardHistoryListProps {
  cards: BingoCardType[];
}

export default function CardHistoryList({ cards }: CardHistoryListProps) {
  return (
    <div className="flex-1 flex justify-center min-h-0 w-full">
      <VirtualizedList
        count={cards.length}
        estimateSize={524}
        renderItem={(index) => {
          const card = cards[index];
          return (
            <div className="flex justify-center px-4">
              <Card className="w-fit">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardAction>
                    <Button variant="secondary">Open</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <BingoCard disabled items={card.items} />
                </CardContent>
              </Card>
            </div>
          );
        }}
      />
    </div>
  );
}
