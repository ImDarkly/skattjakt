interface HeaderProps {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

export default function Header({ left, title, right }: HeaderProps) {
  return (
    <div className="sticky top-0 z-10 w-full">
      <div className="flex h-20 w-full items-center bg-background/20 px-4 py-3 backdrop-blur-xl">
        <div>{left}</div>
        <div className="w-full px-2 text-center text-2xl font-bold">
          {title}
        </div>
        <div>{right}</div>
      </div>
    </div>
  );
}
