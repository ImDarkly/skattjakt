import { create } from 'zustand'
import { createSpinSlice } from './spinSlice'
import { spinSlice } from './spinSlice'

export const useBoundStore = create<spinSlice>()((...a) => ({
    ...createSpinSlice(...a)
}))