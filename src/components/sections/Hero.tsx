import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SocialLinkButton } from "@/components/ui/SocialLinkButton";
import { profile } from "@/data/profile";
import { initialsOf } from "@/lib/utils";

/**
 * Above-the-fold introduction. Server-rendered; only the navbar and the
 * contact form need client JS.
 */
export function Hero() {
  const initials = initialsOf(profile.name);

  return (
    <section id="home" aria-label="Introduction">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-accent-soft">
            {profile.role}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-lg font-medium tracking-tight text-foreground sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="#projects"
              variant="primary"
              icon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              View Projects
            </ButtonLink>
            <ButtonLink
              href="/resume.pdf"
              download
              variant="outline"
              icon={<Download className="size-4" aria-hidden="true" />}
            >
              Download Resume
            </ButtonLink>
          </div>

          <ul
            className="mt-6 flex items-center gap-1"
            aria-label="Social profiles"
          >
            {profile.socials.map((social) => (
              <li key={social.href}>
                <SocialLinkButton social={social} />
              </li>
            ))}
          </ul>
        </div>

        <div className="justify-self-center">
          {profile.profilePhoto ? (
            <Image
              src={profile.profilePhoto.src}
              alt={profile.profilePhoto.alt}
              width={192}
              height={192}
              className="size-40 rounded-full border border-border object-cover sm:size-48"
              priority
            />
          ) : (
            <div
              role="img"
              aria-label="Profile photo placeholder"
              className="grid size-40 place-items-center rounded-full border border-border bg-surface text-3xl font-semibold text-muted sm:size-48"
            >
              <span aria-hidden="true">{initials}</span>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
