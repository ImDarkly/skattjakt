import { StateCreator } from 'zustand';
import data from '@/lib/api/items.json';
import { Item, ItemsSlice, NewItem } from '../domain/items/types';
import generateItemId from '../domain/items/generateItemId';

const KEY = 'items';

function load(): Item[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return data;
  try {
    return JSON.parse(raw);
  } catch {
    return data;
  }
}

function save(items: Item[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export const createItemsSlice: StateCreator<ItemsSlice> = (set, get) => ({
  items: load(),
  addItem: (item: NewItem) => {
    const name = item.name.trim();
    if (!name) throw Error('Item name required!');

    const id = generateItemId(name);

    const exists = get().items.some((item) => item.id === id);
    if (exists) throw Error('Item already exists!');

    set((state) => {
      const next = [...state.items, { ...item, name, id }];
      save(next);
      return { items: next };
    });
  },
  removeItem: (id: string) => {
    set((state) => {
      const next = state.items.filter((item) => item.id !== id);
      save(next);
      return { items: next };
    });
  },
  resetItems: () => {
    localStorage.removeItem(KEY);
    save(data);
    set({ items: data });
  },
  setEligibilityByIds: (ids: string[], value: boolean) => {
    set((state) => {
      const next = state.items.map((item) =>
        ids.includes(item.id) ? { ...item, isEligible: value } : item
      );

      save(next);
      return { items: next };
    });
  },
  toggleEligibility: (id: string) => {
    const item = get().items.find((item) => item.id === id);
    if (!item) return;

    get().setEligibilityByIds([id], !item?.isEligible);
  },
});
