import type { StateCreator } from 'zustand';

import { Item } from '../domain/items/types';

export type CardSlice = {
  card: { items: Item[]; title: string };
  setCard: (items: Item[]) => void;
};

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  card: {
    items: [],
    title: '',
  },
  setCard: (items: Item[]) =>
    set((state) => ({
      card: {
        ...state.card,
        items,
      },
    })),
});
