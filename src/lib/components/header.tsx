interface HeaderProps {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

export default function Header({ left, title, right }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full">
      <div className="grid h-20 w-full grid-cols-[1fr_auto_1fr] items-center bg-background/20 px-4 py-3 backdrop-blur-xl">
        <div className="justify-self-start">{left}</div>
        <h1 className="px-2 text-center text-2xl font-bold">{title}</h1>
        <div className="justify-self-end">{right}</div>
      </div>
    </header>
  );
}
