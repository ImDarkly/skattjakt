import { StateCreator } from 'zustand';
import data from '@/lib/api/items.json';
import { Item, ItemsSlice } from '../domain/items/types';

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

export const createItemsSlice: StateCreator<ItemsSlice> = (set) => ({
  items: load(),
  toggleEligibility: (id: string) =>
    set((state) => {
      const next = state.items.map((item) =>
        item.id === id ? { ...item, isEligible: !item.isEligible } : item
      );

      save(next);
      return { items: next };
    }),
  resetItems: () => {
    localStorage.removeItem(KEY);
    save(data);
    set({ items: data });
  },
  addItem: (item: Item) => {
    set((state) => {
      const next = [...state.items, item];
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
});
