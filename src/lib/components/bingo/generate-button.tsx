import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBoundStore } from '../../zustand/store';

import { Button } from '../ui/button';
import generateItems from '@/lib/domain/card/generateCard';
import { Item } from '@/lib/domain/items/types';

export const GenerateButton = () => {
  const items = useBoundStore((state) => state.items);
  const [spinning, setSpinning] = useState(false);
  const { setCard } = useBoundStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenerateAndSetCard = () => {
    setSpinning(true);
    const generatedItems = generateItems(
      items.filter((item) => item.isEligible === true)
    );
    setCard(generatedItems);
    const link = generatedItems
      .map((item: Item, index: number) => `b${index + 1}=${item.id}`)
      .join('&');
    setSearchParams(link);
  };

  useEffect(() => {
    if (!searchParams.has('b1')) {
      handleGenerateAndSetCard();
    }
  }, [searchParams]);

  useEffect(() => {
    if (!spinning) return;
    const timeoutId = setTimeout(() => {
      setSpinning(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [spinning]);

  return (
    <Button className="w-full" onClick={handleGenerateAndSetCard}>
      <Icon
        className={`${spinning ? 'animate-spin' : ''} text-2xl`}
        icon="heroicons:arrow-path-16-solid"
      />
      Generate
    </Button>
  );
};
