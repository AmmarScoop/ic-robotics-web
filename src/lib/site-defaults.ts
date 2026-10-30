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
export type Accreditation = { name: string; description: string; logo: string; link: string };
export type Country = { name: string; code: string };
export type Kit = {
  name: string; image: string; ages: string; summary: string;
  components: string[]; skills: string[]; activities: string[]; outcomes: string[]; video: string;
};
export type RoboticsStage = {
  id: string; tab: string; title: string; grades: string; summary: string;
  teach: string[]; objectives: string[]; outcomes: string[]; activities: string[];
  photos: string[]; kits: Kit[];
};
export type ContractSystem = {
  id: string; title: string; arabic: string; icon: string; summary: string;
  details: string[]; includes: string[]; bestFor: string;
  image: string; photos: string[]; presentation: string; buttonLabel: string; message: string;
};
export type Participation = {
  competition: string; category: string; year: string; country: string; countryCode: string;
  scope: "International" | "National"; school: string; team: string; result: string; summary: string;
  photos: string[]; video: string; evidence: string;
};
export type SchoolStory = CaseStudy & {
  location: string; photo: string; logo: string; featured: boolean; since: string;
  programs: string[]; participation: string; achievements: string[];
};
export type EventBlock = { eyebrow: string; title: string; body: string; points: string[]; photos: string[] };
export type EventEdition = { title: string; date: string; school: string; summary: string; photos: string[] };

const h = (eyebrow: string, title: string, subtitle = ""): Heading => ({ eyebrow, title, subtitle });

