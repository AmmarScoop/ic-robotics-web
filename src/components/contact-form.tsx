"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitLead } from "@/lib/submit";

const inquiryOptions = [
  { value: "proposal", label: "Request School Proposal" },
  { value: "demo", label: "Book School Demo" },
  { value: "parent", label: "Parent Inquiry" },
  { value: "competition", label: "Competition Registration" },
  { value: "partnership", label: "Partnership" },
];

type Data = { name: string; phone: string; email: string; organization: string; inquiryType: string; message: string };

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("type") ?? "";
  const { toast } = useToast();
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Data>({
    name: "", phone: "", email: "", organization: "",
    inquiryType: inquiryOptions.some((o) => o.value === preset) ? preset : "proposal",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});

  const set = (k: keyof Data) => (e: React.ChangeEvent<any>) => setData((d) => ({ ...d, [k]: e.target.value }));

  function validate(d: Data) {
    const err: Partial<Record<keyof Data, string>> = {};
    if (!d.name.trim()) err.name = "Please enter your name";
    if (!/^[+\d][\d\s-]{6,}$/.test(d.phone)) err.phone = "Enter a valid phone number";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) err.email = "Enter a valid email";
    if (!d.message.trim()) err.message = "Please add a short message";
    return err;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate(data);
    setErrors(err);
    if (Object.keys(err).length) return;
    submitLead("contact", data);
    toast({ title: "Message sent!", description: "Our team will reach out within 1 business day." });
    setDone(true);
  }

  if (done) {
    return (
      <div className="card-surface flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h3 className="mt-4 text-2xl font-extrabold text-ink">Thank you, {data.name.split(" ")[0]}!</h3>
        <p className="mt-2 max-w-sm text-slate-600">Your {inquiryOptions.find((o) => o.value === data.inquiryType)?.label.toLowerCase()} request has been received. We&apos;ll be in touch shortly.</p>
        <Button className="mt-6" onClick={() => setDone(false)}>Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface grid gap-4 p-6 sm:grid-cols-2 sm:p-8" noValidate>
      <Field label="Name" htmlFor="c-name" error={errors.name} required>
        <Input id="c-name" value={data.name} onChange={set("name")} placeholder="Full name" autoComplete="name" />
      </Field>
      <Field label="Phone" htmlFor="c-phone" error={errors.phone} required>
        <Input id="c-phone" type="tel" value={data.phone} onChange={set("phone")} placeholder="+20 ..." autoComplete="tel" />
      </Field>
      <Field label="Email" htmlFor="c-email" error={errors.email} required>
        <Input id="c-email" type="email" value={data.email} onChange={set("email")} placeholder="you@email.com" autoComplete="email" />
      </Field>
      <Field label="Organization / School" htmlFor="c-org">
        <Input id="c-org" value={data.organization} onChange={set("organization")} placeholder="School or company (optional)" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Inquiry Type" htmlFor="c-type" required>
          <Select id="c-type" value={data.inquiryType} onChange={set("inquiryType")}>
            {inquiryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Message" htmlFor="c-msg" error={errors.message} required>
          <Textarea id="c-msg" value={data.message} onChange={set("message")} placeholder="Tell us a little about what you need..." />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full">Send Message</Button>
      </div>
    </form>
  );
}
