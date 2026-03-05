import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Field, FieldGroup } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useBoundStore } from '@/lib/zustand/store';
import { toast } from '../ui/use-toast';

export default function AddItemButton() {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Custom');
  const addItem = useBoundStore((state) => state.addItem);

  function handleNameInput(e: FormEvent<HTMLInputElement>) {
    setItemName(e.currentTarget.value);
  }

  function handleCategoryInput(e: FormEvent<HTMLInputElement>) {
    setItemCategory(e.currentTarget.value);
  }

  function handleAddItemClick() {
    try {
      addItem({
        name: itemName,
        isEligible: true,
        category: itemCategory.toLowerCase(),
      });
    } catch (error: any) {
      return toast({
        description: error.message,
        variant: 'destructive',
      });
    }

    setItemName('');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add item</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Name</Label>
            <Input value={itemName} onInput={(e) => handleNameInput(e)} />
          </Field>
          <Field>
            <Label>Category</Label>
            <Input
              value={itemCategory}
              onInput={(e) => handleCategoryInput(e)}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose className="flex gap-4">
            <Button variant="secondary">Close</Button>
            <Button onClick={handleAddItemClick}>Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
