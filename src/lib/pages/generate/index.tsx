// Generator
// This file contains the main component for the Skattjakt Bingo Card Generator.
/// <reference types="vite-plugin-svgr/client" />;
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import SkattjaktLogo from '@/lib/components/assets/skattjakt-logo.svg?react';
import { BingoCard } from '@/lib/components/bingo-card';
import { Footer } from '@/lib/components/footer';
import { Topbar } from '@/lib/components/topbar';
import { Button } from '@/lib/components/ui/button';
import { ModeToggle } from '@/lib/components/ui/mode-toggle';
import { useBoundStore } from '@/lib/zustand/store';

export default function Generate() {
  const setCard = useBoundStore().generateCard;
  const { card } = useBoundStore();
  const [spinning, setSpinning] = useState(false);
  const cardLink =
    card.length === 25
      ? Array.from(
          { length: 25 },
          (_, index) => `b${index + 1}=${card[index].tag}`
        ).join('&')
      : '';

  // useEffect to generate an initial Bingo card on component mount
  useEffect(() => {
    if (card.length === 0) {
      setCard();
    }
  }, [card, setCard]);

  // useEffect to handle the spinning animation of the Regenerate button icon
  useEffect(() => {
    if (spinning) {
      const timeoutId = setTimeout(() => {
        setSpinning(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    return () => {};
  }, [spinning]);

  // Click event handler for the Regenerate button
  const handleRegenerateClick = () => {
    setSpinning(true);
    setCard();
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Helmet>
        <title>Generate • Skattjakt</title>
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
            Skattjakt
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
              <h1 className="text-2xl">Bingo card generator</h1>
            </div>
          </div>
          <BingoCard disabled />
          <div className="flex h-12 w-full flex-row items-center justify-end gap-2">
            <div className="w-full">
              <Link className="w-full" to={`/card?${cardLink}`}>
                <Button className="w-full" variant="secondary">
                  <Icon
                    width={24}
                    icon="heroicons:arrow-top-right-on-square-16-solid"
                  />
                  Open
                </Button>
              </Link>
            </div>
            <div className="w-full">
              <Button className="w-full" onClick={handleRegenerateClick}>
                <Icon
                  className={`${spinning ? 'animate-spin' : ''} text-2xl`}
                  icon="heroicons:arrow-path-16-solid"
                />
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
