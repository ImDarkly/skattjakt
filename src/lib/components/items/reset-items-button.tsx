import { useBoundStore } from '@/lib/zustand/store';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export default function ResetItemsButton() {
  const { resetItems } = useBoundStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Icon width={24} icon="heroicons:arrow-path-16-solid" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset all items?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove all current items and restore the list to
            its initial state. The change cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={resetItems}>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
