import type { SkillGroup } from "@/lib/types";

/**
 * Skill lists are intentionally flat — add or remove strings freely.
 * PostgreSQL is deliberately absent until there is real experience with it.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "code",
    blurb: "Interfaces, component architecture and responsive layouts.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    icon: "server",
    blurb: "Services, APIs and the session layer behind them.",
    skills: ["Node.js", "Express.js", "REST APIs", "Auth & authorization"],
  },
  {
    title: "Database",
    icon: "database",
    blurb: "Schema design and queries for application data.",
    skills: ["MongoDB"],
    // PostgreSQL joins here once experience is real:
    // skills: ["MongoDB", "PostgreSQL"],
  },
  {
    title: "Tools & workflow",
    icon: "tools",
    blurb: "The daily workflow around the code.",
    skills: ["Git", "GitHub", "VS Code"],
    // e.g. add: ["Vercel", "Postman", "Docker"] — only tools actually used.
  },
];
