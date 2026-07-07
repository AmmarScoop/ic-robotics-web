// Centralised mock data. Swap these arrays for API/CRM/Supabase calls later.

export type Stat = { label: string; value: number; suffix?: string; prefix?: string };

export const impactStats: Stat[] = [
  { label: "Students Trained", value: 15000, suffix: "+" },
  { label: "Partner Schools", value: 120, suffix: "+" },
  { label: "Competition Participants", value: 8000, suffix: "+" },
  { label: "International Awards", value: 340, suffix: "+" },
  { label: "Years of Experience", value: 9 },
];

export const heroChips = [
  "15,000+ Students Trained",
  "8,000+ Competition Participants",
  "1,500+ Students in One School Partnership",
  "9 Years Experience",
];

export const trustIndicators = [
  "STEM Accreditation",
  "International Competitions",
  "School Partnerships",
  "International Achievements",
];

export const schoolLogos = [
  "MMC International",
  "SKY Schools",
  "Bright Future",
  "Nova Academy",
  "Greenfield",
  "Horizon Prep",
  "Pioneer School",
  "Summit STEM",
];

export type FutureSkill = {
  icon: string;
  title: string;
  blurb: string;
  jobs: string[];
};

export const futureSkills: FutureSkill[] = [
  {
    icon: "Bot",
    title: "Robotics",
    blurb:
      "Children design, build and program real robots — developing engineering thinking, mechanics and problem solving that map directly to tomorrow's automation-driven careers.",
    jobs: ["Robotics Engineer", "Automation Specialist", "Mechatronics Designer"],
  },
  {
    icon: "Code2",
    title: "Coding",
    blurb:
      "From block-based Scratch to Python, students learn to turn ideas into working software — the universal literacy behind every future industry.",
    jobs: ["Software Developer", "App Creator", "Game Designer"],
  },
  {
    icon: "BrainCircuit",
    title: "Artificial Intelligence",
    blurb:
      "Kids explore how machines learn, build simple AI projects and understand data responsibly — preparing them to lead in an AI-first world.",
    jobs: ["AI Engineer", "Data Scientist", "ML Researcher"],
  },
];

export type Program = {
  id: string;
  track: "Robotics" | "Coding" | "AI";
  title: string;
  stage: string;
  ages: string;
  description: string;
  outcomes: string[];
};

export const programs: Program[] = [
  { id: "rob-kg", track: "Robotics", title: "Robotics — KG", stage: "KG", ages: "4–6", description: "Big-brick building, sensors and playful mechanisms that spark curiosity.", outcomes: ["Fine motor skills", "Cause & effect", "Teamwork"] },
  { id: "rob-primary", track: "Robotics", title: "Robotics — Primary", stage: "Primary", ages: "7–9", description: "Motorised models and first programming with icon-based logic.", outcomes: ["Sequencing", "Simple sensors", "Design thinking"] },
  { id: "rob-prep", track: "Robotics", title: "Robotics — Prep", stage: "Prep", ages: "10–12", description: "Autonomous robots, gears and competition-style challenges.", outcomes: ["Autonomy", "Mechanics", "Debugging"] },
  { id: "rob-secondary", track: "Robotics", title: "Robotics — Secondary", stage: "Secondary", ages: "13–17", description: "Advanced robotics, microcontrollers and international competition prep.", outcomes: ["Microcontrollers", "Systems design", "Competition strategy"] },
  { id: "code-scratch", track: "Coding", title: "Scratch", stage: "Primary", ages: "7–10", description: "Visual block coding to build games, stories and animations.", outcomes: ["Logic", "Events", "Creativity"] },
  { id: "code-app", track: "Coding", title: "App Development", stage: "Prep", ages: "11–14", description: "Design and build mobile apps that solve real problems.", outcomes: ["UI basics", "Logic", "Publishing"] },
  { id: "code-web", track: "Coding", title: "Web Development", stage: "Prep/Secondary", ages: "12–16", description: "HTML, CSS and JavaScript to build responsive websites.", outcomes: ["HTML/CSS", "JavaScript", "Deployment"] },
  { id: "code-python", track: "Coding", title: "Python", stage: "Secondary", ages: "13–17", description: "Real programming: data, automation and project building in Python.", outcomes: ["Syntax", "Data structures", "Projects"] },
  { id: "ai-fundamentals", track: "AI", title: "AI Fundamentals", stage: "Prep", ages: "11–14", description: "How machines 'think' — intro to data, models and ethics.", outcomes: ["AI concepts", "Data literacy", "Ethics"] },
  { id: "ai-projects", track: "AI", title: "AI Projects", stage: "Secondary", ages: "13–17", description: "Build image, voice and chatbot projects with guided toolkits.", outcomes: ["Project delivery", "APIs", "Prototyping"] },
  { id: "ai-ml", track: "AI", title: "Machine Learning Basics", stage: "Secondary", ages: "14–17", description: "Train and evaluate simple ML models with real datasets.", outcomes: ["Training models", "Evaluation", "Python + ML"] },
];

