/// <reference types="vite-plugin-svgr/client" />;
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import { BingoCard } from '@/lib/components/bingo/bingo-card';
import { Footer } from '@/lib/components/footer';
import { GenerateButton } from '@/lib/components/bingo/generate-button';
import { ShareButton } from '@/lib/components/share-button';
import Header from '@/lib/components/header';
import AppLogo from '@/lib/components/app-logo';
import { useShallow } from 'zustand/react/shallow';
import { useBoundStore } from '@/lib/zustand/store';
import { BINGO_GRID_SIZE } from '@/lib/domain/card/generateCard';
import { useEffect } from 'react';
import { Item } from '@/lib/domain/items/types';
import IconLink from '@/lib/components/ui/icon-link';
import UserPreferencesButton from '@/lib/components/user-preferences/user-preferences-button';

export default function Home() {
  const [searchParams] = useSearchParams();
  const hideControls = searchParams.has('hide-controls');
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

  useEffect(() => {
    const cardIdParam = searchParams.get('c');
    if (!cardIdParam) return;
    const urlIds = cardIdParam.split(',');
    const activeCardIds = activeCard?.items.map((item) => item.id) ?? [];

    const isAlreadyActive =
      urlIds.length === activeCardIds.length &&
      urlIds.every((id, i) => id === activeCardIds[i]);

    if (isAlreadyActive) return;
    const newCard = urlIds
      .map((id) => items.find((item: Item) => item.id === id))
      .filter((item): item is Item => item !== undefined);

    if (newCard.length === BINGO_GRID_SIZE) {
      const title = searchParams.get('t') ?? 'Shared Card';
      addToCardsHistory({
        items: newCard,
        title,
        isFavorited: false,
      });
    }
  }, [searchParams, items, addToCardsHistory, activeCard]);

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
            <UserPreferencesButton />
          ) : (
            <IconLink
              to="/cards-history"
              icon="heroicons-rectangle-stack-16-solid"
            />
          )
        }
      />
      <div className="z-0 flex h-full w-full max-w-xl  flex-1 flex-col items-center justify-center gap-6 px-4">
        <BingoCard
          title={activeCard?.title ?? 'Bingo Card Generator'}
          items={activeCard?.items ?? []}
          isFavourite={activeCard?.isFavorited ?? false}
          onToggleFavourite={
            !hideControls ? () => toggleFavourite(0) : undefined
          }
          onRename={
            !hideControls ? (newTitle) => renameCard(0, newTitle) : undefined
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
      </div>
      <Footer hideControls={hideControls} />
    </div>
  );
}
