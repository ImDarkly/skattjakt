import { getItems } from '@/lib/domain/items/item';
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
import { useEffect, useState } from 'react';

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(getItems());
  }, []);

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
            <TableCell>{String(item.isSelectable)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
