import CardHistoryList from '@/lib/components/card-history/card-history-list';
import CardsHistoryEmptyState from '@/lib/components/card-history/cards-history-empty-state';
import Header from '@/lib/components/header';
import { Button } from '@/lib/components/ui/button';
import { Input } from '@/lib/components/ui/input';
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
  const [query, setQuery] = useState('');

  const cardsWithIndex = cardHistory.map((card, index) => ({
    card,
    originalIndex: index,
  }));

  const showOnlyFavorited = filter === 'favorites';
  const cardsInFilter = showOnlyFavorited
    ? cardsWithIndex.filter(({ card }) => card.isFavorited)
    : cardsWithIndex;
  const searchTerm = query.trim().toLowerCase();
  const displayedCards = searchTerm
    ? cardsInFilter.filter(({ card }) =>
        card.title.toLowerCase().includes(searchTerm)
      )
    : cardsInFilter;

  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <Header left={<GoBackButton />} title="History" />
      {cardHistory.length > 0 && (
        <div className="flex w-full max-w-xl flex-wrap items-center gap-2 px-4">
          <ToggleGroup
            aria-label="Filter card history"
            className="pb-1"
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
          <Input
            type="search"
            aria-label="Search card titles"
            placeholder="Search card titles"
            className="min-w-40 flex-1"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      )}
      {displayedCards.length === 0 ? (
        searchTerm && cardsInFilter.length > 0 ? (
          <div className="space-y-3 px-4 py-8 text-center">
            <h2 className="text-xl font-semibold">No matching cards</h2>
            <Button variant="secondary" onClick={() => setQuery('')}>
              Clear search
            </Button>
          </div>
        ) : showOnlyFavorited ? (
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
