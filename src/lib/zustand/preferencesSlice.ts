import { StateCreator } from 'zustand';

export interface PreferencesSlice {
  raritySlots: {
    rare: number;
    epic: number;
  };
  setRaritySlots: (slots: { rare: number; epic: number }) => void;
}

export const createPreferencesSlice: StateCreator<PreferencesSlice> = (
  set
) => ({
  raritySlots: { rare: 4, epic: 1 },
  setRaritySlots: (slots) => set({ raritySlots: slots }),
});
