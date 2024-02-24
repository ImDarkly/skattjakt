import type { FC, ReactNode } from 'react';

interface TopbarProps {
  children?: ReactNode;
}

export const Topbar: FC<TopbarProps> = ({ children }) => {
  return (
    <div className="sticky top-0 z-10 w-full">
      <div className="flex h-20 w-full items-center bg-background/80 px-4 py-3 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
};
