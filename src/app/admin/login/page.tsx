"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Cpu, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    setLoading(false);
    if (r.ok) { router.push(params.get("from") || "/admin"); router.refresh(); }
    else { const j = await r.json().catch(() => ({})); setError(j.error || "Login failed"); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 font-extrabold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-grape-500 text-white"><Cpu className="h-5 w-5" /></span>
          IC Robotics Admin
        </div>
        <form onSubmit={submit} className="card-surface p-7">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Lock className="h-5 w-5" /></div>
          <h1 className="text-xl font-bold text-ink">Sign in</h1>
          <p className="mb-5 text-sm text-slate-500">Enter the admin password to manage the site.</p>
          <Field label="Password" htmlFor="password" error={error} required>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoFocus />
          </Field>
          <Button type="submit" size="lg" className="mt-4 w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
