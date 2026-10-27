import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";

export function About() {
  const { about } = profile;
  const hasInterests = about.interests.length > 0;

  return (
    <Section id="about" title="About me">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="max-w-3xl space-y-4">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="leading-7 text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {hasInterests ? (
          <aside className="card h-fit p-6" aria-label="Interests beyond work">
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
              Beyond work
            </h3>
            <ul className="mt-4 space-y-2.5">
              {about.interests.map((interest) => (
                <li
                  key={interest}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {interest}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </Section>
  );
}
