import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { education, profile } from "@/data/profile";

export function Education() {
  const email = profile.email;

  return (
    <Section id="education" title="Education">
      {education.length === 0 ? (
        <p className="max-w-2xl leading-7 text-muted">
          Academic background is being added to this section. To learn about my
          education right now, ask me directly at{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent-soft underline underline-offset-2 hover:text-accent"
          >
            {email}
          </a>
          .
        </p>
      ) : (
        <ol className="space-y-4">
          {education.map((entry) => (
            <li key={`${entry.institution}-${entry.period}`}>
              <article className="card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {entry.degree}
                      {entry.field ? ` — ${entry.field}` : ""}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {entry.institution}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted">{entry.period}</p>
                </div>
                {entry.details && entry.details.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {entry.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      )}
      {education.length === 0 ? (
        <div className="sr-only">
          <GraduationCap aria-hidden="true" />
        </div>
      ) : null}
    </Section>
  );
}
