import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export const Topbar = () => {
  return (
    <div className="flex w-full py-3 px-4">
      <div className="p-2">
        <Link href={"/generator"} className="w-full">
          <div className="hover:bg-secondary rounded-md p-2 w-full">
            <div className="w-6 h-6 bg-secondary-foreground rounded-[6px]"></div>
          </div>
        </Link>
      </div>
      <div className="w-full flex items-center justify-center">
        <h1 className="text-2xl w-full text-center font-bold">Skattjakt</h1>
      </div>
      <div className="p-2">
        <ModeToggle />
      </div>
    </div>
  );
};
