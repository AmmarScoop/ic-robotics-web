"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 shadow-soft backdrop-blur-xl" : "bg-white/60 backdrop-blur-md"
      )}
    >
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-brand-600 via-accent-400 to-flag-500"
      />

      <nav className={cn("container-x flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20")} aria-label="Main">
        <Link href="/" className="group flex items-center gap-2.5 font-extrabold text-ink">
          <motion.span whileHover={{ rotate: -6, scale: 1.06 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="relative">
            <span className="absolute -inset-1 rounded-full bg-brand-400/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
            <LogoMark className="relative h-9 w-9" />
          </motion.span>
          <span className="text-lg tracking-tight">IC <span className="gradient-text">Robotics</span></span>
        </Link>

        <div
          className="relative hidden items-center gap-0.5 rounded-full border border-slate-200/70 bg-white/70 p-1 shadow-sm backdrop-blur xl:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => {
            const active = pathname === l.href;
            const showPill = hovered ? hovered === l.href : active;
            return (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                className="relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold"
              >
                {showPill && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-600 to-grape-500 shadow-soft"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={cn("relative z-10 transition-colors", showPill ? "text-white" : active ? "text-brand-700" : "text-slate-600")}>
                  {l.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="ghost" size="sm"><Link href="/contact?type=demo">Book Free Demo</Link></Button>
          <Button asChild size="sm" className="group">
            <Link href="/contact?type=proposal">
              <Sparkles className="h-4 w-4" /> Request Proposal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <button
          className="rounded-xl border border-slate-200 bg-white/70 p-2 text-ink transition hover:bg-brand-50 xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {links.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                        active ? "bg-gradient-to-r from-brand-600 to-grape-500 text-white" : "text-slate-700 hover:bg-brand-50"
                      )}
                    >
                      {l.label}
                      {active && <ArrowRight className="h-4 w-4" />}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-3 flex flex-col gap-2">
                <Button asChild variant="outline"><Link href="/contact?type=demo" onClick={() => setOpen(false)}>Book Free Demo</Link></Button>
                <Button asChild><Link href="/contact?type=proposal" onClick={() => setOpen(false)}><Sparkles className="h-4 w-4" /> Request School Proposal</Link></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
