import { BingoCardType } from '@/lib/domain/card/types';
import VirtualizedList from '../ui/virtualized-list';
import { useNavigate } from 'react-router-dom';
import { useBoundStore } from '@/lib/zustand/store';
import { useShallow } from 'zustand/react/shallow';
import { encodeCardToParams } from '../bingo/generate-button';
import CardHistoryItem from './card-history-item';

interface CardHistoryListProps {
  cards: BingoCardType[];
}

export default function CardHistoryList({ cards }: CardHistoryListProps) {
  const { setCard, removeFromCardsHistory } = useBoundStore(
    useShallow((state) => ({
      setCard: state.setCard,
      removeFromCardsHistory: state.removeFromCardsHistory,
    }))
  );
  const navigate = useNavigate();
  const handleNavigate = (card: BingoCardType) => {
    setCard(card.items);
    const params = encodeCardToParams(card.items);
    navigate(`../?${params}`);
  };

  return (
    <div className="flex-1 flex justify-center min-h-0 w-full">
      <VirtualizedList
        count={cards.length}
        estimateSize={596}
        renderItem={(index) => {
          const card = cards[index];
          return (
            <div className="flex justify-center px-4">
              <CardHistoryItem
                card={card}
                onOpen={() => handleNavigate(card)}
                onDelete={() => removeFromCardsHistory(index)}
              />
            </div>
          );
        }}
      />
    </div>
  );
}
