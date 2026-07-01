import type { ResultData } from "@/components/result-card";

export type Trait = "Explorer" | "Builder" | "Programmer" | "AIThinker" | "Engineer";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { label: string; emoji: string; trait: Trait }[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1", prompt: "What does your child enjoy most?",
    options: [
      { label: "Taking things apart to see how they work", emoji: "🔧", trait: "Engineer" },
      { label: "Building models and structures", emoji: "🧱", trait: "Builder" },
      { label: "Playing and inventing games", emoji: "🎮", trait: "Programmer" },
      { label: "Asking 'how does the computer know that?'", emoji: "🤖", trait: "AIThinker" },
    ],
  },
  {
    id: "q2", prompt: "Pick a weekend activity they'd love:",
    options: [
      { label: "A science museum full of experiments", emoji: "🔬", trait: "Explorer" },
      { label: "A LEGO robotics build challenge", emoji: "🤖", trait: "Builder" },
      { label: "Making an animation or app", emoji: "💻", trait: "Programmer" },
      { label: "Talking to a smart voice assistant", emoji: "🗣️", trait: "AIThinker" },
    ],
  },
  {
    id: "q3", prompt: "When something breaks, your child…",
    options: [
      { label: "Wants to fix and improve it", emoji: "🛠️", trait: "Engineer" },
      { label: "Rebuilds it a new way", emoji: "🧩", trait: "Builder" },
      { label: "Looks up a solution online", emoji: "🔎", trait: "Explorer" },
      { label: "Wonders if a machine could fix it", emoji: "⚙️", trait: "AIThinker" },
    ],
  },
  {
    id: "q4", prompt: "Which superpower would they choose?",
    options: [
      { label: "Invent any machine", emoji: "🦾", trait: "Engineer" },
      { label: "Write spells (code) that do anything", emoji: "✨", trait: "Programmer" },
      { label: "Talk to computers", emoji: "🧠", trait: "AIThinker" },
      { label: "Explore unknown places", emoji: "🚀", trait: "Explorer" },
    ],
  },
  {
    id: "q5", prompt: "Their ideal team role is…",
    options: [
      { label: "The builder who makes it real", emoji: "🏗️", trait: "Builder" },
      { label: "The engineer who solves the hard part", emoji: "📐", trait: "Engineer" },
      { label: "The coder who programs it", emoji: "⌨️", trait: "Programmer" },
      { label: "The thinker who plans the smart logic", emoji: "💡", trait: "AIThinker" },
    ],
  },
  {
    id: "q6", prompt: "What excites them about the future?",
    options: [
      { label: "Robots that help people", emoji: "🤖", trait: "Builder" },
      { label: "Apps and games they can create", emoji: "📱", trait: "Programmer" },
      { label: "AI that understands the world", emoji: "🧠", trait: "AIThinker" },
      { label: "Discovering how everything works", emoji: "🌍", trait: "Explorer" },
    ],
  },
];

export const profiles: Record<Trait, ResultData> = {
  Explorer: {
    personality: "The Curious Explorer",
    path: "Robotics — foundational discovery",
    course: "Robotics (Primary) + Scratch",
    summary: "Your child learns by discovering. A playful mix of robotics and visual coding will turn their curiosity into creation.",
    skills: ["Curiosity", "Observation", "Problem framing", "Teamwork"],
    jobs: ["Innovation Lead", "Research Engineer", "Product Explorer"],
  },
  Builder: {
    personality: "The Hands-On Builder",
    path: "Robotics",
    course: "Robotics (Prep) — Autonomous Robots",
    summary: "Your child loves making things real. Robotics gives them mechanisms, sensors and challenges to build and win.",
    skills: ["Mechanics", "Design thinking", "Persistence", "Prototyping"],
    jobs: ["Robotics Engineer", "Mechatronics Designer", "Automation Specialist"],
  },
  Programmer: {
    personality: "The Future Developer",
    path: "Coding",
    course: "Coding — Scratch → Python",
    summary: "Your child thinks in logic and loves turning ideas into software. A coding path from Scratch to Python fits perfectly.",
    skills: ["Logic", "Algorithms", "Creativity", "Debugging"],
    jobs: ["Software Developer", "Game Designer", "App Creator"],
  },
  AIThinker: {
    personality: "The Future AI Innovator",
    path: "Artificial Intelligence",
    course: "AI Fundamentals → AI Projects",
    summary: "Your child is fascinated by how machines learn. An AI path builds data literacy and real, responsible AI projects.",
    skills: ["Data literacy", "Pattern thinking", "Ethics", "Experimentation"],
    jobs: ["AI Engineer", "Data Scientist", "ML Researcher"],
  },
  Engineer: {
    personality: "The Future Engineer",
    path: "Robotics + Systems",
    course: "Robotics (Secondary) + Microcontrollers",
    summary: "Your child loves solving hard problems and improving how things work. Advanced robotics and systems design is their arena.",
    skills: ["Systems thinking", "Electronics", "Optimization", "Resilience"],
    jobs: ["Robotics Engineer", "Systems Engineer", "R&D Lead"],
  },
};

export function scoreQuiz(answers: Trait[]): Trait {
  const tally = {} as Record<Trait, number>;
  answers.forEach((t) => { tally[t] = (tally[t] || 0) + 1; });
  return (Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] as Trait) ?? "Explorer";
}
