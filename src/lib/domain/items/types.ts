export type Item = {
  id: string;
  name: string;
  isEligible: boolean;
  category: string;
};

export type NewItem = {
  name: string;
  isEligible: boolean;
  category: string;
};

export type ItemsSlice = {
  items: Item[];
  toggleEligibility: (id: string) => void;
  resetItems: () => void;
  addItem: (item: Item) => void;
  setEligibilityByIds: (ids: string[], value: boolean) => void;
};
