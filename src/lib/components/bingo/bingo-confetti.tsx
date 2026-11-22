import type { CSSProperties } from 'react';

export type Celebration = {
  sequence: number;
  kind: 'line' | 'card';
  x: number;
  y: number;
};

type BingoConfettiProps = {
  celebration: Celebration;
  onEnd: () => void;
};

const colors = ['#f43f5e', '#fbbf24', '#34d399', '#38bdf8', '#a78bfa'];

export const BingoConfetti = ({ celebration, onEnd }: BingoConfettiProps) => {
  const fullCard = celebration.kind === 'card';
  const count = fullCard ? 64 : 16;
  const duration = fullCard ? 1050 : 550;
  const clampOrigin = (percent: number) => Math.min(84, Math.max(16, percent));
  const left = fullCard ? '50%' : `${clampOrigin(celebration.x)}%`;
  const top = fullCard ? '46%' : `${clampOrigin(celebration.y)}%`;

  return (
    <div
      aria-hidden="true"
      data-celebration={celebration.kind}
      className="pointer-events-none invisible absolute inset-0 z-10 overflow-hidden motion-safe:visible"
    >
      {Array.from({ length: count }, (_, index) => {
        const angle = index * 2.4;
        const distance =
          (fullCard ? 90 : 24) + ((index * 13) % 31) * (fullCard ? 5 : 2);
        const style = {
          left,
          top,
          backgroundColor: colors[index % colors.length],
          animation: `bingo-confetti ${duration}ms ${index * (fullCard ? 3 : 4)}ms cubic-bezier(0.16, 0.8, 0.32, 1) both`,
          '--confetti-x': `${Math.cos(angle) * distance}px`,
          '--confetti-y': `${Math.sin(angle) * distance + (fullCard ? 32 : 12)}px`,
          '--confetti-spin': `${index % 2 ? 290 : -290}deg`,
        } as CSSProperties;

        return (
          <span
            key={index}
            className={
              fullCard
                ? 'absolute h-2.5 w-1.5 rounded-sm'
                : 'absolute h-1.5 w-1 rounded-sm'
            }
            style={style}
            onAnimationEnd={index === count - 1 ? onEnd : undefined}
          />
        );
      })}
    </div>
  );
};
