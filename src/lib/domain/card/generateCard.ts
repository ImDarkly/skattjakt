import type { Item } from '../items/types';

export const BINGO_GRID_SIZE = 25;

export default function generateCard(items: Item[]): Item[] {
  return items
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, BINGO_GRID_SIZE);
}