export type SiteContent = {
  settings: {
    brandFirst: string; brandSecond: string; logo: string;
    siteTitle: string; siteDescription: string;
    email: string; phone: string; whatsapp: string; addresses: string[];
    footerBlurb: string; footerTagline: string; copyrightName: string;
    social: { facebook: string; instagram: string; youtube: string; linkedin: string; tiktok: string };
    navPrimary: LinkButton; navSecondary: LinkButton;
    schoolsWhatsapp: string;
  };
  videos: { hero: string; leadSection: string; partnership: string };
  partners: { title: string; items: Partner[] };
  accreditations: Heading & { items: Accreditation[] };
  founders: Heading & { videos: { name: string; role: string; url: string }[] };
  global: Heading & { countries: Country[] };
  stats: { items: Stat[] };
  cta: Cta;
  home: {
    hero: Hero & { titleHighlight: string; primary: LinkButton; secondary: LinkButton; chips: string[]; videoLabel: string };
    trustIndicators: string[];
    message: Heading & { system: IconItem[]; method: string[] };
    ratio: { eyebrow: string; title: string; value: string; body: string; points: string[] };
    responsibilities: Heading & { academyTitle: string; academy: string[]; schoolTitle: string; school: string[] };
    skills: Heading & { careersLabel: string; items: FutureSkill[] };
    impact: Heading;
    lead: Heading & { buttonLabel: string; note: string; videoLabel: string };
    howItWorks: Heading & { steps: { title: string; blurb: string }[]; outcomes: { title: string; track: string; icon: string }[]; button: LinkButton };
    partnership: Heading & { button: LinkButton; videoLabel: string };
    stories: Heading & { button: LinkButton };
    competitions: Heading;
  };
  events: {
    orientation: EventBlock;
    roboticsDay: EventBlock & { editions: EventEdition[] };
  };
  contracting: {
    hero: Hero;
    journey: { title: string; blurb: string }[];
    systems: ContractSystem[];
    note: string;
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
    robotics: Heading & { stages: RoboticsStage[] };
    items: Program[];
    roadmap: Heading & { rows: typeof roadmap };
    cta: Cta;
  };
  competitions: {
    hero: Hero;
    intro: string[];
    participations: Heading;
    international: Heading;
    national: Heading;
    items: Competition[];
    journey: Heading & { steps: { title: string; blurb: string }[] };
    awards: Heading;
    gallery: Heading;
    cta: Cta;
  };
  achievements: { items: string[] };
  participations: { items: Participation[] };
  caseStudies: { items: SchoolStory[] };
  stories: {
    hero: Hero; schools: Heading; caseStudies: Heading; students: Heading; parents: Heading; leaders: Heading; achievements: Heading;
  };
  about: {
    hero: Hero;
    overview: { eyebrow: string; title: string; paragraphs: string[]; image: string };
    video: { label: string; url: string };
    experience: Heading & { years: string; points: string[] };
    mission: { title: string; body: string };
    vision: { title: string; body: string };
    accreditations: Heading;
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
    footerTagline: "STEM.org Accredited • Arab Robotics Union • International Competitions",
    copyrightName: "I.C Robotics Schools",
    social: { facebook: "", instagram: "", youtube: "", linkedin: "", tiktok: "" },
    navPrimary: { label: "Request Proposal", href: "/contact?type=proposal" },
    navSecondary: { label: "Book Free Demo", href: "/contact?type=demo" },
    schoolsWhatsapp: "01044424957",
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

  accreditations: {
    ...h("International Accreditations", "Accredited and recognised", "Our programs follow internationally recognised standards for STEM and robotics education."),
    items: [
      {
        name: "STEM.org Accredited",
        description: "I.C Robotics programs are accredited by STEM.org, the international accreditation body for STEM education.",
        logo: "",
        link: "https://stem.org",
      },
      {
        name: "Arab Robotics Union",
        description: "Accredited by the Arab Robotics Union (الاتحاد العربي للروبوت).",
        logo: "",
        link: "",
      },
    ],
  },

  founders: {
    ...h("Meet Our Founders", "Who we are, what we do and why it matters", "Hear directly from the founders of I.C Robotics about our vision for Robotics, Programming and AI education in schools."),
    videos: [
      { name: "Eng. Ahmed Mamoun", role: "", url: "" },
      { name: "Eng. Omar El-Saadawy", role: "", url: "" },
    ],
  },

  global: {
    ...h("International Presence", "Our students compete with teams from around the world", "I.C Robotics students have qualified for and competed in international competitions alongside teams from many countries."),
    countries: [
      { name: "Egypt", code: "EG" },
      { name: "China", code: "CN" },
      { name: "South Korea", code: "KR" },
      { name: "Saudi Arabia", code: "SA" },
      { name: "India", code: "IN" },
      { name: "United States", code: "US" },
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
        "We don't just run robotics and coding courses. I.C Robotics helps schools develop their educational system and bring future skills into every stage — through hands-on Robotics, Programming and AI, real problem solving, and national & international competitions.",
      primary: { label: "Request School Proposal", href: "/contact?type=proposal" },
      secondary: { label: "Book Free School Demo", href: "/contact?type=demo" },
      chips: [heroChips[0], heroChips[1], "Max 8 Students per Engineer", heroChips[3]],
      videoLabel: "Watch: A day at IC Robotics",
    },
    trustIndicators: ["STEM.org Accredited", "Arab Robotics Union", "International Competitions", "School Partnerships"],
    message: {
      ...h(
        "More Than Courses",
        "We help schools build a complete future-skills system",
        "I.C Robotics doesn't just deliver robotics and coding classes. We partner with schools to develop their educational system and introduce the skills of the future — Robotics, Programming and AI — into every stage.",
      ),
      system: [
        { title: "Trainers & engineers", blurb: "Certified trainers and specialised engineers deliver every session inside the school.", icon: "Users" },
        { title: "Equipment & kits", blurb: "Robotics kits, laptops and all the tools needed for training.", icon: "Cpu" },
        { title: "Curriculum & content", blurb: "A structured curriculum with a clear learning path for every student.", icon: "BookOpen" },
      ],
      method: ["Hands-on, practical training", "Problem-solving skills", "National & international competitions"],
    },
    ratio: {
      eyebrow: "Small Groups",
      title: "One engineer for every 8 students — at most",
      value: "1 : 8",
      body: "Training happens in small groups, so every trainer can follow each student's level and help them while they build and program their projects.",
      points: [
        "Each student's progress is followed individually",
        "Hands-on help during every activity and project",
        "A core part of how we guarantee training quality",
      ],
    },
    responsibilities: {
      ...h("How the Partnership Works", "Clear roles for the academy and the school", "A simple partnership model: we bring the program, the people and the equipment — the school provides the space."),
      academyTitle: "I.C Robotics provides",
      academy: [
        "Trainers and specialised engineers",
        "Educational robotics kits",
        "Laptops, tools and all equipment needed for training",
        "The curriculum, with a guaranteed learning path for every student",
      ],
      schoolTitle: "The school provides",
      school: ["A STEM lab or a suitable classroom for the activities"],
    },
    skills: {
      ...h(
        "Robotics, Programming & AI",
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

  events: {
    orientation: {
      eyebrow: "Orientation Day",
      title: "We meet students and parents before the school year starts",
      body: "Before the academic year begins, an I.C Robotics representative attends the orientation day organised by the school to explain what the program will offer students throughout the year — so parents are part of the journey from day one.",
      points: [
        "What students will learn during the year",
        "How sessions, kits and projects work",
        "How parents can follow their child's progress",
      ],
      photos: [],
    },
    roboticsDay: {
      eyebrow: "Robotics Day",
      title: "Every term ends with a Robotics Day",
      body: "At the end of each term, the academy organises a Robotics Day where students present the projects they built and the skills they gained during the course — giving parents the chance to see their children's learning and progress for themselves.",
      points: [
        "Students present their own robots and projects",
        "Parents see real results, not just reports",
        "A celebration of what every student achieved",
      ],
      photos: [],
      editions: [],
    },
  },

  contracting: {
    hero: {
      eyebrow: "Contracting Systems",
      title: "Choose How Your School Works With Us",
      subtitle: "Six flexible ways to bring Robotics, Programming and AI into your school — pick the one that fits, and request it in one click.",
    },
    journey: [
      { title: "Choose a system", blurb: "Pick the contracting system that fits your school." },
      { title: "Review the details", blurb: "See what's included and who it's for." },
      { title: "Request or book", blurb: "One click opens WhatsApp with a ready message." },
      { title: "Talk to our schools team", blurb: "Our School Department replies with a tailored plan." },
    ],
    systems: [
      {
        id: "all-school-students", title: "All School Students", arabic: "جميع طلاب المدرسة", icon: "School",
        summary: "The program is delivered to every student in the school as part of the school day.",
        details: [
          "Robotics, Programming and AI become part of the school's learning experience for all students, with a curriculum matched to each stage from KG to Secondary.",
          "I.C Robotics provides the trainers, kits and content; the school provides a STEM lab or suitable classroom.",
        ],
        includes: ["Stage-based curriculum for all grades", "Trainers and specialised engineers", "Robotics kits and equipment", "Orientation Day and end-of-term Robotics Day"],
        bestFor: "Schools that want future skills to be part of every student's education.",
        image: "", photos: [], presentation: "", buttonLabel: "Request this system",
        message: "",
      },
      {
        id: "optional-enrollment", title: "Optional Enrollment", arabic: "الاشتراك الاختياري", icon: "Users",
        summary: "Students who are interested can join the program inside the school — no obligation for everyone.",
        details: [
          "The school offers the program to its students and parents; those who want to join enrol, and sessions run inside the school.",
          "A great way to start small and grow the program based on demand.",
        ],
        includes: ["Program delivered inside the school", "Open to interested students only", "Trainers, kits and curriculum included"],
        bestFor: "Schools that want to offer robotics as an optional activity.",
        image: "", photos: [], presentation: "", buttonLabel: "Request this system",
        message: "",
      },
      {
        id: "event-booking", title: "Event Booking", arabic: "حجز الفعاليات", icon: "CalendarCheck",
        summary: "Book and organise educational technology events for your school.",
        details: [
          "We plan and run educational events at your school — such as robotics showcases, hands-on workshops and demo days — for students and parents.",
        ],
        includes: ["Event planning and delivery", "Hands-on activities for students", "Our team and equipment on site"],
        bestFor: "Schools planning a one-off event or a special day.",
        image: "", photos: [], presentation: "", buttonLabel: "Book an event",
        message: "",
      },
      {
        id: "summer-camp", title: "Summer Camp Activities", arabic: "أنشطة المعسكر الصيفي", icon: "Sun",
        summary: "Robotics, Programming and AI activities and programs during the school's summer camp.",
        details: [
          "Energetic summer programs where students build, code and compete in a fun camp format.",
        ],
        includes: ["Summer camp program and schedule", "Trainers and kits", "Final showcase for students"],
        bestFor: "Schools running a summer camp.",
        image: "", photos: [], presentation: "", buttonLabel: "Request this system",
        message: "",
      },
      {
        id: "stage-based", title: "Stage-Based Programs", arabic: "برامج لمراحل دراسية محددة", icon: "GraduationCap",
        summary: "The program is delivered to students of a specific stage inside the school.",
        details: [
          "Choose one or more stages — KG, Lower Primary, Upper Primary, Prep or Secondary — and we deliver the curriculum and kits designed for that stage.",
        ],
        includes: ["Curriculum designed for the chosen stage", "Kits matched to the students' age", "Trainers and specialised engineers"],
        bestFor: "Schools that want to start with a specific stage.",
        image: "", photos: [], presentation: "", buttonLabel: "Request this system",
        message: "",
      },
      {
        id: "competition-programs", title: "Competition Programs", arabic: "برامج المسابقات", icon: "Trophy",
        summary: "A specialised program that prepares students to take part in competitions.",
        details: [
          "We select and train school teams for national and international competitions, and students compete under their school's name.",
        ],
        includes: ["Team selection and training", "Competition kits and coaching", "Registration and participation support"],
        bestFor: "Schools that want to build a competition team.",
        image: "", photos: [], presentation: "", buttonLabel: "Request this system",
        message: "",
      },
    ],
    note: "Not sure which system fits? Message our School Department and we'll help you choose.",
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
    models: { ...h("Contracting Systems", "Choose the model that fits your school", "Six flexible ways to work with us — start small or integrate fully."), items: partnershipModels },
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
    robotics: {
      ...h("Robotics Program", "A clear robotics path for every stage", "Choose a stage to see exactly what students learn, the goals and outcomes, the hands-on activities, and the robotics kits we use."),
      stages: [
        {
          id: "kg", tab: "Robotics KG", title: "Robotics — KG", grades: "KG1 – KG2 · ages 4–6",
          summary: "Young children discover robots through play — giving instructions, building simple models and seeing cause and effect.",
          teach: [
            "Directions and step-by-step instructions with screen-free coding robots",
            "Shapes, colours and patterns through playful robot games",
            "Simple building with big bricks and following picture instructions",
          ],
          objectives: [
            "Understand that a robot follows the instructions we give it",
            "Build early logical thinking and sequencing",
            "Develop fine motor skills, teamwork and turn-taking",
          ],
          outcomes: [
            "Plans a short sequence of commands to reach a goal",
            "Notices a mistake in a sequence and fixes it",
            "Builds a simple model by following picture instructions",
          ],
          activities: [
            "Programming a robot through mazes and obstacle courses",
            "Coding-card games and storytelling with robots",
            "Build-and-play challenges in small groups",
          ],
          photos: [],
          kits: [
            {
              name: "Botley", image: "", ages: "KG", summary: "A screen-free coding robot that children program with a simple remote programmer.",
              components: ["Botley robot", "Remote programmer", "Coding cards", "Obstacle and maze pieces"],
              skills: ["Sequencing", "Directions", "Logical thinking", "Problem solving"],
              activities: ["Guiding Botley through mazes", "Avoiding obstacles", "Following coding-card challenges"],
              outcomes: ["Builds and runs a sequence of commands", "Debugs simple mistakes"],
              video: "",
            },
            {
              name: "Wise Child", image: "", ages: "KG", summary: "",
              components: [], skills: [], activities: [], outcomes: [], video: "",
            },
          ],
        },
        {
          id: "lower-prime", tab: "Robotics Lower Prime", title: "Robotics — Lower Primary", grades: "Grades 1 – 3",
          summary: "Students build motorised LEGO models with motors and sensors, and bring them to life with block-based programming.",
          teach: [
            "Building motorised models with LEGO WeDo 2.0",
            "Block-based programming to control motors and sensors",
            "Simple machines and how things move",
          ],
          objectives: [
            "Connect building with programming",
            "Understand how motors and sensors work",
            "Solve problems through design and testing",
          ],
          outcomes: [
            "Builds and programs a working model",
            "Uses motion and tilt sensors in a program",
            "Explains how the model works and improves it",
          ],
          activities: [
            "Building and programming animals, vehicles and machines",
            "Science-themed mini projects",
            "Team challenges and the end-of-term Robotics Day showcase",
          ],
          photos: [],
          kits: [
            {
              name: "LEGO WeDo 2.0", image: "", ages: "Grades 1 – 3",
              summary: "LEGO Education's early robotics set for building and programming motorised models with sensors.",
              components: ["Smarthub", "Medium motor", "Motion sensor", "Tilt sensor", "LEGO building elements"],
              skills: ["Building and engineering", "Block-based programming", "Using sensors", "Scientific thinking"],
              activities: ["Building and coding motorised models", "Sensor-based mini projects", "Team building challenges"],
              outcomes: ["Builds and programs a working robot model", "Understands inputs (sensors) and outputs (motors)"],
              video: "https://youtube.com/shorts/UzmtDTA0DtE",
            },
          ],
        },
        {
          id: "upper-prime", tab: "Robotics Upper Prime", title: "Robotics — Upper Primary", grades: "Grades 4 – 6",
          summary: "Students move to more advanced robots — gears, sensors and programs with loops and conditions.",
          teach: [
            "Advanced building with gears and mechanisms",
            "Programming with loops, conditions and sensors",
            "Introduction to competition-style missions",
          ],
          objectives: [
            "Design robots that react to their environment",
            "Strengthen logical and computational thinking",
            "Work as a team to plan, build and test",
          ],
          outcomes: [
            "Builds a robot that uses sensors to make decisions",
            "Writes programs with loops and conditions",
            "Tests, measures and improves a design",
          ],
          activities: ["Mission-based robot challenges", "Sensor projects", "Team presentations at Robotics Day"],
          photos: [],
          kits: [],
        },
        {
          id: "prep", tab: "Robotics Prep Stage", title: "Robotics — Prep Stage", grades: "Grades 7 – 9",
          summary: "Students design autonomous robots and prepare for competition-style challenges.",
          teach: [
            "Autonomous robots and advanced sensors",
            "Programming logic for autonomous missions",
            "Engineering design and competition strategy",
          ],
          objectives: [
            "Build robots that complete missions on their own",
            "Apply engineering design to real problems",
            "Prepare for national and international competitions",
          ],
          outcomes: [
            "Designs, builds and programs an autonomous robot",
            "Debugs complex behaviour systematically",
            "Presents and defends a technical solution",
          ],
          activities: ["Autonomous mission challenges", "Competition practice rounds", "Engineering design projects"],
          photos: [],
          kits: [],
        },
        {
          id: "secondary", tab: "Robotics Secondary Stage", title: "Robotics — Secondary Stage", grades: "Grades 10 – 12",
          summary: "Advanced robotics with microcontrollers and electronics, and preparation for international competitions.",
          teach: [
            "Microcontrollers and electronics",
            "Text-based programming for robots",
            "Systems design and international competition preparation",
          ],
          objectives: [
            "Build complete robotic systems from components",
            "Use real programming languages to control hardware",
            "Compete at national and international level",
          ],
          outcomes: [
            "Builds a robot from electronic components",
            "Programs hardware in a text-based language",
            "Leads a team project from idea to working prototype",
          ],
          activities: ["Microcontroller projects", "Competition robots", "Capstone engineering projects"],
          photos: [],
          kits: [],
        },
      ],
    },
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
      title: "Empowering Students to Compete on the World Stage",
      subtitle: "We empower students to represent their schools on local and international stages through robotics, coding, and innovation competitions.",
    },
    intro: [
      "Our students compete under their schools' names, showcasing their skills, creativity, teamwork, and technical excellence while building their schools' reputation and creating achievements to be proud of.",
      "From national championships to international competitions in countries such as China and South Korea, we help schools turn learning into real-world achievements and give students the opportunity to shine on the world stage.",
    ],
    participations: h("International Participations", "Representing their schools around the world", "Our international participations come first — students who represented their schools in China, South Korea and beyond."),
    international: h("Competitions We Compete In", "Local and international competitions", "Click a competition to see our participations over the years."),
    national: h("National Participations", "Competing across Egypt"),
    items: [
      { ...competitions[0], logo: "/logos/FLL.png", categories: ["FIRST LEGO League Explore", "FIRST LEGO League Challenge"] },
      { ...competitions[2], logo: "/logos/IRC.png", categories: [] },
      { id: "grc", name: "GRC Competitions", scope: "International", description: "Robotics competitions where our partner schools' teams compete and represent their schools.", countries: "", achievement: "", logo: "", categories: [] },
      { ...competitions[1], logo: "/logos/WRO.png", categories: [] },
      { ...competitions[3], logo: "/logos/Technoxian.png", categories: [] },
    ],
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

  participations: {
    items: [
      {
        competition: "International robotics competition", category: "", year: "", country: "China", countryCode: "CN",
        scope: "International", school: "Modern Mansoura College", team: "Youssef El-Gaous", result: "",
        summary: "Youssef El-Gaous represented Modern Mansoura College at an international robotics competition in China.",
        photos: [], video: "", evidence: "",
      },
      {
        competition: "International robotics competition", category: "", year: "", country: "South Korea", countryCode: "KR",
        scope: "International", school: "", team: "", result: "",
        summary: "I.C Robotics students represented their schools at an international robotics competition in South Korea.",
        photos: [], video: "", evidence: "",
      },
      {
        competition: "Robot Challenge", category: "", year: "", country: "Egypt", countryCode: "EG",
        scope: "National", school: "", team: "", result: "1st place",
        summary: "First place in Egypt at the Robot Challenge, competing in collaboration with a partner school.",
        photos: [], video: "", evidence: "",
      },
    ],
  },

  caseStudies: {
    items: [
      {
        id: "majesty", school: "Majesty International Schools", students: "", challenge: "", solution: "", impact: "", outcomes: [],
        location: "Al Khamayel, 26th of July Corridor, Giza", photo: "", logo: "/partners/Majesty International Schools.png",
        featured: true, since: "", programs: [], participation: "", achievements: [],
      },
      {
        id: "dis", school: "Damietta International Schools (DIS)", students: "", challenge: "", solution: "", impact: "", outcomes: [],
        location: "New Damietta", photo: "", logo: "/partners/Damietta International Schools.png",
        featured: true, since: "", programs: [], participation: "", achievements: [],
      },
      {
        ...caseStudies[0], school: "Modern Mansoura College (MMC)",
        location: "", photo: "", logo: "/partners/Modern Mansoura College.png", featured: false, since: "",
        programs: [], participation: "", achievements: [],
      },
      {
        ...caseStudies[1], location: "", photo: "", logo: "/partners/Sky Schools.png", featured: false, since: "",
        programs: [], participation: "", achievements: [],
      },
      ...["Mansoura College British School", "Mansoura College American School", "Al Wady Language Schools"].map((name) => ({
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), school: name, students: "", challenge: "", solution: "", impact: "", outcomes: [],
        location: "", photo: "", logo: `/partners/${name}.png`, featured: false, since: "", programs: [], participation: "", achievements: [],
      })),
    ],
  },

  stories: {
    hero: {
      eyebrow: "Success Stories",
      title: "Real Schools. Real Students. Real Impact.",
      subtitle: "Case studies and testimonials from the schools, parents and students who built their future with IC Robotics.",
    },
    schools: h("Our Partner Schools", "Schools that work with I.C Robotics", "Every school we have partnered with — with its location, the programs we deliver and what its students achieved."),
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
      title: "Robotics, Programming & AI education — built for schools",
      paragraphs: [
        "I.C Robotics is an educational technology academy that works with schools and students in three core areas: Robotics, Coding and Artificial Intelligence (AI).",
        "We design and deliver complete programs inside schools — trainers and specialised engineers, robotics kits and equipment, and a structured curriculum for every stage from KG to Secondary — so any school can offer future skills to its students.",
        "Our students learn by doing: they build and program real robots, solve problems in teams, present their projects at our end-of-term Robotics Day, and represent their schools in national and international competitions.",
        "For 9 years we have worked hand in hand with partner schools to turn technology education into real results for students, parents and school leaders.",
      ],
      image: "",
    },
    video: { label: "About I.C Robotics", url: "" },
    experience: {
      ...h("Our Experience", "9 years of building future-skills programs with schools"),
      years: "9",
      points: [
        "Programs delivered inside partner schools, from KG to Secondary",
        "Student teams prepared for national and international competitions",
        "Trainers and engineers specialised in Robotics, Coding and AI",
        "Long-term partnerships with schools across Egypt",
      ],
    },
    mission: {
      title: "Mission",
      body: "To make future-skills education accessible, measurable and inspiring for every child — by empowering schools with everything they need to deliver it.",
    },
    vision: {
      title: "Vision",
      body: "A generation of confident creators who shape technology rather than fear it — starting in the classroom and reaching the world stage.",
    },
    accreditations: h("Accreditations", "Internationally recognised"),
    judges: {
      ...h("International Judges Experience", "We don't just compete — we judge"),
      body: "Our coaches have served as judges and mentors at international robotics competitions — giving our students an insider understanding of exactly what wins on the world stage.",
    },
    team: {
      ...h("Our Team", "The people behind IC Robotics"),
      members: [
        { name: "", role: "Founder", photo: "" },
        { name: "", role: "Co-Founder", photo: "" },
        { name: "", role: "COO — Chief Operating Officer", photo: "" },
        { name: "", role: "Head of Curriculum", photo: "" },
        { name: "", role: "Head of Competitions", photo: "" },
        { name: "", role: "Head of Trainers", photo: "" },
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
