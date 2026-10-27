import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialLinkButton } from "@/components/ui/SocialLinkButton";
import { YearStamp } from "@/components/ui/YearStamp";
import { profile } from "@/data/profile";
import { initialsOf } from "@/lib/utils";

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const brand = initialsOf(profile.name);

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
            >
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground"
              >
                {brand}
              </span>
              {profile.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              {profile.role} — {profile.headline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
              Pages
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
              Elsewhere
            </h3>
            <ul className="mt-3 flex items-center gap-2">
              {profile.socials.map((social) => (
                <li key={social.href}>
                  <SocialLinkButton social={social} />
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 block text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © <YearStamp /> {profile.name}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
