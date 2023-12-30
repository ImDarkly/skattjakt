import { StateCreator, create } from 'zustand';

export type spinSlice = {
    spin: boolean;
    toggleSpin: () => void;
};

export const createSpinSlice: StateCreator<spinSlice> = ((set) => ({
    spin: false,
    toggleSpin: () => {
        set({ spin: true });
        setTimeout(() => {
            set({ spin: false });
        }, 1000);
    },
}));