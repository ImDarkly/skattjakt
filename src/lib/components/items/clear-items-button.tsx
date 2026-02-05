import { useBoundStore } from '@/lib/zustand/store';
import { Button } from '../ui/button';

export default function ClearItemsButton() {
  const { resetItems } = useBoundStore();

  return (
    <Button variant="destructive" onClick={resetItems}>
      Clear All Items
    </Button>
  );
}
