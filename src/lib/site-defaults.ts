// Default copy for every editable part of the website.
// The admin dashboard (Site Content) saves overrides to Supabase; anything not saved there falls back to
// these values, so the site always renders even before the dashboard is used.
import {
  impactStats, heroChips, trustIndicators, futureSkills, programs, roadmap, competitions, caseStudies,
  internationalAchievements, partnershipModels, schoolReceives, whySchools, dashboardDemo, portfolioDemo,
  certificateDb, howItWorks, assessmentOutcomes,
  type Stat, type FutureSkill, type Program, type Competition, type CaseStudy,
} from "@/lib/data";

export type Heading = { eyebrow: string; title: string; subtitle: string };
export type Hero = { eyebrow: string; title: string; subtitle: string };
export type LinkButton = { label: string; href: string };
export type Cta = { title: string; subtitle: string; primary: LinkButton; secondary: LinkButton };
export type IconItem = { title: string; blurb: string; icon: string };
export type Partner = { name: string; logo: string };
export type Certificate = { id: string; name: string; course: string; issued: string; valid: boolean };
export type TeamMember = { name: string; role: string; photo: string };

const h = (eyebrow: string, title: string, subtitle = ""): Heading => ({ eyebrow, title, subtitle });

export type SiteContent = {
  settings: {
    brandFirst: string; brandSecond: string; logo: string;
    siteTitle: string; siteDescription: string;
    email: string; phone: string; whatsapp: string; addresses: string[];
    footerBlurb: string; footerTagline: string; copyrightName: string;
    social: { facebook: string; instagram: string; youtube: string; linkedin: string; tiktok: string };
    navPrimary: LinkButton; navSecondary: LinkButton;
  };
  videos: { hero: string; leadSection: string; partnership: string };
  partners: { title: string; items: Partner[] };
  stats: { items: Stat[] };
  cta: Cta;
  home: {
    hero: Hero & { titleHighlight: string; primary: LinkButton; secondary: LinkButton; chips: string[]; videoLabel: string };
    trustIndicators: string[];
    skills: Heading & { careersLabel: string; items: FutureSkill[] };
    impact: Heading;
    lead: Heading & { buttonLabel: string; note: string; videoLabel: string };
    howItWorks: Heading & { steps: { title: string; blurb: string }[]; outcomes: { title: string; track: string; icon: string }[]; button: LinkButton };
    partnership: Heading & { button: LinkButton; videoLabel: string };
    stories: Heading & { button: LinkButton };
    competitions: Heading;
  };
  schools: {
    hero: Hero & { primary: LinkButton; secondary: LinkButton };
    why: Heading & { items: { title: string; icon: string }[] };
    models: Heading & { items: IconItem[] };
    receives: Heading & { items: IconItem[] };
    readiness: { badge: string; title: string; body: string; button: LinkButton };
    proven: Heading;
    dashboard: Heading & { cards: { label: string; value: string; hint: string }[] };
    cta: Cta;
  };
  programs: {
    hero: Hero;
    tracks: { key: "Robotics" | "Coding" | "AI"; title: string; blurb: string }[];
    items: Program[];
    roadmap: Heading & { rows: typeof roadmap };
    cta: Cta;
  };
  competitions: {
    hero: Hero;
    international: Heading;
    national: Heading;
    items: Competition[];
    journey: Heading & { steps: { title: string; blurb: string }[] };
    awards: Heading;
    gallery: Heading;
    cta: Cta;
  };
  achievements: { items: string[] };
  caseStudies: { items: CaseStudy[] };
  stories: {
    hero: Hero; caseStudies: Heading; students: Heading; parents: Heading; leaders: Heading; achievements: Heading;
  };
  about: {
    hero: Hero;
    overview: { eyebrow: string; title: string; paragraphs: string[]; image: string };
    mission: { title: string; body: string };
    vision: { title: string; body: string };
    accreditations: Heading & { items: string[] };
    judges: Heading & { body: string };
    team: Heading & { members: TeamMember[] };
  };
  contact: {
    hero: Hero;
    routes: IconItem[];
    infoTitle: string;
    orientation: { eyebrow: string; title: string; body: string; button: LinkButton; items: { label: string; icon: string }[] };
  };
  blog: { hero: Hero; parents: Heading; schools: Heading; ctaTitle: string };
  registration: { hero: Hero };
  verify: { eyebrow: string; title: string; sampleId: string };
  certificates: { items: Certificate[] };
  studentDashboard: {
    hero: Hero;
    student: string; initials: string; level: string; levelNumber: string; points: number; attendance: number; completion: number;
    badges: string[]; achievements: string[];
    projects: { name: string; track: string; status: string }[];
    certificates: string[];
    competitionHistory: { event: string; year: string; result: string }[];
  };
  portfolio: {
    slug: string; name: string; tagline: string;
    projects: { name: string; track: string; desc: string }[];
    videos: { label: string; url: string }[];
    certificates: string[]; competitions: string[]; awards: string[];
  };
};

