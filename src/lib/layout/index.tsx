import type { ReactNode } from 'react';

import { Toaster } from '../components/ui/toaster';
import { ThemeProvider } from '@/lib/components/theme-provider';

import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const isProduction = process.env.NODE_ENV === 'production';

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <Meta />
      <main className={`${isProduction ? '' : 'select-none'} wrapper`}>
        {children}
      </main>
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
