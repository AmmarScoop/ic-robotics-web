import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-28 text-center">
      <p className="text-7xl font-extrabold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Button asChild className="mt-6"><Link href="/">Back to home</Link></Button>
    </section>
  );
}
