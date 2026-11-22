import { useRef, useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { ModeToggleItems } from '../ui/mode-toggle';
import { Dialog } from '../ui/dialog';
import { DifficultyDialog } from './difficulty-dialog';

export default function UserPreferencesButton() {
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const settingsRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={settingsRef}
            variant="secondary"
            size="icon"
            aria-label="Settings"
          >
            <Settings size={20} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(event) => {
            if (difficultyOpen) event.preventDefault();
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setDifficultyOpen(true)}>
              Difficulty
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/items">Edit Items</Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Choose Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <ModeToggleItems />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={difficultyOpen} onOpenChange={setDifficultyOpen}>
        <DifficultyDialog
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            settingsRef.current?.focus();
          }}
        />
      </Dialog>
    </>
  );
}