export const roadmap = [
  { stage: "KG", ages: "4–6", robotics: "Build & explore", coding: "Unplugged logic", ai: "Smart machines around us" },
  { stage: "Primary", ages: "7–9", robotics: "Motorised models", coding: "Scratch games", ai: "Patterns & data play" },
  { stage: "Prep", ages: "10–12", robotics: "Autonomous robots", coding: "Apps & web", ai: "AI fundamentals" },
  { stage: "Secondary", ages: "13–17", robotics: "Competition robotics", coding: "Python & projects", ai: "Machine learning" },
];

export type Competition = {
  id: string;
  name: string;
  scope: "National" | "International";
  description: string;
  countries: string;
  achievement: string;
  /** Path (under /public) or URL of the competition logo. */
  logo?: string;
};

export const competitions: Competition[] = [
  { id: "fll", name: "FIRST LEGO League (FLL)", scope: "International", description: "Teams research a real-world problem, design & program an autonomous LEGO robot and pitch to judges.", countries: "110+ countries", achievement: "3× Regional Champions", logo: "/logos/FLL.png" },
  { id: "wro", name: "World Robot Olympiad (WRO)", scope: "International", description: "Global robotics challenge testing design, programming and problem-solving under time pressure.", countries: "90+ countries", achievement: "Top 10 International Finish", logo: "/logos/WRO.png" },
  { id: "robot-challenge", name: "Robot Challenge", scope: "International", description: "One of the biggest robotics competitions for autonomous and mobile robots.", countries: "40+ countries", achievement: "2× Category Winners", logo: "/logos/IRC.png" },
  { id: "technoxian", name: "Technoxian World Championship", scope: "International", description: "World robotics championship spanning multiple robot sport categories.", countries: "50+ countries", achievement: "Gold & Silver Medalists", logo: "/logos/Technoxian.png" },
];

export type Story = {
  id: string;
  type: "School" | "Student" | "Parent" | "Principal";
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Story[] = [
  { id: "t1", type: "Parent", name: "Mona A.", role: "Parent of Yara, age 10", quote: "Yara went from shy to leading her robotics team. The progress reports made every step visible." },
  { id: "t2", type: "Principal", name: "Dr. Hassan", role: "Principal, MMC International", quote: "IC Robotics turned our STEM ambition into a running, measurable program in one term." },
  { id: "t3", type: "Student", name: "Ahmed K.", role: "Student, age 14", quote: "I built my first AI project and won bronze at an international competition. This changed my future." },
  { id: "t4", type: "Parent", name: "Sara M.", role: "Parent of Omar, age 8", quote: "The personalized path helped us choose coding. He now builds his own little games." },
  { id: "t5", type: "Principal", name: "Ms. Laila", role: "STEM Lead, SKY Schools", quote: "Trainers, kits, curriculum, competitions — everything arrived plug-and-play." },
];

export type CaseStudy = {
  id: string;
  school: string;
  students: string;
  challenge: string;
  solution: string;
  impact: string;
  outcomes: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "mmc",
    school: "MMC International",
    students: "1,500+ students",
    challenge: "Wanted a future-skills identity but had no STEM curriculum, trainers or lab.",
    solution: "Full academic integration: robotics + coding + AI curriculum, certified trainers, an on-site robotics lab and a competition track.",
    impact: "1,500+ students in a single partnership, 92% parent satisfaction and a national competition team within one year.",
    outcomes: ["92% parent satisfaction", "3 national medals", "On-site robotics lab", "Full KG→Secondary rollout"],
  },
  {
    id: "sky",
    school: "SKY Schools",
    students: "800+ students",
    challenge: "STEM club existed but lacked progression, assessment and visible outcomes.",
    solution: "Structured roadmap, student dashboards, portfolios and certificates plus international competition entry.",
    impact: "Doubled enrollment in STEM club and produced international competition finalists.",
    outcomes: ["2× club enrollment", "International finalists", "Portfolios for every student", "Verified certificates"],
  },
];

