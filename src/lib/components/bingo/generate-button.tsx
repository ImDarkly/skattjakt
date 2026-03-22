import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBoundStore } from '../../zustand/store';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '../ui/button';
import generateCard from '@/lib/domain/card/generateCard';
import { Item } from '@/lib/domain/items/types';

export function encodeCardToParams(card: Item[]): URLSearchParams {
  const params = new URLSearchParams();
  params.set('c', card.map((item) => item.id).join(','));
  return params;
}

export const GenerateButton = () => {
  const { items, setCard, addToCardsHistory, cardsHistory } = useBoundStore(
    useShallow((state) => ({
      items: state.items,
      setCard: state.setCard,
      addToCardsHistory: state.addToCardsHistory,
      cardsHistory: state.cardsHistory,
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
    addToCardsHistory({
      items: generatedCard,
      title: `Card #${cardsHistory.length + 1}`,
      favourite: false,
    });
    const link = encodeCardToParams(generatedCard);
    setSearchParams(link);
  };

  useEffect(() => {
    if (!searchParams.has('c')) {
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
