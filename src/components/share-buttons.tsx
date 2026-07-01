"use client";
import { Linkedin, Facebook, MessageCircle, Link2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function ShareButtons({ title }: { title: string }) {
  const { toast } = useToast();
  const url = typeof window !== "undefined" ? window.location.href : "https://icrobotics.example";
  const enc = encodeURIComponent(url);
  const encT = encodeURIComponent(title);

  const links = [
    { icon: Linkedin, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`, cls: "bg-[#0a66c2]" },
    { icon: Facebook, label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`, cls: "bg-[#1877f2]" },
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/?text=${encT}%20${enc}`, cls: "bg-[#25d366]" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 ${l.cls}`}>
          <l.icon className="h-4 w-4" /> {l.label}
        </a>
      ))}
      <button
        onClick={() => { navigator.clipboard?.writeText(url); toast({ title: "Link copied", description: "Portfolio link copied to clipboard." }); }}
        className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:bg-brand-50"
      >
        <Link2 className="h-4 w-4" /> Copy link
      </button>
    </div>
  );
}
