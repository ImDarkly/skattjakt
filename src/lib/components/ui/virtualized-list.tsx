import { cn } from '@/lib/styles/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ReactNode, useRef } from 'react';

interface VirtualizedListProps {
  count: number;
  estimateSize?: number;
  overscan?: number;
  className?: string;
  renderItem: (index: number) => ReactNode;
}

export default function VirtualizedList({
  count,
  estimateSize = 80,
  overscan = 5,
  className,
  renderItem,
}: VirtualizedListProps) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  return (
    <div
      ref={parentRef}
      className={cn('overlay-scroll h-full w-full overflow-auto', className)}
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            className="absolute top-0 left-0 w-full"
            style={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            {renderItem(virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
