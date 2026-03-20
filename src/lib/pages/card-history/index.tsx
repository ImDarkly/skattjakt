import CardHistoryList from '@/lib/components/card-history/card-history-list';
import CardsHistoryEmptyState from '@/lib/components/card-history/cards-history-empty-state';
import Header from '@/lib/components/header';
import GoBackButton from '@/lib/components/ui/go-back-button';
import { useBoundStore } from '@/lib/zustand/store';
import { useShallow } from 'zustand/react/shallow';

export default function CardHistoryPage() {
  const { cardHistory } = useBoundStore(
    useShallow((state) => ({
      cardHistory: state.cardsHistory,
    }))
  );

  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <Header left={<GoBackButton />} title="History" />
      {cardHistory.length === 0 ? (
        <CardsHistoryEmptyState />
      ) : (
        <CardHistoryList cards={cardHistory} />
      )}
    </div>
  );
}
