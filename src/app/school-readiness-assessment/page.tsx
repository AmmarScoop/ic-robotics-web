import type { Metadata } from "next";
import { SchoolReadiness } from "@/components/school-readiness";

export const metadata: Metadata = {
  title: "School Readiness Assessment — Is Your School Future-Ready?",
  description: "Answer 9 quick questions and get an instant School Readiness Score with strengths, missing opportunities and recommended next steps for STEM, Robotics, Coding and AI.",
};

export default function Page() {
  return <SchoolReadiness />;
}
