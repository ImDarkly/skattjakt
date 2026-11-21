import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createItemsSlice } from './itemsSlice';
import data from '@/lib/api/items.json';
import { Item, ItemsSlice } from '../domain/items/types';
import { CardsHistorySlice, createCardHistorySlice } from './cardsHistorySlice';
import { PreferencesSlice, createPreferencesSlice } from './preferencesSlice';

export type BoundStore = ItemsSlice & CardsHistorySlice & PreferencesSlice;

const defaultRarities = new Map(
  data.map((item) => [item.id, item.rarity as Item['rarity']])
);

const withRarity = (item: Item): Item =>
  item.rarity
    ? item
    : { ...item, rarity: defaultRarities.get(item.id) ?? 'common' };

export const useBoundStore = create<BoundStore>()(
  persist(
    (...a) => ({
      ...createItemsSlice(...a),
      ...createCardHistorySlice(...a),
      ...createPreferencesSlice(...a),
    }),
    {
      name: 'skattjakt-storage',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<BoundStore>;
        return {
          ...state,
          items: state.items?.map(withRarity),
          cardsHistory: state.cardsHistory?.map((card) => ({
            ...card,
            items: card.items.map(withRarity),
          })),
        } as BoundStore;
      },
      partialize: (state) => ({
        items: state.items,
        cardsHistory: state.cardsHistory,
        raritySlots: state.raritySlots,
      }),
    }
  )
);
