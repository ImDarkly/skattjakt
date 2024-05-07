// This is Demo page for testing some features

/// <reference types="vite-plugin-svgr/client" />;
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';

import SkattjaktLogo from '@/lib/components/assets/skattjakt-logo.svg?react';
import { BingoCard } from '@/lib/components/bingo-card';
import { Footer } from '@/lib/components/footer';
import { Generator } from '@/lib/components/generator';
import { Share } from '@/lib/components/share';
import { Topbar } from '@/lib/components/topbar';
import { ModeToggle } from '@/lib/components/ui/mode-toggle';

export default function Home() {
  const [searchParams] = useSearchParams();
  const hideControls = searchParams.get('show-controls') !== null;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Helmet>
        <title>Generate • Skattjakt</title>
      </Helmet>
      <Topbar>
        <div>
          <Link to="/" className="w-full">
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
              <h1 className="text-2xl">Bingo card generator</h1>
            </div>
          </div>
          <BingoCard />
          {!hideControls && (
            <div className="flex h-12 w-full flex-row items-center justify-end gap-2">
              <div className="w-full">
                <Share />
              </div>
              <div className="w-full">
                <Generator />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