export const internationalAchievements = [
  "Gold — Technoxian World Championship",
  "Top 10 — World Robot Olympiad International Final",
  "Regional Champions — FIRST LEGO League",
  "Category Winners — Robot Challenge",
  "40+ national podium finishes",
];

export type BlogPost = {
  id: string;
  slug: string;
  audience: "Parents" | "Schools";
  category: string;
  title: string;
  excerpt: string;
  readMinutes: number;
};

export const blogPosts: BlogPost[] = [
  { id: "b1", slug: "when-should-my-child-start-coding", audience: "Parents", category: "Coding", title: "When Should My Child Start Coding?", excerpt: "The right age is younger than you think — and it's not about screens. Here's a stage-by-stage guide.", readMinutes: 5 },
  { id: "b2", slug: "why-robotics-matters", audience: "Parents", category: "Robotics", title: "Why Robotics Matters For Your Child's Future", excerpt: "How hands-on robotics builds problem-solving, resilience and career-ready thinking.", readMinutes: 6 },
  { id: "b3", slug: "best-programming-languages-for-kids", audience: "Parents", category: "Coding", title: "Best Programming Languages For Kids", excerpt: "From Scratch to Python — a practical map of what to learn and when.", readMinutes: 7 },
  { id: "b4", slug: "how-to-build-a-stem-program", audience: "Schools", category: "STEM", title: "How To Build A STEM Program", excerpt: "A blueprint for school leaders: curriculum, trainers, labs, assessment and competitions.", readMinutes: 9 },
  { id: "b5", slug: "future-skills-framework", audience: "Schools", category: "Strategy", title: "Future Skills Framework", excerpt: "The competencies every school should be building now, and how to measure them.", readMinutes: 8 },
  { id: "b6", slug: "ai-in-education", audience: "Schools", category: "AI", title: "AI In Education", excerpt: "Where AI genuinely helps learning — and how to introduce it responsibly to students.", readMinutes: 6 },
  { id: "b7", slug: "robotics-for-schools", audience: "Schools", category: "Robotics", title: "Robotics For Schools", excerpt: "Everything a school needs to launch robotics without hiring specialists.", readMinutes: 7 },
];

export const partnershipModels = [
  { title: "After School Activities", blurb: "Weekly clubs that run inside the school day's edges — low friction, high engagement.", icon: "Clock" },
  { title: "STEM Club", blurb: "A branded, progressive club with levels, badges and competition pathways.", icon: "Sparkles" },
  { title: "Summer Camp", blurb: "Intensive holiday camps: robotics, coding and AI in energetic sprints.", icon: "Sun" },
  { title: "Full Academic Integration", blurb: "STEM embedded into the timetable KG→Secondary with assessment and reports.", icon: "GraduationCap" },
];

