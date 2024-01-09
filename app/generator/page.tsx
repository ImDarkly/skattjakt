"use client";
import { Footer } from "@/components/ui/footer";
import { Topbar } from "@/components/ui/topbar";
import { BingoCard } from "@/components/ui/bingo-card";
import { useEffect, useState } from "react";
import items from "@/api/items.json";

export default function Generator() {
  const [card, setCard] = useState<
    { id: number; name: string; title: string }[]
  >([]);

  const generateCard = () => {
    const shuffledItems = items.slice().sort(() => Math.random() - 0.5);
    const selectedItems = new Set<{
      id: number;
      name: string;
      title: string;
    }>();

    while (selectedItems.size < 25 && shuffledItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * shuffledItems.length);
      const selectedItem = shuffledItems[randomIndex];

      selectedItems.add({
        id: selectedItem.id,
        name: selectedItem.name,
        title: selectedItem.title,
      });

      shuffledItems.splice(randomIndex, 1);
    }

    return Array.from(selectedItems);
  };

  useEffect(() => {
    const initialItems = generateCard();
    setCard(initialItems);
  }, []);

  const handleGenerateClick = () => {
    const newItems = generateCard();
    setCard(newItems);
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <Topbar />
      <BingoCard card={card} onGenerateClick={handleGenerateClick} />
      <Footer />
    </div>
  );
}
