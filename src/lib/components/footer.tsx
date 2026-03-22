import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { ModeToggle } from './ui/mode-toggle';
import UserPreferencesButton from './user-preferences/user-preferences-button';

const isProduction = process.env.NODE_ENV === 'production';

const version = APP_VERSION;
export const Footer = () => {
  return (
    <footer className="flex max-h-24 w-full items-center justify-between grow gap-1 bg-background px-4">
      <div className="flex">
        <p>Made with</p>
        <TooltipProvider>
          <Tooltip delayDuration={5000}>
            <TooltipTrigger asChild>
              <Icon
                icon="heroicons:heart-16-solid"
                className="light:hover:drop-shadow-[0px_0px_8px_rgba(244,63,94,1)] text-2xl text-primary transition-all duration-500 hover:drop-shadow-[0px_0px_8px_rgba(225,29,72,1)]"
              />
            </TooltipTrigger>
            <TooltipContent
              className="bg-primary text-primary-foreground"
              side="top"
            >
              <p>
                Version @{version}
                {isProduction ? '' : 'dev'}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p>by</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="https://github.com/ImDarkly"
                className="font-bold text-primary hover:text-primary/90"
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
      </div>
      <UserPreferencesButton />
    </footer>
  );
};
