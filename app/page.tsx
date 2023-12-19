import { HeartFilledIcon, MagicWandIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div className="flex bg-background text-foreground h-full flex-col items-center">
      <div className="flex gap-2 justify-center items-center w-full h-60 flex-row">
        <h1 className="text-7xl font-bold">
          <span className="text-primary">S</span>kattjakt
          <span className="text-primary">.gg</span>
        </h1>
      </div>
      <div className="flex h-full items-center">
        <div className="bg-primary/20 flex items-center py-4 px-8 rounded-lg">
          <p className="text-primary">Under construction</p>
          <MagicWandIcon className="ml-4 w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center w-full h-60 bg-card flex-row">
        <p>Made with love by Darkly</p>
        <HeartFilledIcon className="text-primary w-6 h-6" />
      </div>
    </div>
  );
}
