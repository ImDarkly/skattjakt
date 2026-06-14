import { useEffect, useState } from 'react';
import { useBoundStore } from '@/lib/zustand/store';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../ui/dialog';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

const PRESETS = [
  { rare: 2, epic: 0 },
  { rare: 4, epic: 1 },
  { rare: 8, epic: 2 },
];

export function DifficultyDialog() {
  const { raritySlots, setRaritySlots } = useBoundStore();
  const [isAdvanced, setIsAdvanced] = useState(false);

  const currentPresetIndex = PRESETS.findIndex(
    (p) => p.rare === raritySlots.rare && p.epic === raritySlots.epic
  );

  useEffect(() => {
    if (currentPresetIndex === -1) {
      setSliderValue(1);
      setRaritySlots(PRESETS[1]);
    }
  }, [currentPresetIndex, setRaritySlots]);

  const [sliderValue, setSliderValue] = useState(
    currentPresetIndex === -1 ? 1 : currentPresetIndex
  );

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
      setSliderValue(closestIndex);
      setRaritySlots(PRESETS[closestIndex]);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const index = value[0];
    setSliderValue(index);
    setRaritySlots(PRESETS[index]);
  };

  const handleAdvancedChange = (key: 'rare' | 'epic', value: number) => {
    const newSlots = { ...raritySlots, [key]: value };
    if (
      newSlots.rare + newSlots.epic <= 25 &&
      newSlots.rare >= 0 &&
      newSlots.epic >= 0
    ) {
      setRaritySlots(newSlots);
    }
  };

  const common = 25 - raritySlots.rare - raritySlots.epic;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Difficulty</DialogTitle>
        <DialogDescription>Adjust rarity distribution.</DialogDescription>
      </DialogHeader>

      <div className="flex items-center space-x-2">
        <Label>Simple</Label>
        <Switch checked={isAdvanced} onCheckedChange={handleModeToggle} />
        <Label>Advanced</Label>
      </div>

      {!isAdvanced ? (
        <div className="space-y-2">
          <Slider
            value={[sliderValue]}
            min={0}
            max={2}
            step={1}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between px-1 text-xs text-muted-foreground">
            <span>Easy</span>
            <span>Normal</span>
            <span>Hard</span>
          </div>
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
