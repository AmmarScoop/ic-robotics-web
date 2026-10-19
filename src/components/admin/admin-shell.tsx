"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Inbox, Star, Newspaper, Images, LogOut, Menu, ExternalLink, PanelsTopLeft } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Form submissions", icon: Inbox, badge: true },
  { href: "/admin/content", label: "Site content", icon: PanelsTopLeft },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/media", label: "Media library", icon: Images },
];

/** Number of unhandled ("new") form submissions, shared with the sidebar badge. */
export function useNewLeadsCount() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/admin/leads?summary=1", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => { if (alive && j) setN(j.new ?? 0); })
        .catch(() => {});
    load();
    const onChange = () => load();
    window.addEventListener("icr-leads-changed", onChange);
    const t = setInterval(load, 60_000);
    return () => { alive = false; clearInterval(t); window.removeEventListener("icr-leads-changed", onChange); };
  }, []);
  return n;
}

export function AdminShell({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const newLeads = useNewLeadsCount();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-slate-200 bg-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open && "translate-x-0"
        )}>
          <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-5 font-extrabold text-ink">
            <LogoMark className="h-8 w-8" />
            IC Admin
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {nav.map((n) => {
              const active = n.href === "/admin" ? pathname === n.href : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700", active && "bg-brand-50 text-brand-700")}>
                  <n.icon className="h-4 w-4" /> {n.label}
                  {n.badge && !!newLeads && (
                    <span className="ml-auto rounded-full bg-flag-500 px-2 py-0.5 text-[11px] font-bold text-white">{newLeads > 99 ? "99+" : newLeads}</span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 p-3">
            <Link href="/" target="_blank" className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50">
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </aside>

        {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />}

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-5 backdrop-blur">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <h1 className="min-w-0 truncate text-lg font-bold text-ink">{title}</h1>
            {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
          </header>
          <main className="p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function useAdminApi() {
  return {
    async get(path: string) {
      const r = await fetch(`/api/admin/${path}`, { cache: "no-store" });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw Object.assign(new Error(j.error || "Request failed"), { code: j.code, status: r.status });
      return j;
    },
    async send(path: string, method: "PUT" | "POST" | "DELETE", body?: unknown) {
      const r = await fetch(`/api/admin/${path}`, {
        method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined,
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw Object.assign(new Error(j.error || "Request failed"), { code: j.code, status: r.status });
      return j;
    },
    async list(resource: string) {
      const r = await fetch(`/api/admin/${resource}`, { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Request failed");
      return j.data as any[];
    },
    async create(resource: string, body: unknown) {
      const r = await fetch(`/api/admin/${resource}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Create failed");
      return j.data;
    },
    async update(resource: string, id: string, body: unknown) {
      const r = await fetch(`/api/admin/${resource}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Update failed");
      return j.data;
    },
    async remove(resource: string, id: string) {
      const r = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
      if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error(j.error || "Delete failed"); }
    },
  };
}
