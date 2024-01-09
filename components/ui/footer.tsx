import { HeartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="h-24 flex items-center justify-center gap-1 bg-background">
      <p>Made with</p>
      <HeartIcon width={20} className="text-primary" />
      <p>by</p>
      <Link
        href={"https://github.com/ImDarkly"}
        className="underline font-bold hover:text-primary"
      >
        ImDarkly
      </Link>
    </footer>
  );
};
