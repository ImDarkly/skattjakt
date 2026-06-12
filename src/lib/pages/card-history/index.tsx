import CardHistoryList from '@/lib/components/card-history/card-history-list';
import CardsHistoryEmptyState from '@/lib/components/card-history/cards-history-empty-state';
import Header from '@/lib/components/header';
import GoBackButton from '@/lib/components/ui/go-back-button';
import { useBoundStore } from '@/lib/zustand/store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Toggle } from '@/lib/components/ui/toggle';

export default function CardHistoryPage() {
  const { cardHistory } = useBoundStore(
    useShallow((state) => ({
      cardHistory: state.cardsHistory,
    }))
  );
  const [showOnlyFavorited, setShowOnlyFavorited] = useState(false);

  const cardsWithIndex = cardHistory.map((card, index) => ({
    card,
    originalIndex: index,
  }));

  const displayedCards = showOnlyFavorited
    ? cardsWithIndex.filter(({ card }) => card.isFavorited)
    : cardsWithIndex;

  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <Header
        left={<GoBackButton />}
        title="History"
        right={
          <Toggle
            pressed={showOnlyFavorited}
            onPressedChange={setShowOnlyFavorited}
            aria-label="Filter favorited cards"
          >
            <Icon
              className="text-2xl"
              icon={
                showOnlyFavorited
                  ? 'heroicons:bookmark-16-solid'
                  : 'heroicons:bookmark'
              }
            />
          </Toggle>
        }
      />
      {displayedCards.length === 0 ? (
        showOnlyFavorited ? (
          <p className="max-w-xl text-center">No favorited cards found.</p>
        ) : (
          <CardsHistoryEmptyState />
        )
      ) : (
        <CardHistoryList cards={displayedCards} />
      )}
    </div>
  );
}
