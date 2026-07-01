"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export type LeadData = {
  parentName: string; phone: string; email: string; childAge: string; currentSchool: string;
};

const empty: LeadData = { parentName: "", phone: "", email: "", childAge: "", currentSchool: "" };

export function AssessmentForm({
  onSubmit, submitLabel = "Start Free Assessment", compact = false,
}: { onSubmit: (data: LeadData) => void; submitLabel?: string; compact?: boolean }) {
  const [data, setData] = useState<LeadData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

  const set = (k: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  function validate(d: LeadData) {
    const err: Partial<Record<keyof LeadData, string>> = {};
    if (!d.parentName.trim()) err.parentName = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(d.phone)) err.phone = "Enter a valid phone number";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) err.email = "Enter a valid email";
    if (!d.childAge) err.childAge = "Select an age";
    return err;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);
    if (Object.keys(err).length === 0) onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`} noValidate>
      <Field label="Parent Name" htmlFor="parentName" error={errors.parentName} required>
        <Input id="parentName" value={data.parentName} onChange={set("parentName")} placeholder="Your full name" autoComplete="name" />
      </Field>
      <Field label="Phone Number" htmlFor="phone" error={errors.phone} required>
        <Input id="phone" type="tel" value={data.phone} onChange={set("phone")} placeholder="+20 ..." autoComplete="tel" />
      </Field>
      <Field label="Email" htmlFor="email" error={errors.email} required>
        <Input id="email" type="email" value={data.email} onChange={set("email")} placeholder="you@email.com" autoComplete="email" />
      </Field>
      <Field label="Child Age" htmlFor="childAge" error={errors.childAge} required>
        <Select id="childAge" value={data.childAge} onChange={set("childAge")}>
          <option value="">Select age</option>
          {Array.from({ length: 14 }, (_, i) => i + 4).map((a) => (
            <option key={a} value={a}>{a} years</option>
          ))}
        </Select>
      </Field>
      <div className={compact ? "" : "sm:col-span-2"}>
        <Field label="Current School" htmlFor="currentSchool">
          <Input id="currentSchool" value={data.currentSchool} onChange={set("currentSchool")} placeholder="School name (optional)" />
        </Field>
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <Button type="submit" size="lg" className="w-full">{submitLabel}</Button>
      </div>
    </form>
  );
}
