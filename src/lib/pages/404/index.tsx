// 404
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import { Button } from '@/lib/components/ui/button';

export default function Page404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex max-w-lg flex-col items-center justify-center gap-8 px-4 py-0">
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-center justify-center gap-4 self-stretch">
          <div className="relative flex w-full flex-[0_0_auto] flex-col items-center justify-center gap-2 self-stretch">
            <p className="font-text-6xl text-tertiary-background flex justify-center text-6xl font-semibold">
              404
            </p>
            <p className="font-semiboldtext-2xl text-center">Page Not Found</p>
          </div>
          <p className="w-full text-center text-base font-normal text-muted-foreground">
            Oops! Looks like the{' '}
            <span className="text-violet-500 dark:text-violet-400">
              Enderman
            </span>{' '}
            stole this page! We couldn&#39;t find what you were looking for.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <Link to="/" className="flex flex-row gap-2">
            <Button>
              <Icon icon="heroicons:arrow-left-16-solid" width={24} />
              Back to Generator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
