import { useEffect, useState } from 'react';
import { BINGO_GRID_SIZE } from '@/lib/domain/card/generateCard';
import { useBoundStore } from '@/lib/zustand/store';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

const PRESET_LABELS = ['Easy', 'Normal', 'Hard'];
const PRESETS = [
  { rare: 2, epic: 0 },
  { rare: 4, epic: 1 },
  { rare: 8, epic: 2 },
];

export function DifficultyDialog() {
  const { raritySlots, setRaritySlots } = useBoundStore();
  const currentPresetIndex = PRESETS.findIndex(
    (p) => p.rare === raritySlots.rare && p.epic === raritySlots.epic
  );

  const [isAdvanced, setIsAdvanced] = useState(currentPresetIndex === -1);

  useEffect(() => {
    if (!isAdvanced && currentPresetIndex === -1) {
      setRaritySlots(PRESETS[1]);
    }
  }, [isAdvanced, currentPresetIndex, setRaritySlots]);

  const handleModeToggle = (checked: boolean) => {
    setIsAdvanced(checked);
    if (!checked) {
      let minDistance = Infinity;
      let closestIndex = 0;
      PRESETS.forEach((p, index) => {
        const distance = Math.sqrt(
          Math.pow(raritySlots.rare - p.rare, 2) +
            Math.pow(raritySlots.epic - p.epic, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      setRaritySlots(PRESETS[closestIndex]);
    }
  };

  const handleAdvancedChange = (key: 'rare' | 'epic', value: number) => {
    const newSlots = { ...raritySlots, [key]: value };
    if (
      newSlots.rare + newSlots.epic <= BINGO_GRID_SIZE &&
      newSlots.rare >= 0 &&
      newSlots.epic >= 0
    ) {
      setRaritySlots(newSlots);
    }
  };

  const common = BINGO_GRID_SIZE - raritySlots.rare - raritySlots.epic;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Difficulty</DialogTitle>
        <DialogDescription>Set rarity targets for new cards.</DialogDescription>
      </DialogHeader>

      <div className="flex items-center space-x-2">
        <Label>Simple</Label>
        <Switch checked={isAdvanced} onCheckedChange={handleModeToggle} />
        <Label>Advanced</Label>
      </div>

      {!isAdvanced ? (
        <div className="space-y-2">
          <ToggleGroup
            aria-label="Difficulty preset"
            className="grid grid-cols-3 pb-1"
            type="single"
            value={String(currentPresetIndex)}
            onValueChange={(value) => {
              if (value) setRaritySlots(PRESETS[Number(value)]);
            }}
          >
            {PRESET_LABELS.map((label, index) => (
              <ToggleGroupItem
                key={label}
                value={String(index)}
                className="h-10"
              >
                {label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <dl className="grid grid-cols-3 gap-2 pt-2 text-center">
            {[
              ['Common', common],
              ['Rare', raritySlots.rare],
              ['Epic', raritySlots.epic],
            ].map(([label, count]) => (
              <div key={label} className="rounded-md bg-secondary p-2">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-lg font-semibold">{count}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label>Rare</Label>
            <Input
              type="number"
              value={raritySlots.rare}
              onChange={(e) =>
                handleAdvancedChange('rare', parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Epic</Label>
            <Input
              type="number"
              value={raritySlots.epic}
              onChange={(e) =>
                handleAdvancedChange('epic', parseInt(e.target.value) || 0)
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Common (Read-only)</Label>
            <Input value={common} readOnly />
          </div>
        </div>
      )}
      <DialogClose asChild>
        <Button variant="secondary" className="w-full">
          Close
        </Button>
      </DialogClose>
    </DialogContent>
  );
}
