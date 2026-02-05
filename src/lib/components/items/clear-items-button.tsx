import { removeItems } from '@/lib/domain/items/item';
import { Button } from '../ui/button';

export default function ClearItemsButton() {
  return (
    <Button variant="destructive" onClick={() => removeItems()}>
      Clear All Items
    </Button>
  );
}
