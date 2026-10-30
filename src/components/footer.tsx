import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Youtube, Linkedin, Music2 } from "lucide-react";
import { LogoMark } from "@/components/logo";
import type { SiteContent } from "@/lib/site-defaults";
import { whatsappLink } from "@/lib/whatsapp";

const cols = [
  { title: "Programs", links: [["Robotics", "/programs"], ["Coding", "/programs"], ["AI", "/programs"], ["Competitions", "/competitions"]] },
  { title: "Schools", links: [["For Schools", "/for-schools"], ["Contracting Systems", "/contracting-systems"], ["School Readiness", "/school-readiness-assessment"], ["Request Proposal", "/contact?type=proposal"], ["Book Demo", "/contact?type=demo"]] },
  { title: "Explore", links: [["Success Stories", "/success-stories"], ["Blog", "/blog"], ["About", "/about"], ["Verify Certificate", "/verify"]] },
  { title: "For Parents", links: [["Child Assessment", "/child-assessment"], ["Student Dashboard", "/student-dashboard"], ["Portfolio Example", "/student/ahmed"], ["Register Competition", "/competition-registration"]] },
];


export function Footer({ settings: s }: { settings: SiteContent["settings"] }) {
  const socials = [
    { href: s.social.facebook, icon: Facebook, label: "Facebook" },
    { href: s.social.instagram, icon: Instagram, label: "Instagram" },
    { href: s.social.youtube, icon: Youtube, label: "YouTube" },
    { href: s.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: s.social.tiktok, icon: Music2, label: "TikTok" },
  ].filter((x) => x.href);

  return (
    <footer className="mt-24 border-t border-slate-100 bg-slate-50/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-ink">
            <LogoMark className="h-9 w-9" src={s.logo} />
            <span className="text-lg">{s.brandFirst} <span className="gradient-text">{s.brandSecond}</span></span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">{s.footerBlurb}</p>
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            {s.email && (
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-500" /> <a href={`mailto:${s.email}`} className="hover:text-brand-700">{s.email}</a></li>
            )}
            {s.phone && (
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-500" /> <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-brand-700">{s.phone}</a></li>
            )}
            {s.whatsapp && (
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-brand-500" /> <a href={whatsappLink(s.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">WhatsApp {s.whatsapp}</a></li>
            )}
            {s.addresses.filter(Boolean).map((a) => (
              <li key={a} className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {a}</li>
            ))}
          </ul>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map((x) => (
                <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-brand-300 hover:text-brand-700">
                  <x.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold text-ink">{c.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-slate-600 transition hover:text-brand-700">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {s.copyrightName}. All rights reserved.</p>
          <p>{s.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
