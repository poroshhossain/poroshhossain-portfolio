import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Featured projects"
      lead="Real capability, shown in working builds — each write-up covers the stack, decisions and trade-offs."
    >
      {projects.length === 0 ? (
        <p className="max-w-2xl leading-7 text-muted">
          The first projects are being written up and will appear here soon. For
          an early look or a walkthrough, reach me at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-medium text-accent-soft underline underline-offset-2 hover:text-accent"
          >
            {profile.email}
          </a>
          .
        </p>
      ) : (
        <>
          <p className="mb-6 max-w-2xl text-sm leading-6 text-muted">
            Builds marked{" "}
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase text-accent-soft">
              demo
            </span>{" "}
            are self-directed projects that demonstrate the stack I use for real
            work — ask me for a code walkthrough anytime.
          </p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <li key={project.slug}>
                {/* First card is usually the LCP element — load eagerly. */}
                <ProjectCard project={project} eager={index === 0} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
