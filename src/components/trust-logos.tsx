import fs from "fs";
import path from "path";
import { schoolLogos } from "@/lib/data";

type Partner = { name: string; logo: string | null };

function loadPartners(): Partner[] {
  try {
    const file = path.join(process.cwd(), "public", "partners", "partners.txt");
    const partners = fs
      .readFileSync(file, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const [name, logo] = line.split("|").map((s) => s.trim());
        return { name, logo: logo ? `/partners/${encodeURIComponent(logo)}` : null };
      })
      .filter((p) => p.name);
    if (partners.length > 0) return partners;
  } catch {
    // fall through to defaults
  }
  return schoolLogos.map((name) => ({ name, logo: null }));
}

export function TrustLogos() {
  const partners = loadPartners();
  const doubled = [...partners, ...partners];
  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-4 py-3 group-hover:[animation-play-state:paused]">
        {doubled.map((p, i) => (
          <div key={i} className="flex h-14 min-w-40 shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 text-sm font-bold text-slate-500 shadow-sm transition-transform duration-300 ease-out hover:scale-110 hover:shadow-md">
            {p.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.logo} alt={`${p.name} logo`} className="h-9 w-auto object-contain" />
            )}
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
