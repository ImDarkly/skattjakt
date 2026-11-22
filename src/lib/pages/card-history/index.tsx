import CardHistoryList from '@/lib/components/card-history/card-history-list';
import CardsHistoryEmptyState from '@/lib/components/card-history/cards-history-empty-state';
import Header from '@/lib/components/header';
import GoBackButton from '@/lib/components/ui/go-back-button';
import { useBoundStore } from '@/lib/zustand/store';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ToggleGroup, ToggleGroupItem } from '@/lib/components/ui/toggle-group';

export default function CardHistoryPage() {
  const { cardHistory } = useBoundStore(
    useShallow((state) => ({
      cardHistory: state.cardsHistory,
    }))
  );
  const [filter, setFilter] = useState('all');

  const cardsWithIndex = cardHistory.map((card, index) => ({
    card,
    originalIndex: index,
  }));

  const showOnlyFavorited = filter === 'favorites';
  const displayedCards = showOnlyFavorited
    ? cardsWithIndex.filter(({ card }) => card.isFavorited)
    : cardsWithIndex;

  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <Header left={<GoBackButton />} title="History" />
      {cardHistory.length > 0 && (
        <ToggleGroup
          aria-label="Filter card history"
          className="w-full max-w-xl px-4 pb-1"
          type="single"
          value={filter}
          onValueChange={(value) => {
            if (value) setFilter(value);
          }}
        >
          <ToggleGroupItem className="px-4 py-2" value="all">
            All cards
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4 py-2" value="favorites">
            Favorites
          </ToggleGroupItem>
        </ToggleGroup>
      )}
      {displayedCards.length === 0 ? (
        showOnlyFavorited ? (
          <CardsHistoryEmptyState onShowAll={() => setFilter('all')} />
        ) : (
          <CardsHistoryEmptyState />
        )
      ) : (
        <CardHistoryList cards={displayedCards} />
      )}
    </div>
  );
}
