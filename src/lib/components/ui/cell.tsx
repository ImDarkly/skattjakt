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
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      className={`group/cell relative ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }  flex items-center justify-center overflow-hidden break-words rounded-[8px] transition-all`}
    >
      <div
        className={`h-full w-full bg-card p-3 ${checked ? 'opacity-30' : ''}`}
      >
        <img
          src={`./items/${tag}.png`}
          alt={name}
          width={16}
          height={16}
          className="w-full transition-transform group-hover/cell:scale-0"
        />
        <div className="invisible absolute left-2/4 top-2/4 flex h-full w-full -translate-x-2/4 -translate-y-2/4 transform items-center justify-center break-words bg-secondary text-center opacity-0 transition-opacity group-hover/cell:visible group-hover/cell:opacity-100">
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
        } absolute left-2/4 top-2/4 flex h-full w-full -translate-x-2/4 -translate-y-2/4 transform items-center justify-center transition-all`}
      >
        <p
          key={id}
          className="flex h-full w-full items-center justify-center p-1 text-xs text-primary md:text-sm xl:text-base"
        >
          <Icon
            icon={checked ? 'line-md:confirm' : ''}
            className="text-5xl sm:text-7xl"
          />
        </p>
      </div>
    </div>
  );
};
