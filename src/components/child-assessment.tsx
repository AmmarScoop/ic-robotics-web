"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import { AssessmentForm, type LeadData } from "@/components/assessment-form";
import { ResultCard } from "@/components/result-card";
import { Reveal } from "@/components/reveal";
import { FloatingShapes } from "@/components/floating-shapes";
import { submitLead } from "@/lib/submit";
import { quizQuestions, profiles, scoreQuiz, type Trait } from "@/lib/assessment";

type Stage = "intro" | "quiz" | "result";

export function ChildAssessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [lead, setLead] = useState<LeadData | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Trait[]>([]);

  function startQuiz(data: LeadData) {
    setLead(data);
    submitLead("child-assessment-lead", data);
    setStage("quiz");
  }

  function answer(trait: Trait) {
    const next = [...answers, trait];
    setAnswers(next);
    if (step + 1 < quizQuestions.length) {
      setStep((s) => s + 1);
    } else {
      submitLead("child-assessment-complete", { lead, result: scoreQuiz(next) });
      setStage("result");
    }
  }

  const result = answers.length ? profiles[scoreQuiz(answers)] : null;
  const progress = Math.round((step / quizQuestions.length) * 100);

  return (
    <section className="relative overflow-hidden">
      <FloatingShapes />
      <div className="container-x relative max-w-3xl py-16">
        <div className="text-center">
          <span className="eyebrow mb-4">Child Assessment</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Which Future Technology Path Fits Your Child?
          </h1>
          <p className="mt-3 text-slate-600">A quick, playful quiz — get a personalized path in under 2 minutes.</p>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {stage === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <div className="card-surface p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-ink">First, a little about you</h2>
                  <p className="mb-6 text-sm text-slate-500">So we can send the personalized report.</p>
                  <AssessmentForm onSubmit={startQuiz} submitLabel="Start The Quiz →" />
                </div>
              </motion.div>
            )}

            {stage === "quiz" && (
              <motion.div key="quiz" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-500">
                  <span>Question {step + 1} of {quizQuestions.length}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-grape-500" animate={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <div className="card-surface mt-6 p-6 sm:p-8">
                      <h2 className="text-xl font-bold text-ink">{quizQuestions[step].prompt}</h2>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {quizQuestions[step].options.map((o) => (
                          <button
                            key={o.label}
                            onClick={() => answer(o.trait)}
                            className="flex items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-4 text-left text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                          >
                            <span className="text-2xl" aria-hidden>{o.emoji}</span>
                            <span>{o.label}</span>
                          </button>
                        ))}
                      </div>
                      {step > 0 && (
                        <button onClick={() => { setStep((s) => s - 1); setAnswers((a) => a.slice(0, -1)); }} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-ink">
                          <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {stage === "result" && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="mb-6 flex items-center justify-center gap-2 text-brand-600">
                  <Sparkles className="h-5 w-5" />
                  <p className="font-bold">Result ready{lead ? ` for ${lead.parentName.split(" ")[0]}'s child` : ""}!</p>
                </div>
                <ResultCard result={result} />
                <div className="mt-6 text-center">
                  <button onClick={() => { setStage("intro"); setStep(0); setAnswers([]); }} className="text-sm font-semibold text-slate-500 hover:text-ink">Retake the quiz</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
