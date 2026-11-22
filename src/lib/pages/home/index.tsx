/// <reference types="vite-plugin-svgr/client" />;
import { Layers } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';

import { BingoCard } from '@/lib/components/bingo/bingo-card';
import { Footer } from '@/lib/components/footer';
import { GenerateButton } from '@/lib/components/bingo/generate-button';
import { ShareButton } from '@/lib/components/share-button';
import Header from '@/lib/components/header';
import AppLogo from '@/lib/components/app-logo';
import { useShallow } from 'zustand/react/shallow';
import { useBoundStore } from '@/lib/zustand/store';
import { BINGO_GRID_SIZE } from '@/lib/domain/card/generateCard';
import { useEffect, useMemo } from 'react';
import { Item } from '@/lib/domain/items/types';
import { Button } from '@/lib/components/ui/button';
import IconLink from '@/lib/components/ui/icon-link';
import { ModeToggle } from '@/lib/components/ui/mode-toggle';

export default function Home() {
  const [searchParams] = useSearchParams();
  const hideControls =
    searchParams.has('hide-controls') ||
    searchParams.get('show-controls') === 'false';
  const {
    items,
    cardsHistory,
    addToCardsHistory,
    toggleFavourite,
    renameCard,
  } = useBoundStore(
    useShallow((state) => ({
      items: state.items,
      cardsHistory: state.cardsHistory,
      addToCardsHistory: state.addToCardsHistory,
      toggleFavourite: state.toggleFavourite,
      renameCard: state.renameCard,
    }))
  );

  const activeCard = cardsHistory[0];

  const cardIdParam = searchParams.get('c');
  const sharedItems = useMemo(() => {
    if (cardIdParam === null) return null;
    const ids = cardIdParam.split(',');
    if (
      new Set(ids).size !== BINGO_GRID_SIZE ||
      ids.length !== BINGO_GRID_SIZE
    ) {
      return null;
    }
    const itemsById = new Map(items.map((item) => [item.id, item]));
    const sharedItems = ids
      .map((id) => itemsById.get(id))
      .filter((item): item is Item => item !== undefined);
    return sharedItems.length === BINGO_GRID_SIZE ? sharedItems : null;
  }, [cardIdParam, items]);
  const isActiveCard =
    cardIdParam === activeCard?.items.map((item) => item.id).join(',');
  const invalidSharedCard =
    cardIdParam !== null && !isActiveCard && !sharedItems;

  useEffect(() => {
    if (!sharedItems || isActiveCard) return;
    addToCardsHistory({
      items: sharedItems,
      title: searchParams.get('t') || 'Shared Card',
      isFavorited: false,
    });
  }, [searchParams, sharedItems, isActiveCard, addToCardsHistory]);

  const waitingForSharedCard = sharedItems !== null && !isActiveCard;

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <Helmet>
        <title>Generate • Skattjakt</title>
      </Helmet>
      <Header
        left={<AppLogo />}
        title="Skattjakt"
        right={
          hideControls ? (
            <ModeToggle />
          ) : (
            <IconLink to="/cards-history" icon={Layers} label="Card history" />
          )
        }
      />
      <div className="z-0 flex h-full w-full max-w-xl  flex-1 flex-col items-center justify-center gap-6 px-4">
        {invalidSharedCard ? (
          <div className="space-y-3 py-8 text-center">
            <h2 className="text-xl font-semibold">This card is unavailable</h2>
            <p className="text-sm text-muted-foreground">
              The link may be incomplete or contain items missing from your
              list.
            </p>
            <Button asChild>
              <Link to="/" replace>
                Go to generator
              </Link>
            </Button>
          </div>
        ) : (
          !waitingForSharedCard && (
            <>
              <BingoCard
                title={activeCard?.title ?? 'Bingo Card Generator'}
                items={activeCard?.items ?? []}
                isFavourite={activeCard?.isFavorited ?? false}
                onToggleFavourite={
                  !hideControls ? () => toggleFavourite(0) : undefined
                }
                onRename={
                  !hideControls
                    ? (newTitle) => renameCard(0, newTitle)
                    : undefined
                }
              />
              {!hideControls && (
                <div className="flex w-full flex-row items-center justify-end gap-2">
                  <div className="w-full">
                    <ShareButton />
                  </div>
                  <div className="w-full">
                    <GenerateButton />
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
      <Footer hideControls={hideControls} />
    </div>
  );
}
