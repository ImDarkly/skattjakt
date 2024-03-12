import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';

import items from '@/lib/api/items.json';
import SkattjaktLogo from '@/lib/components/assets/skattjakt-logo.svg?react';
import { BingoCard } from '@/lib/components/bingo-card';
import { Footer } from '@/lib/components/footer';
import { Share } from '@/lib/components/share';
import { Topbar } from '@/lib/components/topbar';
import { Button } from '@/lib/components/ui/button';
import { ModeToggle } from '@/lib/components/ui/mode-toggle';
import { useBoundStore } from '@/lib/zustand/store';

export default function Card() {
  const { card, setCard } = useBoundStore();
  const [searchParams] = useSearchParams();
  const hideControls = searchParams.get('hide-controls') !== null;

  useEffect(() => {
    if (card.length === 0) {
      const newCard = [];

      for (let i = 1; i < 26; i += 1) {
        const item = searchParams.get(`b${i}`);
        if (item) {
          // Find the corresponding item in your data source (items array)
          const selectedItem = items.find((dataItem) => dataItem.tag === item);

          if (selectedItem) {
            // Include id and name properties from the data source
            newCard.push({
              id: selectedItem.id,
              tag: selectedItem.tag,
              name: selectedItem.name,
            });
          }
        }
      }

      if (newCard.length === 25) {
        setCard(newCard);
      }
    }
  }, [searchParams, card, setCard]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Helmet>
        <title>Your Card • Skattjakt</title>
      </Helmet>
      <Topbar>
        <div>
          <Link to="/generate" className="w-full">
            <div className="w-full rounded-md p-2 hover:bg-secondary">
              <SkattjaktLogo />
            </div>
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          <h1 className="w-full px-2 text-center text-2xl font-bold">
            <Link to="https://github.com/ImDarkly/skattjakt">Skattjakt</Link>
          </h1>
        </div>
        <div>
          <ModeToggle />
        </div>
      </Topbar>
      <div className="z-0 flex h-full w-full flex-1 flex-col items-center justify-center px-4">
        <div className="flex w-full max-w-xl flex-col items-center justify-center gap-6">
          <div className="flex h-12 w-full flex-row items-center">
            <div className="flex w-full flex-row items-center justify-center">
              <h1 className="text-2xl">Your card</h1>
            </div>
          </div>
          <BingoCard />
          {!hideControls && (
            <div className="flex h-12 w-full flex-row items-center justify-end gap-2">
              <div className="w-full">
                <Link to="/generate" className="w-full">
                  <Button className="w-full" variant="secondary">
                    <Icon
                      icon="heroicons:arrow-left-16-solid"
                      className="text-2xl"
                    />
                    Return
                  </Button>
                </Link>
              </div>
              <Share />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