export const schoolReceives = [
  { title: "Curriculum", blurb: "Progressive KG→Secondary robotics, coding & AI curriculum.", icon: "BookOpen" },
  { title: "Trainers", blurb: "Certified, vetted STEM trainers ready to deliver.", icon: "Users" },
  { title: "Robotics Kits", blurb: "Age-appropriate kits and lab hardware.", icon: "Cpu" },
  { title: "Assessments", blurb: "Student assessments and readiness scoring.", icon: "ClipboardCheck" },
  { title: "Competitions", blurb: "National & international competition entry & coaching.", icon: "Trophy" },
  { title: "Reports", blurb: "Parent-facing progress reports and school dashboards.", icon: "BarChart3" },
];

export const whySchools = [
  { title: "Full Robotics Curriculum", icon: "Bot" },
  { title: "Coding Curriculum", icon: "Code2" },
  { title: "AI Curriculum", icon: "BrainCircuit" },
  { title: "Certified Trainers", icon: "BadgeCheck" },
  { title: "Robotics Labs", icon: "FlaskConical" },
  { title: "International Certifications", icon: "Award" },
  { title: "Parent Satisfaction", icon: "HeartHandshake" },
  { title: "Competitions", icon: "Trophy" },
];

export const dashboardDemo = {
  student: "Ahmed Khaled",
  level: "Level 6 — Robotics Innovator",
  points: 4820,
  attendance: 96,
  completion: 88,
  badges: ["First Robot", "Bug Hunter", "Team Captain", "AI Explorer", "Python Pro", "Champion"],
  achievements: [
    "Completed Autonomous Robot Challenge",
    "Built first AI image classifier",
    "Bronze — Technoxian regional",
  ],
  projects: [
    { name: "Line-Following Robot", track: "Robotics", status: "Completed" },
    { name: "Weather App", track: "Coding", status: "Completed" },
    { name: "Trash-Sorting AI", track: "AI", status: "In Progress" },
  ],
  certificates: ["Robotics Level 5", "Python Foundations", "AI Fundamentals"],
  competitionHistory: [
    { event: "Technoxian Regional", year: "2025", result: "Bronze" },
    { event: "WRO National", year: "2024", result: "Finalist" },
  ],
};

export const portfolioDemo = {
  slug: "ahmed",
  name: "Ahmed Khaled",
  tagline: "14 • Future AI Innovator • I.C Robotics Schools",
  projects: [
    { name: "Trash-Sorting AI", track: "AI", desc: "A model that sorts recyclables from a camera feed." },
    { name: "Line-Following Robot", track: "Robotics", desc: "Autonomous robot navigating a track with IR sensors." },
    { name: "Weather App", track: "Coding", desc: "A live weather app built with an API and clean UI." },
  ],
  videos: ["Robot demo run", "AI project walkthrough"],
  certificates: ["Robotics Level 5", "Python Foundations", "AI Fundamentals"],
  competitions: ["Technoxian Regional 2025", "WRO National 2024"],
  awards: ["Bronze — Technoxian Regional", "Finalist — WRO National"],
};

export const certificateDb: Record<string, { name: string; course: string; issued: string; valid: boolean }> = {
  "ICR-2025-AHMED-0012": { name: "Ahmed Khaled", course: "Robotics Level 5", issued: "2025-06-14", valid: true },
  "ICR-2025-YARA-0031": { name: "Yara Nabil", course: "Python Foundations", issued: "2025-05-02", valid: true },
  "ICR-2024-OMAR-0088": { name: "Omar Saleh", course: "AI Fundamentals", issued: "2024-11-20", valid: true },
};

export const howItWorks = [
  { step: 1, title: "Answer Questions", blurb: "A few quick, playful questions about your child's interests." },
  { step: 2, title: "Get Personalized Report", blurb: "We map answers to a future-skills profile instantly." },
  { step: 3, title: "Discover Best Learning Path", blurb: "Receive a recommended track, course and next step." },
];

export const assessmentOutcomes = [
  { title: "Future Engineer", track: "Robotics", blurb: "Loves building, mechanisms and how things work.", icon: "Bot" },
  { title: "Future Developer", track: "Coding", blurb: "Loves logic, games and turning ideas into software.", icon: "Code2" },
  { title: "Future AI Innovator", track: "Artificial Intelligence", blurb: "Loves data, patterns and smart machines.", icon: "BrainCircuit" },
];
