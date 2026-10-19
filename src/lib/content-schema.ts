// Describes every editable section for the dashboard's Site Content editor.
// The editor renders forms from these definitions; the data shape matches site-defaults.ts.
import type { SectionKey } from "@/lib/site-defaults";

type Base = { key: string; label: string; help?: string };
export type Field =
  | (Base & { kind: "text"; placeholder?: string })
  | (Base & { kind: "textarea"; rows?: number })
  | (Base & { kind: "number" })
  | (Base & { kind: "video" })
  | (Base & { kind: "image" })
  | (Base & { kind: "icon" })
  | (Base & { kind: "boolean" })
  | (Base & { kind: "date" })
  | (Base & { kind: "select"; options: string[] })
  | (Base & { kind: "link" })
  | (Base & { kind: "strings"; itemLabel?: string; multiline?: boolean })
  | (Base & { kind: "list"; itemLabel: string; titleKey?: string; fields: Field[] })
  | (Base & { kind: "group"; fields: Field[]; collapsed?: boolean });

export type SectionDef = {
  key: SectionKey;
  title: string;
  description: string;
  group: "Website settings" | "Pages" | "Shared content" | "Data" | "Demo pages";
  icon: string;
  preview?: string;
  fields: Field[];
};

// ---------- small builders ----------
const text = (key: string, label: string, help?: string): Field => ({ kind: "text", key, label, help });
const area = (key: string, label: string, rows = 3, help?: string): Field => ({ kind: "textarea", key, label, rows, help });
const link = (key: string, label: string): Field => ({ kind: "link", key, label });
const heading = (key: string, label: string, collapsed = true): Field => ({
  kind: "group", key, label, collapsed,
  fields: [text("eyebrow", "Small label above the title"), text("title", "Title"), area("subtitle", "Subtitle (optional)", 2)],
});
const hero = (key = "hero", label = "Page header"): Field => ({
  kind: "group", key, label,
  fields: [text("eyebrow", "Small label above the title"), text("title", "Title"), area("subtitle", "Subtitle", 2)],
});
const cta = (key = "cta", label = "Call-to-action banner (bottom of page)"): Field => ({
  kind: "group", key, label, collapsed: true,
  fields: [text("title", "Title"), area("subtitle", "Subtitle", 2), link("primary", "Main button"), link("secondary", "Second button")],
});
const iconItems = (key: string, label: string, itemLabel: string, withBlurb = true): Field => ({
  kind: "list", key, label, itemLabel, titleKey: "title",
  fields: [text("title", "Title"), ...(withBlurb ? [area("blurb", "Short description", 2)] : []), { kind: "icon", key: "icon", label: "Icon" } as Field],
});

