import {
  Bot, Code2, BrainCircuit, Clock, Sparkles, Sun, GraduationCap, BookOpen, Users,
  Cpu, ClipboardCheck, Trophy, BarChart3, BadgeCheck, FlaskConical, Award, HeartHandshake,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Bot, Code2, BrainCircuit, Clock, Sparkles, Sun, GraduationCap, BookOpen, Users,
  Cpu, ClipboardCheck, Trophy, BarChart3, BadgeCheck, FlaskConical, Award, HeartHandshake,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = map[name] ?? Sparkles;
  return <C className={className} aria-hidden />;
}
