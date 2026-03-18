import { StateCreator } from 'zustand';
import data from '@/lib/api/items.json';
import { Item, ItemsSlice, NewItem } from '../domain/items/types';
import generateItemId from '../domain/items/generateItemId';

export const createItemsSlice: StateCreator<ItemsSlice> = (set, get) => ({
  items: data,
  addItem: (item: NewItem) => {
    const name = item.name.trim();
    if (!name) throw Error('Item name required!');

    const id = generateItemId(name);
    if (get().items.some((i) => i.id === id))
      throw Error('Item already exists!');

    const next = [...get().items, { ...item, name, id }];
    set({ items: next });
  },
  removeItem: (id: string) => {
    const next = get().items.filter((item) => item.id !== id);
    set({ items: next });
  },
  resetItems: () => {
    set({ items: data });
  },
  setEligibilityByIds: (ids: string[], value: boolean) => {
    const next = get().items.map((item) =>
      ids.includes(item.id) ? { ...item, isEligible: value } : item
    );
    set({ items: next });
  },
  toggleEligibility: (id: string) => {
    const item = get().items.find((item) => item.id === id);
    if (!item) return;
    get().setEligibilityByIds([id], !item?.isEligible);
  },
});
