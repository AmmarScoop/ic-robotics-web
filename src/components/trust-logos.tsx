import type { Partner } from "@/lib/site-defaults";

/** Encodes spaces etc. in local /public paths; leaves full URLs untouched. */
function logoSrc(logo: string) {
  if (!logo) return null;
  if (/^https?:\/\//i.test(logo)) return logo;
  return logo.split("/").map((seg) => (seg ? encodeURIComponent(decodeURIComponent(seg)) : seg)).join("/");
}

export function TrustLogos({ partners }: { partners: Partner[] }) {
  const items = partners.filter((p) => p.name || p.logo);
  if (items.length === 0) return null;
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-4 py-3 group-hover:[animation-play-state:paused]">
        {doubled.map((p, i) => {
          const src = logoSrc(p.logo);
          return (
            <div key={i} className="flex h-14 min-w-40 shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 text-sm font-bold text-slate-500 shadow-sm transition-transform duration-300 ease-out hover:scale-110 hover:shadow-md">
              {src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={`${p.name} logo`} className="h-9 w-auto object-contain" />
              )}
              {p.name && <span>{p.name}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
