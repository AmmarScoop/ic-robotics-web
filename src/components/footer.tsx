import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { LogoMark } from "@/components/logo";

const cols = [
  { title: "Programs", links: [["Robotics", "/programs"], ["Coding", "/programs"], ["AI", "/programs"], ["Competitions", "/competitions"]] },
  { title: "Schools", links: [["For Schools", "/for-schools"], ["School Readiness", "/school-readiness-assessment"], ["Request Proposal", "/contact?type=proposal"], ["Book Demo", "/contact?type=demo"]] },
  { title: "Explore", links: [["Success Stories", "/success-stories"], ["Blog", "/blog"], ["About", "/about"], ["Verify Certificate", "/verify"]] },
  { title: "For Parents", links: [["Child Assessment", "/child-assessment"], ["Student Dashboard", "/student-dashboard"], ["Portfolio Example", "/student/ahmed"], ["Register Competition", "/competition-registration"]] },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-100 bg-slate-50/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-ink">
            <LogoMark className="h-9 w-9" />
            <span className="text-lg">IC <span className="gradient-text">Robotics</span></span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            Preparing children for the future through Robotics, Coding, AI and STEM — for schools and parents.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-500" /> info@icroboticsschools.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-500" /> 01044424957</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> Ahmed Maher, Al-Toukhy Tower, next to CIB Bank</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> Gezira El Ward Club, next to El Mohamady Restaurant</li>
          </ul>
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
          <p>© {new Date().getFullYear()} I.C Robotics Schools. All rights reserved.</p>
          <p>STEM Accredited • International Competitions • School Partnerships</p>
        </div>
      </div>
    </footer>
  );
}
