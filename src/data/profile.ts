import type { Education, Experience, Profile } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Personal content — edit everything in this file, the UI adapts.
 * Replace `@example.com` placeholders and "TODO: confirm" URLs with real
 * values. Unfilled optional fields are simply not rendered.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile: Profile = {
  email: "poroshhossain.dev@gmail.com",
  name: "Porosh Hossain",
  role: "Full-Stack Web Engineer",
  headline: "I build dependable web applications, from interface to database.",
  intro:
    "I'm a full-stack web engineer focused on modern, reliable web applications — clean React frontends backed by well-structured APIs and data. I care about code that is correct today and easy to maintain later.",
  socials: [
    // TODO: confirm your GitHub profile URL.
    {
      label: "GitHub",
      href: "https://github.com/poroshhossain",
      icon: "github",
    },
    // TODO: replace with your LinkedIn profile URL.
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/poroshhossain",
      icon: "linkedin",
    },
  ],
  profilePhoto: {
    src: "/images/profile.jpg",
    alt: "Porosh Hossain working at his desk",
  },
  location: undefined, // e.g. "Dhaka, Bangladesh"
  about: {
    paragraphs: [
      "I enjoy owning features end to end: the parts users see, the APIs behind them, and the data that ties it all together. Building either side alone always felt incomplete — the interesting problems live at the boundary, where a fast interface meets a dependable backend.",
      "My way into web development was curiosity about how things work under the hood. Fixing small bugs in other people's sites turned into building small tools of my own, and one project led naturally to the next. That loop — break it, understand it, rebuild it — is still how I learn best.",
      "When I hit a problem I don't understand, I reproduce it reliably, isolate the smallest failing case, and read the documentation before reaching for guesses. When I pick up a new technology, I build a small real thing with it instead of skimming tutorials; that's how new tools actually stick.",
      "The work I'm happiest with is practical: dashboards that make data easy to act on, internal tools that remove repetitive work, and clean REST APIs that other developers can build on without surprises.",
    ],
    // TODO: add 3–5 real interests, e.g. ["Community tech meetups", "Open-source reading", "Chess"].
    interests: [],
  },
};

/**
 * Education entries. The section renders a professional "coming soon" state
 * while this array is empty — add the first entry to flesh it out:
 *
  {
    institution: "University name",
    degree: "B.Sc. in Computer Science",
    field: "Department of Computer Science",
    period: "2021 – 2025",
    details: ["Optional details: coursework, activities, honors."],
  },
 */
export const education: Education[] = [];

/**
 * Experience entries. If you have no formal employment yet, you can leave
 * this empty (the section then points readers at project work) or describe
 * internships, freelance work and open-source contributions:
 *
  {
    role: "Web Developer (Freelance)",
    company: "Independent",
    period: "2024 – Present",
    responsibilities: ["Independently scoped, built and shipped client websites."],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    highlights: ["Optional measurable outcomes, only when verified."],
  },
 */
export const experience: Experience[] = [];
