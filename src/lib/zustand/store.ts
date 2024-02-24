import { create } from 'zustand';

import type { Card } from './cardSlice';
import { createCardSlice } from './cardSlice';

export const useBoundStore = create<Card>()((...a) => ({
  ...createCardSlice(...a),
}));
