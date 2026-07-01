import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/lib/data";

const trackIcon: Record<Program["track"], string> = {
  Robotics: "Bot", Coding: "Code2", AI: "BrainCircuit",
};
const trackTone: Record<Program["track"], string> = {
  Robotics: "from-brand-500 to-brand-700",
  Coding: "from-accent-400 to-accent-600",
  AI: "from-grape-500 to-grape-700",
};

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="card-surface group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-glow">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${trackTone[program.track]}`}>
        <Icon name={trackIcon[program.track]} className="h-6 w-6" />
      </div>
      <div className="mb-2 flex items-center gap-2">
        <Badge>{program.track}</Badge>
        <span className="text-xs font-medium text-slate-400">Ages {program.ages}</span>
      </div>
      <h3 className="text-lg font-bold text-ink">{program.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{program.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {program.outcomes.map((o) => (
          <li key={o} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">{o}</li>
        ))}
      </ul>
    </article>
  );
}
