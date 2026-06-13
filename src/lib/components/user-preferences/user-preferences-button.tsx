import { Icon } from '@iconify/react/dist/iconify.js';
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
import { Dialog, DialogTrigger } from '../ui/dialog';
import { DifficultyDialog } from './difficulty-dialog';

export default function UserPreferencesButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <Icon width={24} icon="heroicons:cog-8-tooth-16-solid" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Difficulty
              </DropdownMenuItem>
            </DialogTrigger>
            <DifficultyDialog />
          </Dialog>

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
  );
}
