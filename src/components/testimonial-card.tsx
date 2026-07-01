import { Quote } from "lucide-react";
import type { Story } from "@/lib/data";

export function TestimonialCard({ story }: { story: Story }) {
  const initials = story.name.split(" ").map((s) => s[0]).slice(0, 2).join("");
  return (
    <figure className="card-surface flex h-full flex-col p-6">
      <Quote className="h-7 w-7 text-brand-200" />
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">“{story.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-grape-500 text-sm font-bold text-white">
          {initials}
        </span>
        <div>
          <p className="text-sm font-bold text-ink">{story.name}</p>
          <p className="text-xs text-slate-500">{story.role}</p>
        </div>
        <span className="ml-auto rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-600">
          {story.type}
        </span>
      </figcaption>
    </figure>
  );
}
