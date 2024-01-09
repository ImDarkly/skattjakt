import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Cell } from "./cell";

type Card = {
  id: number;
  name: string;
  title: string;
};

type BingoCardGridProps = {
  card: Card[];
  onGenerateClick: () => void;
};

export const BingoCard = ({ card, onGenerateClick }: BingoCardGridProps) => {
  const [isSpinning, setSpinning] = useState(false);

  const handleGenerateClick = () => {
    setSpinning(true);
    onGenerateClick();
  };

  useEffect(() => {
    if (isSpinning) {
      const timeoutId = setTimeout(() => {
        setSpinning(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isSpinning]);

  return (
    <div className="h-full flex-1 w-full flex items-center justify-center flex-col px-4 z-0">
      <div className="flex items-center justify-center flex-col max-w-xl w-full gap-6">
        <div className="flex flex-row h-12 w-full items-center">
          <div className="flex flex-row w-full items-center justify-center">
            <h1 className="text-2xl">Bingo card generator</h1>
          </div>
        </div>
        <div className="w-full aspect-square grid grid-cols-5 grid-rows-5 rounded-2xl overflow-hidden group/card gap-2">
          {card.map(({ id, name, title }) => (
            <Cell key={id} name={name} title={title} />
          ))}
        </div>
        <div className="h-12 w-full flex flex-row items-center justify-center gap-2">
          <Button className="w-full sm:w-auto" onClick={handleGenerateClick}>
            <ArrowPathIcon
              width={24}
              className={`${isSpinning ? "animate-spin" : ""}`}
            />
            Regenerate
          </Button>
        </div>
      </div>
    </div>
  );
};
