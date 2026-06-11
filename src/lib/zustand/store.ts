import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createItemsSlice } from './itemsSlice';
import { ItemsSlice } from '../domain/items/types';
import { CardsHistorySlice, createCardHistorySlice } from './cardsHistorySlice';

export type BoundStore = ItemsSlice & CardsHistorySlice;

export const useBoundStore = create<BoundStore>()(
  persist(
    (...a) => ({
      ...createItemsSlice(...a),
      ...createCardHistorySlice(...a),
    }),
    {
      name: 'skattjakt-storage',
      partialize: (state) => ({
        items: state.items,
        cardsHistory: state.cardsHistory,
      }),
    }
  )
);