export const sections: SectionDef[] = [
  // ---------------- Website settings ----------------
  {
    key: "settings", group: "Website settings", icon: "Cog", preview: "/",
    title: "General & contact info",
    description: "Site name, logo, contact details, social links, navigation buttons and SEO text.",
    fields: [
      {
        kind: "group", key: "", label: "Brand", fields: [
          text("brandFirst", "Logo text — first word", "Shown next to the logo, e.g. “IC”"),
          text("brandSecond", "Logo text — highlighted word", "Shown in the gradient colour, e.g. “Robotics”"),
          { kind: "image", key: "logo", label: "Logo image" },
          text("copyrightName", "Organisation name (footer copyright)"),
        ],
      },
      {
        kind: "group", key: "", label: "Contact details (footer + contact page)", fields: [
          text("email", "Email"),
          text("phone", "Phone"),
          text("whatsapp", "WhatsApp number (optional)", "Leave empty to hide"),
          { kind: "strings", key: "addresses", label: "Addresses / branches", itemLabel: "address" },
        ],
      },
      {
        kind: "group", key: "social", label: "Social media links", help: "Paste full profile links. Empty links are hidden.", fields: [
          text("facebook", "Facebook"), text("instagram", "Instagram"), text("youtube", "YouTube"),
          text("linkedin", "LinkedIn"), text("tiktok", "TikTok"),
        ],
      },
      {
        kind: "group", key: "", label: "Top navigation buttons", fields: [
          link("navPrimary", "Main button"), link("navSecondary", "Second button"),
        ],
      },
      {
        kind: "group", key: "", label: "Footer text", fields: [
          area("footerBlurb", "Short description", 2),
          text("footerTagline", "Bottom line text"),
        ],
      },
      {
        kind: "group", key: "", label: "Search engines (SEO)", collapsed: true, fields: [
          text("siteTitle", "Default page title"),
          area("siteDescription", "Site description", 3),
        ],
      },
    ],
  },
  {
    key: "videos", group: "Website settings", icon: "Video", preview: "/",
    title: "Home page videos",
    description: "YouTube, YouTube Shorts, Vimeo or .mp4 links for the three home page video spots.",
    fields: [
      { kind: "video", key: "hero", label: "Hero video (top of home page)" },
      { kind: "video", key: "leadSection", label: "“Lead the way” section video" },
      { kind: "video", key: "partnership", label: "School Partnership section video" },
    ],
  },
  {
    key: "partners", group: "Website settings", icon: "Handshake", preview: "/",
    title: "Partner schools & logos",
    description: "The scrolling strip of trusted partners on the home page.",
    fields: [
      text("title", "Strip title"),
      {
        kind: "list", key: "items", label: "Partners", itemLabel: "partner", titleKey: "name",
        fields: [text("name", "Name (leave empty to show the logo only)"), { kind: "image", key: "logo", label: "Logo" }],
      },
    ],
  },
  {
    key: "stats", group: "Website settings", icon: "BarChart3", preview: "/about",
    title: "Impact numbers",
    description: "The animated counters (Students Trained, Partner Schools…) on the Home and About pages.",
    fields: [
      {
        kind: "list", key: "items", label: "Counters", itemLabel: "counter", titleKey: "label",
        fields: [text("label", "Label"), { kind: "number", key: "value", label: "Number" }, text("prefix", "Before the number (optional)"), text("suffix", "After the number, e.g. +")],
      },
    ],
  },
  {
    key: "cta", group: "Website settings", icon: "Rocket", preview: "/about",
    title: "Default call-to-action banner",
    description: "The blue banner at the bottom of Home, About, Success Stories and blog articles.",
    fields: [text("title", "Title"), area("subtitle", "Subtitle", 2), link("primary", "Main button"), link("secondary", "Second button")],
  },

  // ---------------- Pages ----------------
  {
    key: "home", group: "Pages", icon: "LayoutDashboard", preview: "/",
    title: "Home page",
    description: "Hero, trust badges, future skills, lead form section, how it works, partnership and section titles.",
    fields: [
      {
        kind: "group", key: "hero", label: "Hero (top of page)", fields: [
          text("eyebrow", "Small label above the title"),
          text("title", "Title — first part"),
          text("titleHighlight", "Title — highlighted part (gradient)"),
          area("subtitle", "Subtitle", 3),
          link("primary", "Main button"), link("secondary", "Second button"),
          { kind: "strings", key: "chips", label: "Highlight chips under the buttons", itemLabel: "chip" },
          text("videoLabel", "Video title (accessibility)"),
        ],
      },
      { kind: "strings", key: "trustIndicators", label: "Trust badges under the partner logos", itemLabel: "badge" },
      {
        kind: "group", key: "skills", label: "Why Future Skills Matter", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2),
          text("careersLabel", "Careers label"),
          {
            kind: "list", key: "items", label: "Skill cards", itemLabel: "skill", titleKey: "title",
            fields: [text("title", "Title"), area("blurb", "Description", 3), { kind: "icon", key: "icon", label: "Icon" }, { kind: "strings", key: "jobs", label: "Example careers", itemLabel: "career" }],
          },
        ],
      },
      heading("impact", "Our Impact section title"),
      {
        kind: "group", key: "lead", label: "“Lead the way” section (parent form)", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2),
          text("buttonLabel", "Form button text"), text("note", "Small note under the form"), text("videoLabel", "Video title (accessibility)"),
        ],
      },
      {
        kind: "group", key: "howItWorks", label: "How It Works", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2),
          { kind: "list", key: "steps", label: "Steps", itemLabel: "step", titleKey: "title", fields: [text("title", "Title"), area("blurb", "Description", 2)] },
          { kind: "list", key: "outcomes", label: "Result profiles", itemLabel: "profile", titleKey: "title", fields: [text("title", "Title"), text("track", "Track"), { kind: "icon", key: "icon", label: "Icon" }] },
          link("button", "Button"),
        ],
      },
      {
        kind: "group", key: "partnership", label: "School Partnership section", collapsed: true, help: "The checklist items come from For Schools → What Schools Receive.", fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Paragraph", 3), link("button", "Button"), text("videoLabel", "Video title (accessibility)"),
        ],
      },
      {
        kind: "group", key: "stories", label: "Success Stories section", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2), link("button", "Button"),
        ],
      },
      heading("competitions", "Latest Competitions section title"),
    ],
  },
  {
    key: "schools", group: "Pages", icon: "School", preview: "/for-schools",
    title: "For Schools page",
    description: "Why schools choose you, partnership models, what schools receive, readiness banner and dashboard preview.",
    fields: [
      {
        kind: "group", key: "hero", label: "Page header", fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2), link("primary", "Main button"), link("secondary", "Second button"),
        ],
      },
      { kind: "group", key: "why", label: "Why Schools Choose IC Robotics", collapsed: true, fields: [text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2), iconItems("items", "Items", "item", false)] },
      { kind: "group", key: "models", label: "Partnership Models", collapsed: true, fields: [text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2), iconItems("items", "Models", "model")] },
      { kind: "group", key: "receives", label: "What Schools Receive (also used on Home)", collapsed: true, fields: [text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2), iconItems("items", "Items", "item")] },
      { kind: "group", key: "readiness", label: "Readiness assessment banner", collapsed: true, fields: [text("badge", "Badge"), text("title", "Title"), area("body", "Text", 2), link("button", "Button")] },
      heading("proven", "Case studies section title"),
      {
        kind: "group", key: "dashboard", label: "School Dashboard Preview", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2),
          { kind: "list", key: "cards", label: "Cards", itemLabel: "card", titleKey: "label", fields: [text("label", "Label"), text("value", "Value"), text("hint", "Hint")] },
        ],
      },
      cta(),
    ],
  },
  {
    key: "programs", group: "Pages", icon: "GraduationCap", preview: "/programs",
    title: "Programs page",
    description: "All courses (Robotics, Coding, AI), track intros and the KG → Secondary roadmap.",
    fields: [
      hero(),
      {
        kind: "list", key: "tracks", label: "Track headings", itemLabel: "track", titleKey: "title",
        help: "Programs are grouped under these three tracks.",
        fields: [{ kind: "select", key: "key", label: "Track", options: ["Robotics", "Coding", "AI"] }, text("title", "Title"), area("blurb", "Description", 2)],
      },
      {
        kind: "list", key: "items", label: "Programs / courses", itemLabel: "program", titleKey: "title",
        fields: [
          { kind: "select", key: "track", label: "Track", options: ["Robotics", "Coding", "AI"] },
          text("title", "Title"), text("stage", "Stage (e.g. Primary)"), text("ages", "Ages (e.g. 7–9)"),
          area("description", "Description", 2),
          { kind: "strings", key: "outcomes", label: "Outcomes", itemLabel: "outcome" },
          text("id", "Internal ID", "Unique, no spaces"),
        ],
      },
      {
        kind: "group", key: "roadmap", label: "Learning roadmap", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2),
          { kind: "list", key: "rows", label: "Stages", itemLabel: "stage", titleKey: "stage", fields: [text("stage", "Stage"), text("ages", "Ages"), text("robotics", "Robotics"), text("coding", "Coding"), text("ai", "AI")] },
        ],
      },
      cta(),
    ],
  },
  {
    key: "competitions", group: "Pages", icon: "Trophy", preview: "/competitions",
    title: "Competitions page",
    description: "Competitions (also used on Home and the registration form), journey steps and section titles.",
    fields: [
      hero(),
      {
        kind: "list", key: "items", label: "Competitions", itemLabel: "competition", titleKey: "name",
        help: "These appear on the Competitions page, the Home page and in the registration form.",
        fields: [
          text("name", "Name"),
          { kind: "select", key: "scope", label: "Scope", options: ["International", "National"] },
          area("description", "Description", 2),
          text("countries", "Countries (e.g. 90+ countries)"),
          text("achievement", "Our achievement"),
          { kind: "image", key: "logo", label: "Logo" },
          text("id", "Internal ID", "Unique, no spaces — used in registration links"),
        ],
      },
      heading("international", "International section title"),
      heading("national", "National section title"),
      {
        kind: "group", key: "journey", label: "Competition journey", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("subtitle", "Subtitle", 2),
          { kind: "list", key: "steps", label: "Steps", itemLabel: "step", titleKey: "title", fields: [text("title", "Title"), area("blurb", "Description", 2)] },
        ],
      },
      heading("awards", "Awards section title"),
      heading("gallery", "Gallery section title (photos come from Media)"),
      cta(),
    ],
  },
  {
    key: "stories", group: "Pages", icon: "Star", preview: "/success-stories",
    title: "Success Stories page",
    description: "Page header and section titles. Case studies, achievements and reviews are edited separately.",
    fields: [
      hero(),
      heading("caseStudies", "Case studies section"),
      heading("students", "Student stories section"),
      heading("parents", "Parent testimonials section"),
      heading("leaders", "School leaders section"),
      heading("achievements", "International achievements section"),
    ],
  },
  {
    key: "about", group: "Pages", icon: "Users", preview: "/about",
    title: "About page",
    description: "Company overview, photo, mission & vision, accreditations, judges experience and team.",
    fields: [
      hero(),
      {
        kind: "group", key: "overview", label: "Company overview", fields: [
          text("eyebrow", "Small label"), text("title", "Title"),
          { kind: "strings", key: "paragraphs", label: "Paragraphs", itemLabel: "paragraph", multiline: true },
          { kind: "image", key: "image", label: "Photo (optional)" },
        ],
      },
      { kind: "group", key: "mission", label: "Mission", collapsed: true, fields: [text("title", "Title"), area("body", "Text", 3)] },
      { kind: "group", key: "vision", label: "Vision", collapsed: true, fields: [text("title", "Title"), area("body", "Text", 3)] },
      { kind: "group", key: "accreditations", label: "Accreditations", collapsed: true, fields: [text("eyebrow", "Small label"), text("title", "Title"), { kind: "strings", key: "items", label: "Accreditations", itemLabel: "accreditation" }] },
      { kind: "group", key: "judges", label: "International judges experience", collapsed: true, fields: [text("eyebrow", "Small label"), text("title", "Title"), area("body", "Text", 3)] },
      {
        kind: "group", key: "team", label: "Team", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"),
          { kind: "list", key: "members", label: "Team members", itemLabel: "member", titleKey: "name", fields: [text("name", "Name"), text("role", "Role"), { kind: "image", key: "photo", label: "Photo (optional)" }] },
        ],
      },
    ],
  },
  {
    key: "contact", group: "Pages", icon: "Mail", preview: "/contact",
    title: "Contact page",
    description: "Header, contact reasons and the orientation-day banner. Phone/email/addresses are in General settings.",
    fields: [
      hero(),
      iconItems("routes", "Contact reasons (left column)", "reason"),
      text("infoTitle", "Contact info box title"),
      {
        kind: "group", key: "orientation", label: "Orientation day banner", collapsed: true, fields: [
          text("eyebrow", "Small label"), text("title", "Title"), area("body", "Text", 2), link("button", "Button"),
          { kind: "list", key: "items", label: "Highlights", itemLabel: "highlight", titleKey: "label", fields: [text("label", "Label"), { kind: "icon", key: "icon", label: "Icon" }] },
        ],
      },
    ],
  },
  {
    key: "blog", group: "Pages", icon: "BookOpen", preview: "/blog",
    title: "Blog page",
    description: "Blog header and section titles. Articles themselves are under Articles.",
    fields: [hero(), heading("parents", "Parents section"), heading("schools", "Schools section"), text("ctaTitle", "Bottom banner title")],
  },
  {
    key: "registration", group: "Pages", icon: "Flag", preview: "/competition-registration",
    title: "Competition registration page",
    description: "Header of the competition registration form page.",
    fields: [hero()],
  },
  {
    key: "verify", group: "Pages", icon: "ShieldCheck", preview: "/verify",
    title: "Certificate verification page",
    description: "Heading and the sample ID visitors can click to try.",
    fields: [text("eyebrow", "Small label"), text("title", "Title"), text("sampleId", "Sample certificate ID (leave empty to hide)")],
  },

  // ---------------- Shared content ----------------
  {
    key: "caseStudies", group: "Shared content", icon: "Building2", preview: "/success-stories",
    title: "School case studies",
    description: "Shown on Home, For Schools and Success Stories.",
    fields: [
      {
        kind: "list", key: "items", label: "Case studies", itemLabel: "case study", titleKey: "school",
        fields: [
          text("school", "School name"), text("students", "Students (e.g. 1,500+ students)"),
          area("challenge", "Challenge", 2), area("solution", "Solution", 2), area("impact", "Impact", 2),
          { kind: "strings", key: "outcomes", label: "Outcomes", itemLabel: "outcome" },
          text("id", "Internal ID", "Unique, no spaces"),
        ],
      },
    ],
  },
  {
    key: "achievements", group: "Shared content", icon: "Medal", preview: "/competitions",
    title: "International achievements",
    description: "Award list shown on Competitions and Success Stories.",
    fields: [{ kind: "strings", key: "items", label: "Achievements", itemLabel: "achievement" }],
  },

  // ---------------- Data ----------------
  {
    key: "certificates", group: "Data", icon: "Award", preview: "/verify",
    title: "Certificates",
    description: "Certificate IDs that visitors can verify on the Verify page.",
    fields: [
      {
        kind: "list", key: "items", label: "Certificates", itemLabel: "certificate", titleKey: "id",
        fields: [
          text("id", "Certificate ID", "e.g. ICR-2025-NAME-0001 (not case-sensitive)"),
          text("name", "Student name"), text("course", "Course"),
          { kind: "date", key: "issued", label: "Issue date" },
          { kind: "boolean", key: "valid", label: "Valid (untick to revoke)" },
        ],
      },
    ],
  },

  // ---------------- Demo pages ----------------
  {
    key: "studentDashboard", group: "Demo pages", icon: "LayoutDashboard", preview: "/student-dashboard",
    title: "Student dashboard demo",
    description: "The sample student shown on the Student Dashboard page.",
    fields: [
      hero(),
      {
        kind: "group", key: "", label: "Student", fields: [
          text("student", "Name"), text("initials", "Initials"), text("level", "Level title"), text("levelNumber", "Level number"),
          { kind: "number", key: "points", label: "Points" }, { kind: "number", key: "attendance", label: "Attendance %" }, { kind: "number", key: "completion", label: "Completion %" },
        ],
      },
      { kind: "strings", key: "badges", label: "Badges", itemLabel: "badge" },
      { kind: "strings", key: "achievements", label: "Achievements", itemLabel: "achievement" },
      { kind: "list", key: "projects", label: "Projects", itemLabel: "project", titleKey: "name", fields: [text("name", "Name"), text("track", "Track"), { kind: "select", key: "status", label: "Status", options: ["Completed", "In Progress"] }] },
      { kind: "strings", key: "certificates", label: "Certificates", itemLabel: "certificate" },
      { kind: "list", key: "competitionHistory", label: "Competition history", itemLabel: "entry", titleKey: "event", fields: [text("event", "Event"), text("year", "Year"), text("result", "Result")] },
    ],
  },
  {
    key: "portfolio", group: "Demo pages", icon: "FileText", preview: "/student/ahmed",
    title: "Student portfolio demo",
    description: "The sample public portfolio at /student/… — projects, videos, certificates and awards.",
    fields: [
      text("name", "Student name"), text("tagline", "Tagline"),
      { kind: "list", key: "projects", label: "Projects", itemLabel: "project", titleKey: "name", fields: [text("name", "Name"), { kind: "select", key: "track", label: "Track", options: ["Robotics", "Coding", "AI"] }, area("desc", "Description", 2)] },
      { kind: "list", key: "videos", label: "Videos", itemLabel: "video", titleKey: "label", fields: [text("label", "Title"), { kind: "video", key: "url", label: "Video link" }] },
      { kind: "strings", key: "certificates", label: "Certificates", itemLabel: "certificate" },
      { kind: "strings", key: "competitions", label: "Competitions", itemLabel: "competition" },
      { kind: "strings", key: "awards", label: "Awards", itemLabel: "award" },
    ],
  },
];

export const sectionByKey = Object.fromEntries(sections.map((s) => [s.key, s])) as Record<SectionKey, SectionDef>;
export const sectionGroups = ["Website settings", "Pages", "Shared content", "Data", "Demo pages"] as const;
