import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardSlice, createCardSlice } from './cardSlice';
import { createItemsSlice } from './itemsSlice';
import { ItemsSlice } from '../domain/items/types';
import { CardHistorySlice, createCardHistorySlice } from './cardHistorySlice';

export type BoundStore = CardSlice & ItemsSlice & CardHistorySlice;

export const useBoundStore = create<BoundStore>()(
  persist(
    (...a) => ({
      ...createCardSlice(...a),
      ...createItemsSlice(...a),
      ...createCardHistorySlice(...a),
    }),
    {
      name: 'skattjakt-storage',
      partialize: (state) => ({
        items: state.items,
        history: state.history,
      }),
    }
  )
);
