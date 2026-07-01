import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow, title, subtitle, center = true, className,
}: { eyebrow?: string; title: string; subtitle?: string; center?: boolean; className?: string }) {
  return (
    <Reveal className={cn(center && "text-center", "mx-auto max-w-2xl", className)}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-600">{subtitle}</p>}
    </Reveal>
  );
}
