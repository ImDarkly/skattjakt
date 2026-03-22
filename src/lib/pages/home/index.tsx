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

export default function Home() {
  const [searchParams] = useSearchParams();
  const hideControls = searchParams.get('show-controls') !== null;
  const { items, card, setCard } = useBoundStore(
    useShallow((state) => ({
      items: state.items,
      card: state.card,
      setCard: state.setCard,
    }))
  );

  useEffect(() => {
    if (card.items.length === 0) {
      const ids = searchParams.get('c')?.split(',') ?? [];
      const newCard = ids
        .map((id) => items.find((item: Item) => item.id === id))
        .filter((item): item is Item => item !== undefined);

      if (newCard.length === BINGO_GRID_SIZE) {
        setCard(newCard);
      }
    }
  }, [searchParams]);

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <Helmet>
        <title>Generate • Skattjakt</title>
      </Helmet>
      <Header
        left={<AppLogo />}
        title="Skattjakt"
        right={<IconLink to="/cards-history" icon="heroicons-clock-16-solid" />}
      />
      <div className="z-0 flex h-full w-full max-w-xl  flex-1 flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl">Bingo card generator</h1>
        <BingoCard items={card.items} />
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
      <Footer />
    </div>
  );
}
