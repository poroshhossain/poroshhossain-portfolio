import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ReactNode, Suspense } from "react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getProject, projects } from "@/data/projects";

/**
 * Static params exist only while there is at least one project — with an
 * empty list the route renders per-request (Suspense below), satisfying
 * Cache Components' "no empty generateStaticParams" rule. Adding the first
 * project automatically switches back to build-time prerendering.
 */
export const generateStaticParams =
  projects.length > 0
    ? () => projects.map((project) => ({ slug: project.slug }))
    : undefined;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "website",
    },
  };
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectContent params={props.params} />
    </Suspense>
  );
}

/** Suspense fallback for runtime-rendered project pages. */
function ProjectFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-4 w-40 rounded bg-foreground/10" />
      <div className="mt-8 h-9 w-2/3 rounded bg-foreground/10" />
      <div className="mt-10 aspect-video w-full max-w-3xl rounded-xl bg-foreground/10" />
    </div>
  );
}

async function ProjectContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const screenshots = project.screenshots?.length
    ? project.screenshots
    : [project.thumbnail];
  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to all projects
      </Link>

      <header className="mt-8 max-w-3xl">
        {project.isDemo ? (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-soft">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent-soft"
            />
            Demo — self-directed build; ask me for a live walkthrough
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        {project.links ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.demo ? (
              <ButtonLink
                href={project.links.demo}
                variant="primary"
                icon={<ExternalLink className="size-4" aria-hidden="true" />}
              >
                Live demo
              </ButtonLink>
            ) : null}
            {project.links.client ? (
              <ButtonLink
                href={project.links.client}
                variant="outline"
                icon={<GithubIcon className="size-4" />}
              >
                Client repository
              </ButtonLink>
            ) : null}
            {project.links.server ? (
              <ButtonLink
                href={project.links.server}
                variant="outline"
                icon={<GithubIcon className="size-4" />}
              >
                Server repository
              </ButtonLink>
            ) : null}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">
            Public links for this project aren't published yet — ask me about a
            walkthrough instead.
          </p>
        )}
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="max-w-3xl space-y-10">
          {project.overview ? (
            <SectionBlock title="Overview">
              <div className="space-y-4 leading-7 text-muted">
                {project.overview.split("\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </SectionBlock>
          ) : null}

          {/* Gallery / screenshots */}
          <section aria-label="Screenshots">
            <ul className="grid gap-4 sm:grid-cols-2">
              {screenshots.map((shot) => (
                <li key={`${shot.src}-${shot.alt}`}>
                  <div className="card overflow-hidden p-2">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={800}
                      height={450}
                      unoptimized
                      className="aspect-video w-full rounded-md object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {project.problem ? (
            <SectionBlock title="The problem it solves">
              <div className="card p-6 leading-7 text-muted">
                {project.problem}
              </div>
            </SectionBlock>
          ) : null}

          {project.features && project.features.length > 0 ? (
            <SectionBlock title="Main features">
              <ul className="space-y-2.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 leading-6 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </SectionBlock>
          ) : null}

          {project.challenges && project.challenges.length > 0 ? (
            <SectionBlock title="Challenges & solutions">
              <ul className="space-y-3">
                {project.challenges.map((item) => (
                  <li key={item.challenge.slice(0, 24)} className="card p-5">
                    <p className="text-sm font-semibold">{item.challenge}</p>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {item.solution}
                    </p>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          ) : null}

          {project.improvements && project.improvements.length > 0 ? (
            <SectionBlock title="Improvements & future plans">
              <ul className="space-y-2.5">
                {project.improvements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 leading-6 text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionBlock>
          ) : null}

          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Next project: {nextProject.title}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </article>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="card p-6">
            <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            {project.role ? (
              <>
                <h2 className="mt-6 font-mono text-xs font-medium uppercase tracking-widest text-muted">
                  My role
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {project.role}
                </p>
              </>
            ) : null}
          </div>
        </aside>
      </div>
    </Container>
  );
}
