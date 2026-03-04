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
    if (!items.every((item) => item.isEligible === true)) {
      setIsAllEligible(false);
    } else {
      setIsAllEligible(true);
    }
  }, [items]);

  return (
    <Field orientation="horizontal" className="px-8">
      <FieldContent>
        <FieldLabel htmlFor="set-all-eligibility">
          Set aligibility for all
        </FieldLabel>
      </FieldContent>
      <Switch
        id="set-all-eligibility"
        checked={isAllEligible}
        onCheckedChange={toggleEligibility}
      />
    </Field>
  );
}
