import getItems from '../items/item';
import type { Item } from '../items/types';

export const BINGO_GRID_SIZE = 25;

const items = getItems();

export default function generateCard(): Item[] {
  return items
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, BINGO_GRID_SIZE);
}
