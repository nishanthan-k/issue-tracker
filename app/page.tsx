import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </main>
  );
}
