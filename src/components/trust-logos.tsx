import { schoolLogos } from "@/lib/data";

export function TrustLogos() {
  const doubled = [...schoolLogos, ...schoolLogos];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-4">
        {doubled.map((name, i) => (
          <div key={i} className="flex h-14 w-40 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white text-sm font-bold text-slate-400 shadow-sm">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
