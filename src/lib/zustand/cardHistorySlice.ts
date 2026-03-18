import { StateCreator } from 'zustand';
import { BingoCard } from '../domain/card/types';

export type CardHistorySlice = {
  history: BingoCard[];
  addToHistory: (card: BingoCard) => void;
};

export const createCardHistorySlice: StateCreator<CardHistorySlice> = (
  set
) => ({
  history: [],
  addToHistory: (card) =>
    set((state) => ({
      history: [card, ...state.history],
    })),
});
