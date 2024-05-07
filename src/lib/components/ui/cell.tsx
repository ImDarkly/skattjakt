import { Icon } from '@iconify/react';

type CellProps = {
  id: number;
  tag: string;
  name: string;
  checked?: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const Cell = ({
  id,
  tag,
  name,
  checked,
  onClick,
  disabled,
}: CellProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className={`group/cell relative ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      } style-preserve translate-3d flex items-center justify-center break-words transition-all active:translate-y-1 ${checked ? 'translate-y-1' : 'after after:absolute after:h-full after:w-full after:rounded-2xl after:bg-stone-200 after:transition-transform after:dark:bg-stone-800 '}`}
    >
      <div
        className={`hover: h-full w-full rounded-2xl bg-card p-3 ${checked ? 'opacity-30' : ''} ${disabled ? '' : 'ring-2 ring-inset ring-stone-300 dark:ring-stone-700'}`}
      >
        <img
          src={`./items/${tag}.png`}
          alt={name}
          width={16}
          height={16}
          className="w-full transition-transform group-hover/cell:scale-0"
        />
        <div className="group-hover/cell invisible absolute left-2/4 top-2/4 flex h-full w-full -translate-x-2/4 -translate-y-2/4 transform items-center justify-center break-words bg-card text-center opacity-0 ring-2 ring-inset ring-stone-300 group-hover/cell:visible group-hover/cell:rounded-2xl group-hover/cell:opacity-100 dark:ring-stone-600">
          <p
            key={id}
            className="flex h-full w-full items-center justify-center p-1 text-xs text-secondary-foreground md:text-sm xl:text-base"
          >
            {name}
          </p>
        </div>
      </div>
      <div
        className={`${
          checked ? 'visible opacity-100' : 'invisible opacity-0'
        } absolute left-2/4 top-2/4 flex h-full w-full -translate-x-2/4 -translate-y-2/4 transform items-center justify-center rounded-2xl ring-2 ring-inset ring-stone-200 dark:ring-stone-900`}
      >
        <p
          key={id}
          className="flex h-full w-full items-center justify-center p-1 text-xs text-secondary-foreground md:text-sm xl:text-base"
        >
          <Icon
            icon={checked ? 'line-md:confirm' : ''}
            className="text-5xl sm:text-7xl"
          />
        </p>
      </div>
    </button>
  );
};
