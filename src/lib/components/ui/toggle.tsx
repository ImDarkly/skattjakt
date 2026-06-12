import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/styles/utils';

// Original toggleVariants for compatibility
const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      // 1. BASE BUTTON STYLES (Copied exactly from button.tsx)
      'translate-3d ring-2 ring-inset after:absolute after:h-full after:w-full after:rounded-md after:bg-primary after:transition-transform active:translate-y-1 style-preserve relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

      // 2. Icon Sizing
      'h-10 w-10 p-0',

      // 3. Secondary variant styles (Copied exactly from button.tsx)
      'bg-secondary text-secondary-foreground ring-stone-300 dark:ring-stone-700 after:bg-stone-200 dark:after:bg-stone-800',

      // 4. ACTIVE/TOGGLED STATE
      // Move body down
      'data-[state=on]:translate-y-1',
      // Change color
      'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:ring-accent',
      // Hide the shadow (collapse after element height)
      'data-[state=on]:after:h-0',

      className
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
