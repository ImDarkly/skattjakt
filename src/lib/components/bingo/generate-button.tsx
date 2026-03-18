import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBoundStore } from '../../zustand/store';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '../ui/button';
import generateCard from '@/lib/domain/card/generateCard';
import { Item } from '@/lib/domain/items/types';

export const GenerateButton = () => {
  const { items, setCard, addToHistory, history } = useBoundStore(
    useShallow((state) => ({
      items: state.items,
      setCard: state.setCard,
      addToHistory: state.addToHistory,
      history: state.history,
    }))
  );
  const [spinning, setSpinning] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGenerateAndSetCard = () => {
    setSpinning(true);
    const generatedCard = generateCard(
      items.filter((item) => item.isEligible === true)
    );
    setCard(generatedCard);
    addToHistory({
      card: generatedCard,
      title: `Card #${history.length + 1}`,
      favourite: false,
    });
    const link = generatedCard
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
