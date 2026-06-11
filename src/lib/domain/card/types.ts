import { Item } from '../items/types';

export type BingoCardType = {
  items: Item[];
  title: string;
  isFavorited: boolean;
};
