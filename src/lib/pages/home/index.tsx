// Generator
// This file contains the main component for the Skattjakt Bingo Card Generator.
/// <reference types="vite-plugin-svgr/client" />;

import { Link } from 'react-router-dom';

import SkattjaktLogo from '@/lib/components/assets/skattjakt-logo.svg?react';
import { Footer } from '@/lib/components/footer';
import { Topbar } from '@/lib/components/topbar';
import { ModeToggle } from '@/lib/components/ui/mode-toggle';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
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
      <Footer />
    </div>
  );
}
