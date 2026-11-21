import { useEffect, useState } from 'react';
import { Field, FieldContent, FieldLabel } from '../ui/field';
import { Switch } from '../ui/switch';
import { useBoundStore } from '@/lib/zustand/store';
import { Item } from '@/lib/domain/items/types';

interface SetAllEligibilityProps {
  items: Item[];
}

export default function SetAllEligibility({ items }: SetAllEligibilityProps) {
  const [isAllEligible, setIsAllEligible] = useState<boolean>(false);
  const setEligibilityByIds = useBoundStore(
    (state) => state.setEligibilityByIds
  );

  function toggleEligibility(value: boolean) {
    setIsAllEligible(value);
    const ids = items.map((item) => item.id);
    setEligibilityByIds(ids, value);
  }

  useEffect(() => {
    setIsAllEligible(
      items.length > 0 && items.every((item) => item.isEligible === true)
    );
  }, [items]);

  return (
    <Field orientation="horizontal" className="px-6">
      <FieldContent>
        <FieldLabel htmlFor="set-all-eligibility">
          Set eligibility for all
        </FieldLabel>
      </FieldContent>
      <Switch
        id="set-all-eligibility"
        disabled={items.length === 0}
        checked={isAllEligible}
        onCheckedChange={toggleEligibility}
      />
    </Field>
  );
}
