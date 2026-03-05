import { create } from 'zustand';
import { createCardSlice } from './cardSlice';
import { createItemsSlice } from './itemsSlice';
import { BingoCard } from '../domain/card/types';
import { ItemsSlice } from '../domain/items/types';

type BoundStore = BingoCard & ItemsSlice;

export const useBoundStore = create<BoundStore>()((...a) => ({
  ...createCardSlice(...a),
  ...createItemsSlice(...a),
}));
