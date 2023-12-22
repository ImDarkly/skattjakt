import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-background text-foreground h-full flex-col items-center">
      <div className="flex gap-2 justify-center items-center w-full h-full flex-col">
        <div className="py-4 w-full flex justify-center">
          <Image
            src={"/skattjakt-logo.png"}
            alt="Skattjakt Logo"
            width={64}
            height={64}
          />
        </div>
        <div className="px-16 w-full flex justify-center py-4">
          <h1 className="text-7xl font-bold">Skattjakt</h1>
        </div>
      </div>
      <div className="flex h-full items-center">
        <div className="bg-rose-950 flex items-center py-4 px-8 rounded-lg gap-2">
          <ExclamationTriangleIcon width={16} className="fill-rose-300" />
          <p className="text-rose-300">Under development</p>
        </div>
      </div>
    </div>
  );
}
