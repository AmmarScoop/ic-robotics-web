"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitLead } from "@/lib/submit";
import { competitions } from "@/lib/data";

type Data = {
  studentName: string; parentName: string; phone: string; email: string;
  age: string; school: string; competition: string; experience: string;
};

export function CompetitionRegisterForm() {
  const params = useSearchParams();
  const preset = params.get("competition") ?? "";
  const { toast } = useToast();
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Data>({
    studentName: "", parentName: "", phone: "", email: "", age: "", school: "",
    competition: competitions.some((c) => c.id === preset) ? preset : competitions[0].id,
    experience: "Beginner",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});

  const set = (k: keyof Data) => (e: React.ChangeEvent<any>) => setData((d) => ({ ...d, [k]: e.target.value }));

  function validate(d: Data) {
    const err: Partial<Record<keyof Data, string>> = {};
    if (!d.studentName.trim()) err.studentName = "Enter the student's name";
    if (!d.parentName.trim()) err.parentName = "Enter the parent's name";
    if (!/^[+\d][\d\s-]{6,}$/.test(d.phone)) err.phone = "Enter a valid phone number";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) err.email = "Enter a valid email";
    if (!d.age) err.age = "Select an age";
    return err;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);
    if (Object.keys(err).length) return;
    submitLead("competition-registration", data);
    toast({ title: "Registration received!", description: "We'll contact you with next steps and training dates." });
    setDone(true);
  }

  if (done) {
    const comp = competitions.find((c) => c.id === data.competition);
    return (
      <div className="card-surface flex flex-col items-center p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"><CheckCircle2 className="h-9 w-9 text-emerald-500" /></div>
        <h3 className="mt-4 text-2xl font-extrabold text-ink">You&apos;re registered!</h3>
        <p className="mt-2 max-w-sm text-slate-600">{data.studentName} is registered for <span className="font-semibold text-brand-700">{comp?.name}</span>. Our team will reach out with training details.</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setDone(false)} variant="outline">Register another student</Button>
          <Button asChild><Link href="/competitions">Explore competitions</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface grid gap-4 p-6 sm:grid-cols-2 sm:p-8" noValidate>
      <div className="sm:col-span-2 flex items-center gap-2 text-brand-700"><Trophy className="h-5 w-5" /><h2 className="font-bold">Competition Registration</h2></div>
      <Field label="Student Name" htmlFor="r-student" error={errors.studentName} required>
        <Input id="r-student" value={data.studentName} onChange={set("studentName")} placeholder="Student full name" />
      </Field>
      <Field label="Parent Name" htmlFor="r-parent" error={errors.parentName} required>
        <Input id="r-parent" value={data.parentName} onChange={set("parentName")} placeholder="Parent full name" />
      </Field>
      <Field label="Phone" htmlFor="r-phone" error={errors.phone} required>
        <Input id="r-phone" type="tel" value={data.phone} onChange={set("phone")} placeholder="+20 ..." />
      </Field>
      <Field label="Email" htmlFor="r-email" error={errors.email} required>
        <Input id="r-email" type="email" value={data.email} onChange={set("email")} placeholder="you@email.com" />
      </Field>
      <Field label="Age" htmlFor="r-age" error={errors.age} required>
        <Select id="r-age" value={data.age} onChange={set("age")}>
          <option value="">Select age</option>
          {Array.from({ length: 14 }, (_, i) => i + 4).map((a) => <option key={a} value={a}>{a} years</option>)}
        </Select>
      </Field>
      <Field label="School" htmlFor="r-school">
        <Input id="r-school" value={data.school} onChange={set("school")} placeholder="School name (optional)" />
      </Field>
      <Field label="Competition" htmlFor="r-comp" required>
        <Select id="r-comp" value={data.competition} onChange={set("competition")}>
          {competitions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </Field>
      <Field label="Experience Level" htmlFor="r-exp" required>
        <Select id="r-exp" value={data.experience} onChange={set("experience")}>
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Competed before</option>
        </Select>
      </Field>
      <div className="sm:col-span-2"><Button type="submit" size="lg" className="w-full">Submit Registration</Button></div>
    </form>
  );
}
