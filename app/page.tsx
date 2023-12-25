import Link from "next/link";

export default function Home() {
  return (
    <div className="flex bg-background text-foreground h-full flex-col items-center">
      <Link href={"/"}>Home</Link>
    </div>
  );
}
