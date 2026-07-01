"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldX, QrCode, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/share-buttons";
import { FloatingShapes } from "@/components/floating-shapes";
import { certificateDb } from "@/lib/data";

type Result = { status: "valid" | "invalid"; id: string; name?: string; course?: string; issued?: string };

export function CertificateVerify() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  function verify(e: React.FormEvent) {
    e.preventDefault();
    const key = id.trim().toUpperCase();
    const cert = certificateDb[key];
    setResult(cert ? { status: "valid", id: key, ...cert } : { status: "invalid", id: key });
  }

  return (
    <section className="relative overflow-hidden">
      <FloatingShapes />
      <div className="container-x relative max-w-2xl py-16">
        <div className="text-center">
          <span className="eyebrow mb-4">Certificate Verification</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Verify An IC Robotics Certificate</h1>
          <p className="mt-3 text-slate-600">Enter a certificate ID to confirm it&apos;s authentic. Try <button type="button" onClick={() => setId("ICR-2025-AHMED-0012")} className="font-semibold text-brand-700 underline">ICR-2025-AHMED-0012</button>.</p>
        </div>

        <form onSubmit={verify} className="card-surface mt-10 p-6 sm:p-8">
          <Field label="Certificate Unique ID" htmlFor="cert-id">
            <Input id="cert-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="ICR-YYYY-NAME-0000" className="uppercase" />
          </Field>
          <Button type="submit" size="lg" className="mt-4 w-full"><Search className="h-4 w-4" /> Verify Certificate</Button>
        </form>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div key={result.id + result.status} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8">
              {result.status === "valid" ? (
                <div className="card-surface overflow-hidden p-0">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
                    <ShieldCheck className="h-8 w-8" />
                    <div><p className="text-lg font-extrabold">Verified & Authentic</p><p className="text-sm text-white/85">This certificate is valid.</p></div>
                  </div>
                  <div className="grid gap-6 p-8 sm:grid-cols-[1fr_auto]">
                    <dl className="grid gap-4 sm:grid-cols-2">
                      <Item label="Student Name" value={result.name!} />
                      <Item label="Course" value={result.course!} />
                      <Item label="Issue Date" value={result.issued!} />
                      <Item label="Certificate ID" value={result.id} />
                    </dl>
                    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 p-4">
                      <QrCode className="h-24 w-24 text-ink" />
                      <span className="text-[10px] uppercase tracking-wide text-slate-400">Scan to verify</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 p-8">
                    <p className="mb-3 text-sm font-bold text-ink">Share this achievement</p>
                    <ShareButtons title={`${result.name} — verified ${result.course} certificate from IC Robotics`} />
                  </div>
                </div>
              ) : (
                <div className="card-surface flex items-center gap-3 border-red-100 bg-red-50/50 p-6">
                  <ShieldX className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-lg font-extrabold text-ink">Not Found</p>
                    <p className="text-sm text-slate-600">No certificate matches <span className="font-mono font-semibold">{result.id}</span>. Please check the ID and try again.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
    </div>
  );
}
