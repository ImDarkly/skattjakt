import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Item } from '@/lib/domain/items/types';
import { Switch } from '../ui/switch';
import { useBoundStore } from '@/lib/zustand/store';

export default function ItemsList() {
  const { items, toggleEligibility } = useBoundStore();

  return (
    <Table>
      <TableCaption>List of all items in app</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Selectable</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: Item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Switch
                onCheckedChange={() => toggleEligibility(item.id)}
                checked={item.isEligible}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
