import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardSlice, createCardSlice } from './cardSlice';
import { createItemsSlice } from './itemsSlice';
import { ItemsSlice } from '../domain/items/types';
import { CardsHistorySlice, createCardHistorySlice } from './cardsHistorySlice';

export type BoundStore = CardSlice & ItemsSlice & CardsHistorySlice;

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
        cardsHistory: state.cardsHistory,
      }),
    }
  )
);
