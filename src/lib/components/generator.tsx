import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useBoundStore } from '../zustand/store';

import { Button } from './ui/button';

export const Generator = () => {
  const [spinning, setSpinning] = useState(false);
  const setCard = useBoundStore().generateCard;
  const { card } = useBoundStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const cardLink =
    card.length === 25
      ? Array.from(
          { length: 25 },
          (_, index) => `b${index + 1}=${card[index].tag}`
        ).join('&')
      : '';

  // useEffect to generate an initial Bingo card on component mount
  useEffect(() => {
    if (searchParams.size === 0) {
      setCard();
    }
  }, [searchParams, setCard]);

  // useEffect to handle the spinning animation of the Generate button icon
  useEffect(() => {
    if (spinning) {
      const timeoutId = setTimeout(() => {
        setSpinning(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    return () => {};
  }, [spinning]);

  useEffect(() => {
    setSearchParams(cardLink);
  }, [cardLink, setSearchParams]);

  // Click event handler for the Generate button
  const handleRegenerate = () => {
    setSpinning(true);
    setCard();
    setSearchParams(cardLink);
  };

  return (
    <Button className="w-full" onClick={handleRegenerate}>
      <Icon
        className={`${spinning ? 'animate-spin' : ''} text-2xl`}
        icon="heroicons:arrow-path-16-solid"
      />
      Generate
    </Button>
  );
};
