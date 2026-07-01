import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function MediaPlaceholder({
  label = "Video preview", className, withPlay = true, tone = "brand",
}: { label?: string; className?: string; withPlay?: boolean; tone?: "brand" | "grape" | "accent" }) {
  const tones = {
    brand: "from-brand-500/15 to-brand-700/10 text-brand-700",
    grape: "from-grape-400/15 to-grape-600/10 text-grape-600",
    accent: "from-accent-300/25 to-accent-500/10 text-accent-700",
  } as const;
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br grid-dots",
        tones[tone], className
      )}
      role="img"
      aria-label={label}
    >
      {withPlay && (
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur">
          <Play className="ml-1 h-7 w-7 fill-current" />
        </span>
      )}
      <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wide opacity-70">{label}</span>
    </div>
  );
}
