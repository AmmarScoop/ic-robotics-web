"use client";
import { useRouter } from "next/navigation";
import { AssessmentForm, type LeadData } from "@/components/assessment-form";
import { useToast } from "@/components/ui/toast";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { Reveal } from "@/components/reveal";
import { VideoBlock } from "@/components/video-block";
import { videos } from "@/lib/videos";

export function HomeLeadSection() {
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
          <span className="eyebrow mb-4">Lead the way</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">Discover Your Child&apos;s Future Technology Path</h2>
          <p className="mt-4 text-slate-600">
            Answer a few quick questions and receive a personalized learning path for your child — in minutes.
          </p>
          <VideoBlock src={videos.personalizedPath} label="Personalized path preview" tone="grape" className="mt-6 aspect-video" />
        </div>
        <Reveal className="p-8 sm:p-10">
          <AssessmentForm onSubmit={handleSubmit} submitLabel="Start Free Assessment" />
          <p className="mt-4 text-center text-xs text-slate-400">No spam. Your details are only used to build your child&apos;s path.</p>
        </Reveal>
      </div>
    </section>
  );
}
