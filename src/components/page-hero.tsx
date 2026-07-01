import { Reveal } from "@/components/reveal";
import { FloatingShapes } from "@/components/floating-shapes";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow, title, subtitle, children, className,
}: { eyebrow?: string; title: string; subtitle?: string; children?: React.ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white", className)}>
      <FloatingShapes />
      <div className="container-x relative py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
          <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{title}</h1>
          {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{subtitle}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
