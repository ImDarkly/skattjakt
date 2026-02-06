export type Item = {
  id: string;
  name: string;
  isEligible: boolean;
};

export type ItemsSlice = {
  items: Item[];
  toggleEligibility: (id: string) => void;
  resetItems: () => void;
};
