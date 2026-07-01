"use client";
import Link from "next/link";
import { Download, Sparkles, Briefcase, Target, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Reveal } from "@/components/reveal";

export type ResultData = {
  personality: string;
  path: string;
  course: string;
  skills: string[];
  jobs: string[];
  summary: string;
};

export function ResultCard({ result }: { result: ResultData }) {
  const { toast } = useToast();
  return (
    <Reveal>
      <div className="card-surface overflow-hidden p-0">
        <div className="bg-gradient-to-br from-brand-600 to-grape-600 p-8 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="h-3.5 w-3.5" /> Your Child&apos;s Result
          </span>
          <h3 className="mt-4 text-3xl font-extrabold">{result.personality}</h3>
          <p className="mt-2 max-w-xl text-white/85">{result.summary}</p>
        </div>
        <div className="grid gap-6 p-8 sm:grid-cols-2">
          <Row icon={<Target className="h-5 w-5 text-brand-600" />} label="Recommended Path" value={result.path} />
          <Row icon={<GraduationCap className="h-5 w-5 text-grape-600" />} label="Recommended Course" value={result.course} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Skills to Develop</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {result.skills.map((s) => <li key={s} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{s}</li>)}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400"><Briefcase className="h-3.5 w-3.5" /> Future Jobs</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {result.jobs.map((j) => <li key={j} className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">{j}</li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-100 p-8 sm:flex-row">
          <Button asChild size="lg" className="flex-1"><Link href="/contact?type=demo">Book Trial Session</Link></Button>
          <Button
            variant="outline" size="lg" className="flex-1"
            onClick={() => toast({ title: "Report ready", description: "Your child's report download has started (demo)." })}
          >
            <Download className="h-4 w-4" /> Download Child Report
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-base font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}
