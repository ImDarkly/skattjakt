import { useBoundStore } from '@/lib/zustand/store';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import ConfirmationDialog from '../blocks/confirmation-dialog';

export default function ResetItemsButton() {
  const { resetItems } = useBoundStore();

  return (
    <ConfirmationDialog
      trigger={
        <Button size="icon" variant="destructive" aria-label="Reset items">
          <RotateCcw size={20} aria-hidden="true" />
        </Button>
      }
      title="Reset all items?"
      description="This removes custom items and restores default eligibility and rarity for the item list."
      onConfirm={resetItems}
      confirmLabel="Reset"
      variant="destructive"
    />
  );
}
