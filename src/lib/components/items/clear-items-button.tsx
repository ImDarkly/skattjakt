import { useBoundStore } from '@/lib/zustand/store';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ClearItemsButton() {
  const { resetItems } = useBoundStore();

  return (
    <Button size="icon" variant="destructive" onClick={resetItems}>
      <Icon width={24} icon="heroicons:trash-16-solid" />
    </Button>
  );
}
