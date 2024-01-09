import { StateCreator } from 'zustand';

export type itemsSlice = {
    items: { id: number }[];
    generateItems: () => void;
};

export const createItemsSlice: StateCreator<itemsSlice> = (set) => ({
    items: [],
    generateItems: () => {
        const items: { id: number }[] = [];

        while (items.length < 25) {
            const randomNum = Math.floor(Math.random() * 501);

            if (!items.some((item) => item.id === randomNum)) {
                items.push({ id: randomNum });
            }
        }

        set({ items: items });
    },
});
