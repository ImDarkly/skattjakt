export type Item = {
  id: string;
  name: string;
  isEligible: boolean;
};

export type ItemsSlice = {
  items: Item[];
  setItems: (items: Item[]) => void;
  resetItems: () => void;
};
