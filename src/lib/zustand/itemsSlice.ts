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
  setItems: (items: Item[]) => set({ items: items }),
  resetItems: () => {
    localStorage.removeItem(KEY);
    save(data);
    set({ items: data });
  },
});