const defaultCta: Cta = {
  title: "Ready To Build The Next Generation Of Innovators?",
  subtitle: "Bring world-class Robotics, Coding and AI into your school — or find the perfect path for your child.",
  primary: { label: "Request School Proposal", href: "/contact?type=proposal" },
  secondary: { label: "Book School Demo", href: "/contact?type=demo" },
};

export const siteDefaults: SiteContent = {
  settings: {
    brandFirst: "IC",
    brandSecond: "Robotics",
    logo: "/logo.svg",
    siteTitle: "I.C Robotics Schools — Future Skills for Schools & Kids",
    siteDescription:
      "IC Robotics helps schools and parents prepare children for the future through Robotics, Coding, AI and STEM programs, international competitions, assessments and student portfolios.",
    email: "info@icroboticsschools.com",
    phone: "01044424957",
    whatsapp: "",
    addresses: [
      "Ahmed Maher, Al-Toukhy Tower, next to CIB Bank",
      "Gezira El Ward Club, next to El Mohamady Restaurant",
    ],
    footerBlurb: "Preparing children for the future through Robotics, Coding, AI and STEM — for schools and parents.",
    footerTagline: "STEM Accredited • International Competitions • School Partnerships",
    copyrightName: "I.C Robotics Schools",
    social: { facebook: "", instagram: "", youtube: "", linkedin: "", tiktok: "" },
    navPrimary: { label: "Request Proposal", href: "/contact?type=proposal" },
    navSecondary: { label: "Book Free Demo", href: "/contact?type=demo" },
  },

  videos: {
    hero: "https://youtu.be/y0qlJRS8Da8",
    leadSection: "https://youtu.be/3Qhr4HXXmAM",
    partnership: "https://youtube.com/shorts/UzmtDTA0DtE",
  },

  partners: {
    title: "Trusted by forward-thinking schools",
    items: [
      { name: "Majesty International Schools", logo: "/partners/Majesty International Schools.png" },
      { name: "Damietta International Schools", logo: "/partners/Damietta International Schools.png" },
      { name: "Sky Schools", logo: "/partners/Sky Schools.png" },
      { name: "Ministry of Youth and Sports", logo: "/partners/Ministry of Youth and Sports.png" },
      { name: "Mansoura University", logo: "/partners/Mansoura University.png" },
      { name: "Mansoura College British School", logo: "/partners/Mansoura College British School.png" },
      { name: "Mansoura College American School", logo: "/partners/Mansoura College American School.png" },
      { name: "Faculty of Engineering - Horus University", logo: "/partners/Faculty of Engineering - Horus University.png" },
      { name: "Faculty of AI - Horus University", logo: "/partners/Faculty of AI - Horus University.png" },
      { name: "Modern Mansoura College", logo: "/partners/Modern Mansoura College.png" },
      { name: "Al Wady Language Schools", logo: "/partners/Al Wady Language Schools.png" },
    ],
  },

  stats: { items: impactStats.map((s) => ({ prefix: "", suffix: "", ...s })) },

  cta: defaultCta,

  home: {
    hero: {
      eyebrow: "Future Skills for Schools & Kids",
      title: "Turn Your School Into a",
      titleHighlight: "Future Skills Powerhouse",
      subtitle:
        "IC Robotics helps schools build tomorrow's innovators through hands-on Robotics, Coding, AI and STEM programs, international competitions, and measurable student progress.",
      primary: { label: "Request School Proposal", href: "/contact?type=proposal" },
      secondary: { label: "Book Free School Demo", href: "/contact?type=demo" },
      chips: heroChips,
      videoLabel: "Watch: A day at IC Robotics",
    },
    trustIndicators,
    skills: {
      ...h(
        "Why Future Skills Matter",
        "Three skills that prepare children for tomorrow's jobs",
        "Robotics, Coding and Artificial Intelligence are the literacy of the next generation. Here's how each one builds career-ready thinking.",
      ),
      careersLabel: "Leads to careers like",
      items: futureSkills,
    },
    impact: h("Our Impact", "Nine years. Measurable outcomes."),
    lead: {
      ...h("Lead the way", "Discover Your Child's Future Technology Path", "Answer a few quick questions and receive a personalized learning path for your child — in minutes."),
      buttonLabel: "Start Free Assessment",
      note: "No spam. Your details are only used to build your child's path.",
      videoLabel: "Personalized path preview",
    },
    howItWorks: {
      ...h("How It Works", "From questions to a clear learning path"),
      steps: howItWorks.map(({ title, blurb }) => ({ title, blurb })),
      outcomes: assessmentOutcomes.map(({ title, track, icon }) => ({ title, track, icon })),
      button: { label: "Start Free Assessment", href: "/child-assessment" },
    },
    partnership: {
      ...h(
        "School Partnership",
        "A complete, plug-and-play STEM program for your school",
        "IC Robotics delivers everything: curriculum, certified trainers, robotics kits, student reports, competitions and parent satisfaction — fully integrated into your school.",
      ),
      button: { label: "Request School Proposal", href: "/contact?type=proposal" },
      videoLabel: "School program walkthrough",
    },
    stories: { ...h("Success Stories", "Loved by schools, parents and students"), button: { label: "See all success stories", href: "/success-stories" } },
    competitions: h("Latest Competitions", "Where our students compete on the world stage"),
  },

  schools: {
    hero: {
      eyebrow: "For School Leaders",
      title: "Transform Your School Into A Future Skills Hub",
      subtitle: "Bring world-class Robotics, Coding, AI, competitions and STEM learning into your school with a complete plug-and-play partnership model.",
      primary: { label: "Request Proposal", href: "/contact?type=proposal" },
      secondary: { label: "Check School Readiness", href: "/school-readiness-assessment" },
    },
    why: { ...h("Why Schools Choose IC Robotics", "Everything you need, delivered end-to-end"), items: whySchools },
    models: { ...h("Partnership Models", "Choose the model that fits your school", "Start small or integrate fully — every model scales with you."), items: partnershipModels },
    receives: { ...h("What Schools Receive", "A full future-skills toolkit"), items: schoolReceives },
    readiness: {
      badge: "Free Tool",
      title: "Is your school ready for future skills education?",
      body: "Answer 9 quick questions and get an instant School Readiness Score with strengths, gaps and next steps.",
      button: { label: "Check Your School Readiness", href: "/school-readiness-assessment" },
    },
    proven: h("Proven With Schools", "MMC International & SKY Schools"),
    dashboard: {
      ...h("School Dashboard Preview", "Full visibility for school leaders", "Track engagement, progress and competition-ready students at a glance."),
      cards: [
        { label: "Number of Students", value: "1,500", hint: "Across KG → Secondary" },
        { label: "Attendance", value: "96%", hint: "This term" },
        { label: "Completion Rate", value: "88%", hint: "Program milestones" },
        { label: "Top Performers", value: "42", hint: "Level 5+ students" },
        { label: "Competition Candidates", value: "120", hint: "Ready for nationals" },
        { label: "Reports", value: "Auto", hint: "Parent-facing, monthly" },
      ],
    },
    cta: {
      ...defaultCta,
      title: "Ready to bring future skills to your school?",
      primary: { label: "Request Proposal", href: "/contact?type=proposal" },
      secondary: { label: "Book School Demo", href: "/contact?type=demo" },
    },
  },

  programs: {
    hero: {
      eyebrow: "Programs",
      title: "A Complete Future Skills Journey",
      subtitle: "Three progressive tracks — Robotics, Coding and AI — designed for every stage from KG to Secondary.",
    },
    tracks: [
      { key: "Robotics", title: "Robotics Programs", blurb: "Build and program real robots from big bricks to microcontrollers." },
      { key: "Coding", title: "Coding Programs", blurb: "From visual Scratch blocks to Python and real web & app projects." },
      { key: "AI", title: "AI Programs", blurb: "Understand and build with artificial intelligence, responsibly." },
    ],
    items: programs,
    roadmap: {
      ...h("Learning Roadmap", "From KG To Secondary: A Complete Future Skills Journey", "How Robotics, Coding and AI progress together across every stage."),
      rows: roadmap,
    },
    cta: {
      ...defaultCta,
      title: "Find the right program for your child or school",
      primary: { label: "Start Child Assessment", href: "/child-assessment" },
      secondary: { label: "Request School Proposal", href: "/contact?type=proposal" },
    },
  },

  competitions: {
    hero: {
      eyebrow: "Competitions",
      title: "Where Students Compete On The World Stage",
      subtitle: "From national qualifiers to international championships — we prepare, coach and take students all the way.",
    },
    international: h("International Competitions", "Global championships we compete in"),
    national: h("National Competitions", "National qualifiers & leagues"),
    items: competitions.map((c) => ({ logo: "", ...c })),
    journey: {
      ...h("Competition Journey", "From classroom to championship"),
      steps: [
        { title: "Discover", blurb: "Students join competition-ready program tracks." },
        { title: "Train", blurb: "Coaching, mock rounds and mentor feedback." },
        { title: "Qualify", blurb: "Compete nationally to earn a place." },
        { title: "Compete Globally", blurb: "Represent on the international stage." },
      ],
    },
    awards: h("Student Achievements", "International Awards"),
    gallery: h("Gallery", "Moments from the arena"),
    cta: {
      ...defaultCta,
      title: "Want your students on the podium?",
      primary: { label: "Register Interest", href: "/competition-registration" },
      secondary: { label: "Request School Proposal", href: "/contact?type=proposal" },
    },
  },

  achievements: { items: internationalAchievements },
  caseStudies: { items: caseStudies },

  stories: {
    hero: {
      eyebrow: "Success Stories",
      title: "Real Schools. Real Students. Real Impact.",
      subtitle: "Case studies and testimonials from the schools, parents and students who built their future with IC Robotics.",
    },
    caseStudies: h("School Case Studies", "How schools transformed with IC Robotics"),
    students: h("Student Success Stories", "Students who found their path"),
    parents: h("Parent Testimonials", "What parents say"),
    leaders: h("School Leaders", "What principals say"),
    achievements: h("International Achievements", "On the world stage"),
  },

  about: {
    hero: {
      eyebrow: "About IC Robotics",
      title: "Building The Next Generation Of Innovators",
      subtitle: "For nine years we've helped schools and parents prepare children for a future shaped by Robotics, Coding and AI.",
    },
    overview: {
      eyebrow: "Company Overview",
      title: "A future-skills academy, not a training center",
      paragraphs: [
        "IC Robotics partners with schools and families to deliver world-class STEM education: progressive curriculum, certified trainers, robotics labs, assessments, student portfolios, certificates and a proven competition pathway that reaches the international stage.",
        "We've trained 15,000+ students, entered 8,000+ competition participants and delivered partnerships as large as 1,500 students in a single school.",
      ],
      image: "",
    },
    mission: {
      title: "Mission",
      body: "To make future-skills education accessible, measurable and inspiring for every child — by empowering schools with everything they need to deliver it.",
    },
    vision: {
      title: "Vision",
      body: "A generation of confident creators who shape technology rather than fear it — starting in the classroom and reaching the world stage.",
    },
    accreditations: {
      ...h("Accreditations", "Recognized standards"),
      items: ["STEM Accreditation", "International Competition Partner", "Certified Trainer Program", "School Partnership Standard"],
    },
    judges: {
      ...h("International Judges Experience", "We don't just compete — we judge"),
      body: "Our coaches have served as judges and mentors at international robotics competitions — giving our students an insider understanding of exactly what wins on the world stage.",
    },
    team: {
      ...h("Our Team", "The people behind IC Robotics"),
      members: [
        { name: "Founder & CEO", role: "Vision & School Partnerships", photo: "" },
        { name: "Head of Curriculum", role: "Robotics · Coding · AI", photo: "" },
        { name: "Head of Competitions", role: "International Coach & Judge", photo: "" },
        { name: "Head of Trainers", role: "Trainer Certification", photo: "" },
      ],
    },
  },

  contact: {
    hero: { eyebrow: "Contact", title: "Let's Build The Future Together", subtitle: "Whether you're a school leader, a parent or a partner — we'd love to hear from you." },
    routes: [
      { icon: "FileText", title: "Request Proposal", blurb: "A tailored plan and pricing for your school." },
      { icon: "CalendarCheck", title: "Book Demo", blurb: "A live 45-minute orientation for your team." },
      { icon: "Handshake", title: "Become A Partner School", blurb: "Join our school partnership network." },
    ],
    infoTitle: "Contact Information",
    orientation: {
      eyebrow: "Free STEM Demo",
      title: "Book a 45-minute School Orientation Day",
      body: "A hands-on session for your team and students — see robotics, AI and coding in action, then map a plan for your school.",
      button: { label: "Book School Demo", href: "/contact?type=demo" },
      items: [
        { icon: "Bot", label: "Robotics Demo" },
        { icon: "BrainCircuit", label: "AI Demo" },
        { icon: "Code2", label: "Coding Workshop" },
        { icon: "MapPin", label: "Online or Offline in your school" },
      ],
    },
  },

  blog: {
    hero: { eyebrow: "Blog", title: "Ideas For The Future Of Learning", subtitle: "Practical, research-backed articles for parents and school leaders." },
    parents: h("For Parents", "Helping you choose the right path"),
    schools: h("For Schools", "Build a world-class STEM program"),
    ctaTitle: "Bring these ideas to life in your school",
  },

  registration: {
    hero: {
      eyebrow: "Register",
      title: "Register For A Competition",
      subtitle: "Secure your student's place in national and international robotics competitions — we handle the training.",
    },
  },

  verify: { eyebrow: "Certificate Verification", title: "Verify An IC Robotics Certificate", sampleId: "ICR-2025-AHMED-0012" },

  certificates: {
    items: Object.entries(certificateDb).map(([id, c]) => ({ id, ...c })),
  },

  studentDashboard: {
    hero: { eyebrow: "Student Dashboard", title: "Every Student's Progress, Beautifully Tracked", subtitle: "A live demo of what students, parents and schools see inside IC Robotics." },
    student: dashboardDemo.student,
    initials: "AK",
    level: dashboardDemo.level,
    levelNumber: "6",
    points: dashboardDemo.points,
    attendance: dashboardDemo.attendance,
    completion: dashboardDemo.completion,
    badges: dashboardDemo.badges,
    achievements: dashboardDemo.achievements,
    projects: dashboardDemo.projects,
    certificates: dashboardDemo.certificates,
    competitionHistory: dashboardDemo.competitionHistory,
  },

  portfolio: {
    slug: portfolioDemo.slug,
    name: portfolioDemo.name,
    tagline: portfolioDemo.tagline,
    projects: portfolioDemo.projects,
    videos: [
      { label: "Robot demo run", url: "https://youtube.com/shorts/Oqu_0dN8jlw" },
      { label: "AI project walkthrough", url: "https://youtube.com/shorts/l2RlHUlxM_Q" },
    ],
    certificates: portfolioDemo.certificates,
    competitions: portfolioDemo.competitions,
    awards: portfolioDemo.awards,
  },
};

export type SectionKey = keyof SiteContent;
export const sectionKeys = Object.keys(siteDefaults) as SectionKey[];
