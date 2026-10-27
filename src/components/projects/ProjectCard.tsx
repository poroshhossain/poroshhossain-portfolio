import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project } from "@/lib/types";

/**
 * Project card for the homepage grid. Presentational only — data comes from
 * src/data/projects.ts. Demo/code links render only when provided.
 * `eager`: set on cards likely to be the LCP element (first row on desktop).
 */
export function ProjectCard({
  project,
  eager = false,
}: {
  project: Project;
  eager?: boolean;
}) {
  const visibleTech = project.tech.slice(0, 4);
  const extraTech = project.tech.length - visibleTech.length;

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden">
      <div className="overflow-hidden border-b border-border">
        {/* SVG thumbnails skip the optimizer; remove `unoptimized` and keep
            next/image once real raster screenshots replace them. */}
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={800}
          height={450}
          unoptimized
          loading={eager ? "eager" : "lazy"}
          className="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight text-balance">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm after:absolute after:inset-0 hover:text-accent-soft"
            >
              {project.title}
            </Link>
          </h3>
          {project.isDemo ? (
            <span className="relative z-10 shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-accent-soft">
              Demo
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-6 text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technology stack">
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted"
            >
              {tech}
            </li>
          ))}
          {extraTech > 0 ? (
            <li
              aria-hidden="true"
              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted"
            >
              +{extraTech}
            </li>
          ) : null}
        </ul>

        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft hover:text-accent"
          >
            View details
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          {project.links?.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Live demo
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
          {project.links?.client ? (
            <a
              href={project.links.client}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Code
              <GithubIcon className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
