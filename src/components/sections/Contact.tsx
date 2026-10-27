import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialLinkButton";
import { profile } from "@/data/profile";
import type { SocialLink } from "@/lib/types";

/** Direct contact rows (email, socials, phone/WhatsApp when provided). */
function directLinks(): SocialLink[] {
  const links: SocialLink[] = [
    { label: "Email", href: `mailto:${profile.email}`, icon: "email" },
    ...profile.socials,
  ];
  if (profile.phone) {
    links.push({
      label: "Phone",
      href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
      icon: "phone",
    });
  }
  if (profile.whatsapp) {
    links.push({ label: "WhatsApp", href: profile.whatsapp, icon: "whatsapp" });
  }
  return links;
}

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      lead="Whether it's a role, a project, or a question — I read everything and reply as soon as I can."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
        <ul className="max-w-md divide-y divide-border">
          {directLinks().map((link) => (
            <li key={`${link.icon}-${link.href}`}>
              <a
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : undefined)}
                className="group flex items-center gap-4 py-4"
              >
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface text-accent-soft transition-colors group-hover:bg-accent/10"
                >
                  <SocialIcon kind={link.icon} />
                </span>
                <span>
                  <span className="block text-sm font-medium">
                    {link.label}
                  </span>
                  <span className="block break-all text-sm text-muted group-hover:text-foreground">
                    {link.icon === "email"
                      ? link.href.replace("mailto:", "")
                      : link.label}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <ContactForm />
      </div>
    </Section>
  );
}
