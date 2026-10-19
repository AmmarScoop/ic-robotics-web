import {
  Bot, Code2, BrainCircuit, Clock, Sparkles, Sun, GraduationCap, BookOpen, Users,
  Cpu, ClipboardCheck, Trophy, BarChart3, BadgeCheck, FlaskConical, Award, HeartHandshake,
  FileText, CalendarCheck, Handshake, MapPin, Medal, Globe, Rocket, Lightbulb, Star, School,
  Puzzle, Wrench, Laptop, Monitor, Cog, Atom, Microscope, Heart, ShieldCheck, LayoutDashboard,
  Target, Eye, Gavel, Phone, Mail, MessageCircle, Video, Camera, Gamepad2, Palette, Calculator,
  Building2, Baby, Smile, Zap, Flag, Briefcase, Layers, Network, Database, Satellite, Plane,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Bot, Code2, BrainCircuit, Clock, Sparkles, Sun, GraduationCap, BookOpen, Users,
  Cpu, ClipboardCheck, Trophy, BarChart3, BadgeCheck, FlaskConical, Award, HeartHandshake,
  FileText, CalendarCheck, Handshake, MapPin, Medal, Globe, Rocket, Lightbulb, Star, School,
  Puzzle, Wrench, Laptop, Monitor, Cog, Atom, Microscope, Heart, ShieldCheck, LayoutDashboard,
  Target, Eye, Gavel, Phone, Mail, MessageCircle, Video, Camera, Gamepad2, Palette, Calculator,
  Building2, Baby, Smile, Zap, Flag, Briefcase, Layers, Network, Database, Satellite, Plane,
};

export const iconNames = Object.keys(iconMap);

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = iconMap[name] ?? Sparkles;
  return <C className={className} aria-hidden />;
}
