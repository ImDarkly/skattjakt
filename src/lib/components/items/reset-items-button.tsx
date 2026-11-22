import { useBoundStore } from '@/lib/zustand/store';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import ConfirmationDialog from '../blocks/confirmation-dialog';

export default function ResetItemsButton() {
  const { resetItems } = useBoundStore();

  return (
    <ConfirmationDialog
      trigger={
        <Button size="icon" variant="destructive">
          <Icon width={24} icon="heroicons:arrow-path-16-solid" />
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
