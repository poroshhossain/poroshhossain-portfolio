import { Section } from "@/components/ui/Section";
import { experience, profile } from "@/data/profile";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.length === 0 ? (
        <p className="max-w-2xl leading-7 text-muted">
          I don't have formal employment history to list yet — rather than pad
          this section, my practical experience is documented in my{" "}
          <a
            href="#projects"
            className="font-medium text-accent-soft underline underline-offset-2 hover:text-accent"
          >
            featured projects
          </a>{" "}
          as they are published. For the current picture of my background, reach
          me at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-accent-soft underline underline-offset-2 hover:text-accent"
          >
            {profile.email}
          </a>
          .
        </p>
      ) : (
        <ol className="space-y-4">
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.period}`}>
              <article className="card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {entry.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">{entry.company}</p>
                  </div>
                  <p className="font-mono text-xs text-muted">{entry.period}</p>
                </div>
                {entry.responsibilities && entry.responsibilities.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {entry.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {entry.technologies && entry.technologies.length > 0 ? (
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label="Technologies used"
                  >
                    {entry.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {entry.highlights && entry.highlights.length > 0 ? (
                  <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-accent-soft">
                      Highlights
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-foreground">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
