"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, TrendingUp, AlertTriangle, ListChecks, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { FloatingShapes } from "@/components/floating-shapes";
import { Reveal } from "@/components/reveal";
import { submitLead } from "@/lib/submit";

const yesNo = ["stem", "robotics", "coding", "ai", "lab", "competitions"] as const;
type YesNoKey = (typeof yesNo)[number];

const labels: Record<YesNoKey, string> = {
  stem: "Does your school have a STEM program?",
  robotics: "Does your school teach Robotics?",
  coding: "Does your school teach Coding?",
  ai: "Does your school teach AI?",
  lab: "Do you have a robotics lab?",
  competitions: "Do you join competitions?",
};

type Form = Record<YesNoKey, "" | "yes" | "no"> & { students: string; stages: string; activities: string; schoolName: string; email: string };

const initial: Form = {
  stem: "", robotics: "", coding: "", ai: "", lab: "", competitions: "",
  students: "", stages: "", activities: "", schoolName: "", email: "",
};

export function SchoolReadiness() {
  const { toast } = useToast();
  const [form, setForm] = useState<Form>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof Form) => (e: React.ChangeEvent<any>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const score = useMemo(() => {
    const yesCount = yesNo.filter((k) => form[k] === "yes").length;
    const base = Math.round((yesCount / yesNo.length) * 100);
    return Math.min(100, base);
  }, [form]);

  const strengths = yesNo.filter((k) => form[k] === "yes").map((k) => labels[k].replace("Does your school ", "").replace("Do you ", "").replace("?", ""));
  const gaps = yesNo.filter((k) => form[k] === "no").map((k) => labels[k].replace("Does your school ", "").replace("Do you ", "").replace("?", ""));

  const nextSteps = gaps.length
    ? ["Introduce the missing tracks with our plug-and-play curriculum", "Deploy certified trainers and robotics kits", "Enter students into national & international competitions", "Add dashboards, portfolios and certificates"]
    : ["Scale to full academic integration KG→Secondary", "Grow your competition team internationally", "Add advanced AI & machine learning tracks"];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (yesNo.some((k) => form[k] === "") || !form.students) {
      setError("Please answer all readiness questions and select number of students.");
      return;
    }
    setError("");
    submitLead("school-readiness", { form, score });
    setSubmitted(true);
    toast({ title: "Readiness score ready", description: `Your school scored ${score}%.` });
  }

  return (
    <section className="relative overflow-hidden">
      <FloatingShapes />
      <div className="container-x relative max-w-3xl py-16">
        <div className="text-center">
          <span className="eyebrow mb-4">School Readiness</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Is Your School Ready For Future Skills Education?</h1>
          <p className="mt-3 text-slate-600">Answer 9 quick questions and get an instant readiness score with next steps.</p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card-surface mt-10 grid gap-5 p-6 sm:grid-cols-2 sm:p-8" noValidate>
              {yesNo.map((k) => (
                <Field key={k} label={labels[k]} htmlFor={k} required>
                  <Select id={k} value={form[k]} onChange={set(k)}>
                    <option value="">Select…</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </Field>
              ))}
              <Field label="Number of students" htmlFor="students" required>
                <Select id="students" value={form.students} onChange={set("students")}>
                  <option value="">Select…</option>
                  <option>Under 200</option><option>200–500</option><option>500–1,000</option><option>1,000+</option>
                </Select>
              </Field>
              <Field label="Educational stages" htmlFor="stages">
                <Select id="stages" value={form.stages} onChange={set("stages")}>
                  <option value="">Select…</option>
                  <option>KG only</option><option>KG–Primary</option><option>KG–Prep</option><option>KG–Secondary</option>
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Current activities" htmlFor="activities">
                  <Input id="activities" value={form.activities} onChange={set("activities")} placeholder="e.g. after-school clubs, science fairs (optional)" />
                </Field>
              </div>
              <Field label="School name" htmlFor="schoolName">
                <Input id="schoolName" value={form.schoolName} onChange={set("schoolName")} placeholder="Optional" />
              </Field>
              <Field label="Email" htmlFor="email">
                <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="Optional — to receive the report" />
              </Field>
              {error && <p className="sm:col-span-2 text-sm font-medium text-red-500">{error}</p>}
              <div className="sm:col-span-2"><Button type="submit" size="lg" className="w-full">Get My Readiness Score</Button></div>
            </motion.form>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
              <div className="card-surface overflow-hidden p-0">
                <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-brand-600 to-grape-600 p-10 text-center text-white">
                  <ScoreRing value={score} />
                  <p className="max-w-md text-white/85">
                    {score >= 75 ? "Excellent — your school is well on its way." : score >= 40 ? "A solid start with clear room to grow." : "Big opportunity ahead — we can help you build fast."}
                  </p>
                </div>
                <div className="grid gap-6 p-8 md:grid-cols-3">
                  <Panel icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} title="Strengths" items={strengths.length ? strengths : ["Ready to build from a clean slate"]} />
                  <Panel icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} title="Missing Opportunities" items={gaps.length ? gaps : ["None — you're comprehensive!"]} />
                  <Panel icon={<ListChecks className="h-5 w-5 text-brand-500" />} title="Recommended Next Steps" items={nextSteps} />
                </div>
                <div className="flex flex-col gap-3 border-t border-slate-100 p-8 sm:flex-row">
                  <Button asChild size="lg" className="flex-1"><Link href="/contact?type=demo">Book Free Consultation</Link></Button>
                  <Button asChild variant="secondary" size="lg" className="flex-1"><Link href="/contact?type=proposal">Request Proposal</Link></Button>
                  <Button variant="outline" size="lg" className="flex-1" onClick={() => toast({ title: "Report downloading", description: "School Readiness Report (demo)." })}>
                    <Download className="h-4 w-4" /> Download Report
                  </Button>
                </div>
              </div>
              <div className="mt-6 text-center"><button onClick={() => { setSubmitted(false); setForm(initial); }} className="text-sm font-semibold text-slate-500 hover:text-ink">Retake assessment</button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" />
        <motion.circle cx="60" cy="60" r={r} fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (c * value) / 100 }} transition={{ duration: 1.2, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold">{value}%</span>
        <span className="text-xs uppercase tracking-wide text-white/80">Readiness</span>
      </div>
    </div>
  );
}

function Panel({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-bold text-ink">{icon} {title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm capitalize text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" /> {it}</li>
        ))}
      </ul>
    </div>
  );
}
