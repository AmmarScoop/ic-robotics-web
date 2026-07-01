"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/for-schools", label: "For Schools" },
  { href: "/programs", label: "Programs" },
  { href: "/competitions", label: "Competitions" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-lg">
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-ink">
          <LogoMark className="h-9 w-9" />
          <span className="text-lg">IC <span className="gradient-text">Robotics</span></span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700",
                pathname === l.href && "bg-brand-50 text-brand-700"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" size="sm"><Link href="/contact?type=demo">Book Free Demo</Link></Button>
          <Button asChild size="sm"><Link href="/contact?type=proposal">Request School Proposal</Link></Button>
        </div>

        <button
          className="lg:hidden rounded-lg p-2 text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline"><Link href="/contact?type=demo" onClick={() => setOpen(false)}>Book Free Demo</Link></Button>
              <Button asChild><Link href="/contact?type=proposal" onClick={() => setOpen(false)}>Request School Proposal</Link></Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
