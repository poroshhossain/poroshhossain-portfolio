import { Code2, Database, Server, Wrench } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";
import type { SkillGroup } from "@/lib/types";

const groupIcons: Record<SkillGroup["icon"], typeof Code2> = {
  code: Code2,
  server: Server,
  database: Database,
  tools: Wrench,
};

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      lead="Technologies and tools I work with, grouped by focus area."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => {
          const Icon = groupIcons[group.icon];
          return (
            <li key={group.title}>
              <div className="card h-full p-6 transition-shadow duration-200 hover:shadow-md">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-md bg-accent/10 text-accent-soft"
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="font-semibold tracking-tight">
                    {group.title}
                  </h3>
                </div>
                {group.blurb ? (
                  <p className="mt-3 text-sm text-muted">{group.blurb}</p>
                ) : null}
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={`${group.title} skills`}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
