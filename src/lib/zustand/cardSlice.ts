import type { StateCreator } from 'zustand';

import { Item } from '../domain/items/types';

export type CardSlice = {
  card: { items: Item[]; title: string; isFavorited: boolean };
  setCard: (items: Item[]) => void;
  toggleCurrentCardFavourite: () => void;
};

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  card: {
    items: [],
    title: '',
    isFavorited: false,
  },
  setCard: (items: Item[]) =>
    set((state) => ({
      card: {
        ...state.card,
        items,
        isFavorited: false,
      },
    })),
  toggleCurrentCardFavourite: () =>
    set((state) => ({
      card: {
        ...state.card,
        isFavorited: !state.card.isFavorited,
      },
    })),
});
