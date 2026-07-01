"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Code2, Sparkles, Trophy, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { FloatingShapes } from "@/components/floating-shapes";
import { heroChips } from "@/lib/data";
import { VideoBlock } from "@/components/video-block";
import { videos } from "@/lib/videos";

const badges = [
  { icon: Bot, label: "Robotics", pos: "-left-4 top-6", tone: "text-brand-600" },
  { icon: Code2, label: "Coding", pos: "-right-3 top-20", tone: "text-accent-600" },
  { icon: Sparkles, label: "AI", pos: "-left-3 bottom-24", tone: "text-grape-600" },
  { icon: Trophy, label: "Competitions", pos: "-right-4 bottom-8", tone: "text-accent-600" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <FloatingShapes />
      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow mb-5">Future Skills for Schools & Kids</span>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Turn Your School Into a <span className="gradient-text">Future Skills Powerhouse</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            IC Robotics helps schools build tomorrow&apos;s innovators through hands-on Robotics, Coding, AI and STEM
            programs, international competitions, and measurable student progress.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/contact?type=proposal">Request School Proposal</Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="/contact?type=demo">Book Free School Demo</Link></Button>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2">
            {heroChips.map((chip, i) => (
              <motion.li
                key={chip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white/80 px-3 py-2.5 text-sm font-semibold text-ink shadow-sm"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-500" /> {chip}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="card-surface relative overflow-hidden p-3">
            <VideoBlock src={videos.hero} label="Watch: A day at IC Robotics" className="aspect-[4/3]" />
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-brand-50 p-3 text-center">
                <LayoutDashboard className="mx-auto h-5 w-5 text-brand-600" />
                <p className="mt-1 text-[11px] font-semibold text-brand-700">School Dashboard</p>
              </div>
              <div className="rounded-2xl bg-accent-50 p-3 text-center">
                <Bot className="mx-auto h-5 w-5 text-accent-600" />
                <p className="mt-1 text-[11px] font-semibold text-accent-700">Build Robots</p>
              </div>
              <div className="rounded-2xl bg-grape-50 p-3 text-center">
                <Sparkles className="mx-auto h-5 w-5 text-grape-600" />
                <p className="mt-1 text-[11px] font-semibold text-grape-700">AI Projects</p>
              </div>
            </div>
          </div>
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              className={`absolute ${b.pos} flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs font-bold shadow-soft ${b.tone}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              <b.icon className="h-3.5 w-3.5" /> {b.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
