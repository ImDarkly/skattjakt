export type Item = {
  id: string;
  name: string;
  isEligible: boolean;
  category: string;
  rarity: 'common' | 'rare' | 'epic';
};

export type NewItem = Omit<Item, 'id' | 'rarity'> & { rarity?: Item['rarity'] };

export type ItemsSlice = {
  items: Item[];
  toggleEligibility: (id: string) => void;
  resetItems: () => void;
  addItem: (item: NewItem) => void;
  setEligibilityByIds: (ids: string[], value: boolean) => void;
};
