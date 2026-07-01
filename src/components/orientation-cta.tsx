import Link from "next/link";
import { Bot, BrainCircuit, Code2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const items = [
  { icon: Bot, label: "Robotics Demo" },
  { icon: BrainCircuit, label: "AI Demo" },
  { icon: Code2, label: "Coding Workshop" },
  { icon: MapPin, label: "Online or Offline in your school" },
];

export function OrientationCTA() {
  return (
    <section className="container-x my-16">
      <Reveal>
        <div className="card-surface grid items-center gap-8 p-8 lg:grid-cols-[1.2fr_1fr] sm:p-10">
          <div>
            <span className="eyebrow mb-4">Free STEM Demo</span>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Book a 45-minute School Orientation Day</h2>
            <p className="mt-3 text-slate-600">A hands-on session for your team and students — see robotics, AI and coding in action, then map a plan for your school.</p>
            <Button asChild size="lg" className="mt-6"><Link href="/contact?type=demo">Book School Demo</Link></Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {items.map((it) => (
              <div key={it.label} className="flex items-center gap-2 rounded-2xl bg-brand-50 p-4 text-sm font-semibold text-brand-700">
                <it.icon className="h-5 w-5 shrink-0" /> {it.label}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
