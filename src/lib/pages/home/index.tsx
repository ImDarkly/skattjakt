/// <reference types="vite-plugin-svgr/client" />;
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';

import { BingoCard } from '@/lib/components/bingo/bingo-card';
import { Footer } from '@/lib/components/footer';
import { GenerateButton } from '@/lib/components/bingo/generate-button';
import { ShareButton } from '@/lib/components/share-button';
import Header from '@/lib/components/header';
import AppLogo from '@/lib/components/app-logo';
import ItemsButton from '@/lib/components/items/items-button';

export default function Home() {
  const [searchParams] = useSearchParams();
  const hideControls = searchParams.get('show-controls') !== null;

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <Helmet>
        <title>Generate • Skattjakt</title>
      </Helmet>
      <Header left={<AppLogo />} title="Skattjakt" right={<ItemsButton />} />
      <div className="z-0 flex h-full w-full max-w-xl  flex-1 flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl">Bingo card generator</h1>
        <BingoCard />
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
