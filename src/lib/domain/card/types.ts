import { Item } from '../items/types';

export type BingoCardWithIndex = {
  card: BingoCardType;
  originalIndex: number;
};

export type BingoCardType = {
  items: Item[];
  title: string;
  isFavorited: boolean;
};
