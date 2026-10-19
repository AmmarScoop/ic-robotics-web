// Human-friendly labels for the website's form submissions (shown in the dashboard inbox).
import type { Lead } from "@/lib/types";
import { profiles } from "@/lib/assessment";

export type LeadStatus = "new" | "contacted" | "converted" | "closed";

export const STATUSES: { value: LeadStatus; label: string; tone: string; dot: string }[] = [
  { value: "new", label: "New", tone: "bg-flag-50 text-flag-600 ring-flag-200", dot: "bg-flag-500" },
  { value: "contacted", label: "Contacted", tone: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" },
  { value: "converted", label: "Converted", tone: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
  { value: "closed", label: "Closed", tone: "bg-slate-100 text-slate-500 ring-slate-200", dot: "bg-slate-400" },
];
export const statusOf = (l: Pick<Lead, "status">) => STATUSES.find((s) => s.value === l.status) ?? STATUSES[0];

export const FORM_TYPES: Record<string, { label: string; short: string; icon: string; page: string }> = {
  contact: { label: "Contact form", short: "Contact", icon: "Mail", page: "/contact" },
  "competition-registration": { label: "Competition registration", short: "Competition", icon: "Trophy", page: "/competition-registration" },
  "school-readiness": { label: "School readiness assessment", short: "School readiness", icon: "School", page: "/school-readiness-assessment" },
  "child-assessment-complete": { label: "Child assessment — completed", short: "Child assessment ✓", icon: "Sparkles", page: "/child-assessment" },
  "child-assessment-lead": { label: "Child assessment — started", short: "Child assessment", icon: "Baby", page: "/child-assessment" },
};
export const formType = (kind: string) =>
  FORM_TYPES[kind] ?? { label: kind, short: kind, icon: "FileText", page: "/" };

export const INQUIRY_TYPES: Record<string, string> = {
  proposal: "Request School Proposal",
  demo: "Book School Demo",
  parent: "Parent Inquiry",
  competition: "Competition Registration",
  partnership: "Partnership",
};

const TRAITS: Record<string, string> = Object.fromEntries(
  Object.entries(profiles).map(([k, p]) => [k, `${p.personality} — ${p.path}`]),
);

const LABELS: Record<string, string> = {
  name: "Name", parentName: "Parent name", studentName: "Student name", phone: "Phone", email: "Email",
  organization: "Organization / school", inquiryType: "Inquiry type", message: "Message",
  age: "Age", childAge: "Child age", currentSchool: "Current school", school: "School",
  competition: "Competition ID", competitionName: "Competition", experience: "Experience level",
  schoolName: "School name", students: "Number of students", stages: "Stages", activities: "Current activities",
  stem: "Has a STEM program", robotics: "Teaches robotics", coding: "Teaches coding", ai: "Teaches AI",
  lab: "Has a robotics lab", competitions: "Joins competitions", score: "Readiness score", result: "Recommended path",
};

function labelFor(key: string) {
  if (LABELS[key]) return LABELS[key];
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function display(key: string, v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (key === "inquiryType" && typeof v === "string") return INQUIRY_TYPES[v] ?? v;
  if (key === "result" && typeof v === "string") return TRAITS[v] ?? v;
  if (key === "score") return `${v}%`;
  if ((key === "age" || key === "childAge") && /^\d+$/.test(String(v))) return `${v} years`;
  if (v === "yes") return "Yes";
  if (v === "no") return "No";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.map((x) => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(", ");
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

/** Flattens a submission payload into readable label/value rows. */
export function leadRows(l: Lead): { key: string; label: string; value: string }[] {
  const rows: { key: string; label: string; value: string }[] = [];
  const walk = (obj: Record<string, unknown>) => {
    for (const [k, v] of Object.entries(obj ?? {})) {
      if (k === "competition" && (obj as any).competitionName) continue; // show the name instead of the id
      if (v && typeof v === "object" && !Array.isArray(v)) walk(v as Record<string, unknown>);
      else rows.push({ key: k, label: labelFor(k), value: display(k, v) });
    }
  };
  walk((l.payload ?? {}) as Record<string, unknown>);
  // de-duplicate (e.g. email captured both in lead + form)
  const seen = new Set<string>();
  return rows.filter((r) => (seen.has(r.label + r.value) ? false : (seen.add(r.label + r.value), true)));
}

function deep(payload: any, keys: string[]): string | null {
  if (!payload || typeof payload !== "object") return null;
  for (const k of keys) if (typeof payload[k] === "string" && payload[k].trim()) return payload[k].trim();
  for (const v of Object.values(payload)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const r = deep(v, keys);
      if (r) return r;
    }
  }
  return null;
}

export const leadName = (l: Lead) => l.name || deep(l.payload, ["name", "parentName", "studentName", "schoolName"]) || "—";
export const leadEmail = (l: Lead) => l.email || deep(l.payload, ["email"]);
export const leadPhone = (l: Lead) => l.phone || deep(l.payload, ["phone"]);

/** One-line summary shown in the inbox list. */
export function leadSummary(l: Lead): string {
  const p: any = l.payload ?? {};
  switch (l.kind) {
    case "contact": return [INQUIRY_TYPES[p.inquiryType] ?? p.inquiryType, p.organization].filter(Boolean).join(" · ");
    case "competition-registration": return [p.competitionName ?? p.competition, p.age && `${p.age} yrs`, p.experience].filter(Boolean).join(" · ");
    case "school-readiness": return [p.score !== undefined && `Score ${p.score}%`, p.form?.schoolName, p.form?.students && `${p.form.students} students`].filter(Boolean).join(" · ");
    case "child-assessment-complete": return [TRAITS[p.result] ?? p.result, p.lead?.childAge && `Child ${p.lead.childAge} yrs`].filter(Boolean).join(" · ");
    case "child-assessment-lead": return [p.childAge && `Child ${p.childAge} yrs`, p.currentSchool].filter(Boolean).join(" · ");
    default: return "";
  }
}

export function whatsappHref(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const intl = digits.startsWith("0") && digits.length === 11 ? `2${digits}` : digits;
  return `https://wa.me/${intl}`;
}
