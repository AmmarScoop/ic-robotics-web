"use client";
import { useRouter } from "next/navigation";
import { AssessmentForm, type LeadData } from "@/components/assessment-form";
import { useToast } from "@/components/ui/toast";
import { Reveal } from "@/components/reveal";
import { VideoBlock } from "@/components/video-block";
import type { SiteContent } from "@/lib/site-defaults";

export function HomeLeadSection({ lead, video }: { lead: SiteContent["home"]["lead"]; video: string }) {
  const router = useRouter();
  const { toast } = useToast();

  function handleSubmit(data: LeadData) {
    try { sessionStorage.setItem("icr_lead", JSON.stringify(data)); } catch {}
    toast({ title: "Great! Let's begin", description: "Redirecting to your child's assessment." });
    router.push("/child-assessment");
  }

  return (
    <section className="container-x my-24">
      <div className="card-surface grid gap-10 overflow-hidden p-0 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-brand-50 to-grape-50 p-8 sm:p-10">
          <span className="eyebrow mb-4">{lead.eyebrow}</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">{lead.title}</h2>
          {lead.subtitle && <p className="mt-4 text-slate-600">{lead.subtitle}</p>}
          <VideoBlock src={video} label={lead.videoLabel} tone="grape" className="mt-6 aspect-video" />
        </div>
        <Reveal className="p-8 sm:p-10">
          <AssessmentForm onSubmit={handleSubmit} submitLabel={lead.buttonLabel} />
          {lead.note && <p className="mt-4 text-center text-xs text-slate-400">{lead.note}</p>}
        </Reveal>
      </div>
    </section>
  );
}
