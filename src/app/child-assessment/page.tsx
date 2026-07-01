import type { Metadata } from "next";
import { ChildAssessment } from "@/components/child-assessment";

export const metadata: Metadata = {
  title: "Child Assessment — Which Future Tech Path Fits Your Child?",
  description: "A quick, gamified assessment that maps your child's interests to a future-skills path — Robotics, Coding or AI — with recommended courses and future careers.",
};

export default function Page() {
  return <ChildAssessment />;
}
