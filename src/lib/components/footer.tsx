import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const version = APP_VERSION;
export const Footer = () => {
  return (
    <footer className="flex h-24 items-center justify-center gap-1 bg-background">
      <p>Made with</p>
      <TooltipProvider>
        <Tooltip delayDuration={5000}>
          <TooltipTrigger asChild>
            <Icon
              icon="heroicons:heart-16-solid"
              className="text-2xl text-primary"
            />
          </TooltipTrigger>
          <TooltipContent
            className="bg-primary text-primary-foreground"
            side="top"
          >
            <p>Version @{version}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>by</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="https://github.com/ImDarkly"
              className="font-bold underline hover:text-primary"
            >
              ImDarkly
            </Link>
          </TooltipTrigger>
          <TooltipContent
            className="bg-popover-foreground text-popover"
            side="top"
          >
            <p>https://github.com/ImDarkly</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </footer>
  );
};
