import Image from "next/image";

type CellProps = {
  name: string;
  title: string;
};

export const Cell = ({ name, title }: CellProps) => {
  return (
    <div className="p-3 group-hover/card:[&:not(:hover)]:opacity-50 relative group/cell bg-secondary rounded-[8px] flex items-center justify-center break-words overflow-hidden transition-opacity">
      <Image
        src={`/items/${name}.png`}
        alt={title}
        width={1080}
        height={1080}
        className="w-full group-hover/cell:scale-0 transition-transform"
      />
      <div className="opacity-0 invisible absolute left-2/4 top-2/4 transform -translate-x-2/4 bg-secondary -translate-y-2/4 break-words text-center w-full h-full group-hover/cell:visible group-hover/cell:opacity-100 transition-opacity flex items-center justify-center">
        <p
          key={name}
          className="flex text-secondary-foreground text-xs w-full h-full p-1 items-center justify-center"
        >
          {title}
        </p>
      </div>
    </div>
  );
};
