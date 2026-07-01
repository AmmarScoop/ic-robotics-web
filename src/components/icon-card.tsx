import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

export function IconCard({
  icon, title, blurb, index = 0, tone = "brand",
}: { icon: string; title: string; blurb?: string; index?: number; tone?: "brand" | "grape" | "accent" }) {
  const tones = {
    brand: "from-brand-500 to-brand-700",
    grape: "from-grape-500 to-grape-700",
    accent: "from-accent-400 to-accent-600",
  } as const;
  return (
    <Reveal delay={index * 0.06}>
      <div className="card-surface flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-glow">
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${tones[tone]}`}>
          <Icon name={icon} className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-ink">{title}</h3>
        {blurb && <p className="mt-2 text-sm leading-relaxed text-slate-600">{blurb}</p>}
      </div>
    </Reveal>
  );
}
