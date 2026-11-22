import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

export type Celebration = {
  sequence: number;
  kind: 'line' | 'card';
  x: number;
  y: number;
};

type BingoConfettiProps = {
  celebration: Celebration;
  onEnd: (celebration: Celebration) => void;
};

const colors = ['#f43f5e', '#fbbf24', '#34d399', '#38bdf8', '#a78bfa'];

export const BingoConfetti = ({ celebration, onEnd }: BingoConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const burst = confetti.create(canvasRef.current, {
      resize: true,
      disableForReducedMotion: true,
    });
    const fullCard = celebration.kind === 'card';
    const clampOrigin = (percent: number) =>
      Math.min(0.84, Math.max(0.16, percent / 100));

    let active = true;
    const animation = burst({
      colors,
      particleCount: fullCard ? 90 : 18,
      spread: fullCard ? 110 : 65,
      startVelocity: fullCard ? 33 : 13,
      ticks: fullCard ? 115 : 42,
      scalar: fullCard ? 1 : 0.65,
      origin: fullCard
        ? { x: 0.5, y: 0.62 }
        : { x: clampOrigin(celebration.x), y: clampOrigin(celebration.y) },
    });

    if (animation) {
      void animation.then(() => {
        if (active) onEnd(celebration);
      });
    } else {
      onEnd(celebration);
    }

    return () => {
      active = false;
      burst.reset();
    };
  }, [celebration, onEnd]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-celebration={celebration.kind}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
};
