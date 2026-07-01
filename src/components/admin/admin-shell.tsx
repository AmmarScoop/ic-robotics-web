"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Inbox, Star, Newspaper, Images, LogOut, Cpu, Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/articles", label: "Articles", icon: Newspaper },
  { href: "/admin/media", label: "Media", icon: Images },
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-grape-500 text-white"><Cpu className="h-4 w-4" /></span>
            IC Admin
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {nav.map((n) => {
              const active = n.href === "/admin" ? pathname === n.href : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700", active && "bg-brand-50 text-brand-700")}>
                  <n.icon className="h-4 w-4" /> {n.label}
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

        <div className="flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-5 backdrop-blur">
            <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <h1 className="text-lg font-bold text-ink">{title}</h1>
          </header>
          <main className="p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function useAdminApi() {
  return {
    async list(resource: string) {
      const r = await fetch(`/api/admin/${resource}`);
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
