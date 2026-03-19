import type { StateCreator } from 'zustand';

import { Item } from '../domain/items/types';
import { BingoCardType } from '../domain/card/types';

export type CardSlice = {
  card: BingoCardType;
  setCard: (items: Item[]) => void;
};

export const createCardSlice: StateCreator<CardSlice> = (set) => ({
  card: {
    items: [],
    title: '',
    favourite: false,
  },
  setCard: (items: Item[]) =>
    set((state) => ({
      card: {
        ...state.card,
        items,
      },
    })),
});
