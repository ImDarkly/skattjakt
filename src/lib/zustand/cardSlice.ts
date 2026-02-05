import type { StateCreator } from 'zustand';

import { Item } from '../domain/items/types';
import { BingoCard } from '../domain/card/types';

export const createCardSlice: StateCreator<BingoCard> = (set) => ({
  card: [],
  setCard: (items: Item[]) => set({ card: items }),
});
