import { StateCreator } from 'zustand';
import { BingoCardType } from '../domain/card/types';

export type CardsHistorySlice = {
  cardsHistory: BingoCardType[];
  addToCardsHistory: (card: BingoCardType) => void;
  removeFromCardsHistory: (index: number) => void;
};

export const createCardHistorySlice: StateCreator<CardsHistorySlice> = (
  set
) => ({
  cardsHistory: [],
  addToCardsHistory: (card) =>
    set((state) => ({
      cardsHistory: [card, ...state.cardsHistory],
    })),
  removeFromCardsHistory: (index: number) => {
    set((state) => ({
      cardsHistory: state.cardsHistory.filter((_, i) => i !== index),
    }));
  },
});
