import type { Item } from '../items/types';
import type { PreferencesSlice } from '@/lib/zustand/preferencesSlice';

export const BINGO_GRID_SIZE = 25;

export default function generateCard(
  items: Item[],
  raritySlots: PreferencesSlice['raritySlots']
): Item[] {
  const eligibleItems = items.filter((item) => item.isEligible);

  const epicPool = eligibleItems
    .filter((i) => i.rarity === 'epic')
    .sort(() => Math.random() - 0.5);
  const rarePool = eligibleItems
    .filter((i) => i.rarity === 'rare')
    .sort(() => Math.random() - 0.5);
  const commonPool = eligibleItems
    .filter((i) => i.rarity !== 'epic' && i.rarity !== 'rare')
    .sort(() => Math.random() - 0.5);

  const selectedItems: Item[] = [];

  const targetEpic = Math.max(0, Math.min(raritySlots.epic, BINGO_GRID_SIZE));
  const targetRare = Math.max(
    0,
    Math.min(raritySlots.rare, BINGO_GRID_SIZE - targetEpic)
  );
  const targetCommon = BINGO_GRID_SIZE - targetEpic - targetRare;

  const fillTier = (pool: Item[], count: number) => {
    const taken = pool.splice(0, count);
    selectedItems.push(...taken);
    return count - taken.length;
  };

  let remainingSlots = fillTier(epicPool, targetEpic);
  remainingSlots = fillTier(rarePool, targetRare + remainingSlots);
  fillTier(commonPool, targetCommon + remainingSlots);

  return selectedItems
    .slice(0, BINGO_GRID_SIZE)
    .sort(() => Math.random() - 0.5);
}
