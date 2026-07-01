import { cn } from "@/lib/utils";

export function DashboardCard({
  label, value, hint, className, children,
}: { label: string; value?: string | number; hint?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("card-surface p-5", className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      {value !== undefined && <p className="mt-1 text-2xl font-extrabold text-ink">{value}</p>}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}
