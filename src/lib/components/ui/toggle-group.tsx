'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/styles/utils';

const baseToggleClasses = cn(
  'translate-3d ring-2 ring-inset after:absolute after:h-full after:w-full after:rounded-md after:bg-primary after:transition-transform active:translate-y-1 style-preserve relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  'bg-secondary text-secondary-foreground ring-stone-300 dark:ring-stone-700 after:bg-stone-200 dark:after:bg-stone-800',
  'data-[state=on]:translate-y-1 data-[state=on]:after:h-0 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:ring-accent'
);

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      'flex items-center justify-start gap-1 flex-shrink-0',
      className
    )}
    {...props}
  />
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(baseToggleClasses, className)}
    {...props}
  />
));

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
