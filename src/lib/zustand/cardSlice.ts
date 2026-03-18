import type { StateCreator } from 'zustand';

import { Item } from '../domain/items/types';

export type CardSlice = {
  card: Item[];
  setCard: (items: Item[]) => void;
};

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  card: [],
  setCard: (items: Item[]) => set({ card: items }),
});
