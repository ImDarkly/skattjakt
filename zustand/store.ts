import { create } from 'zustand'
import { createItemsSlice } from './itemsSlice'
import { itemsSlice } from './itemsSlice'

export const useBoundStore = create<itemsSlice>()((...a) => ({
    ...createItemsSlice(...a)
}))