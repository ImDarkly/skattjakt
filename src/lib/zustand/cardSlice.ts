import type { StateCreator } from 'zustand';

import items from '@/lib/api/items.json';

export type Item = {
  id: number;
  tag: string;
  name: string;
};

export type Card = {
  card: Item[];
  generateCard: () => void;
  setCard: (newCard: Item[]) => void;
};

export const createCardSlice: StateCreator<Card> = (set) => ({
  card: [],
  generateCard: () => {
    const shuffleArray = (array: Item[]): Item[] =>
      array.slice().sort(() => Math.random() - 0.5);

    const selectRandomItems = (shuffledItems: Item[]): Item[] => {
      const selectedItems = new Set<Item>();

      while (selectedItems.size < 25 && shuffledItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * shuffledItems.length);
        const selectedItem = shuffledItems[randomIndex];

        selectedItems.add({
          id: selectedItem.id,
          tag: selectedItem.tag,
          name: selectedItem.name,
        });

        shuffledItems.splice(randomIndex, 1);
      }

      return Array.from(selectedItems);
    };

    const itemsData: Item[] = items;
    const selectedItems = selectRandomItems(shuffleArray(itemsData));
    set({ card: selectedItems });
  },
  setCard: (newCard: Item[]) => set({ card: newCard }),
});
