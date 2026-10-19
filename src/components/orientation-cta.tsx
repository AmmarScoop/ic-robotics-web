import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import type { SiteContent } from "@/lib/site-defaults";

export function OrientationCTA({ data }: { data: SiteContent["contact"]["orientation"] }) {
  return (
    <section className="container-x my-16">
      <Reveal>
        <div className="card-surface grid items-center gap-8 p-8 lg:grid-cols-[1.2fr_1fr] sm:p-10">
          <div>
            {data.eyebrow && <span className="eyebrow mb-4">{data.eyebrow}</span>}
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{data.title}</h2>
            {data.body && <p className="mt-3 text-slate-600">{data.body}</p>}
            {data.button.label && <Button asChild size="lg" className="mt-6"><Link href={data.button.href}>{data.button.label}</Link></Button>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {data.items.map((it) => (
              <div key={it.label} className="flex items-center gap-2 rounded-2xl bg-brand-50 p-4 text-sm font-semibold text-brand-700">
                <Icon name={it.icon} className="h-5 w-5 shrink-0" /> {it.label}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
