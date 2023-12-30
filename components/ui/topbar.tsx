import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import SkattjaktLogo from "@/assets/skattjakt-logo.svg";

export const Topbar = () => {
  return (
    <div className="sticky top-0 w-full">
      <div className="flex h-20 w-full py-3 px-4 bg-background/80 backdrop-blur-xl items-center">
        <div>
          <Link href={"/generator"} className="w-full">
            <div className="hover:bg-secondary rounded-md p-2 w-full">
              <SkattjaktLogo />
            </div>
          </Link>
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-2xl w-full text-center font-bold">Skattjakt</h1>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
