import { Globe, Mail, MessageCircle, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import type { SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string }>;

// lucide-react no longer ships brand icons; GitHub/LinkedIn live in BrandIcons.
const icons: Record<SocialLink["icon"], IconComponent> = {
  email: Mail,
  phone: Phone,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  website: Globe,
  whatsapp: MessageCircle,
};

/** Brand/social glyph resolved by kind; follows currentColor. */
export function SocialIcon({
  kind,
  className,
}: {
  kind: SocialLink["icon"];
  className?: string;
}) {
  const Icon = icons[kind];
  return <Icon className={cn("size-5", className)} />;
}

/** Square icon-only social link. */
export function SocialLinkButton({
  social,
  className,
}: {
  social: SocialLink;
  className?: string;
}) {
  const external = social.href.startsWith("http");
  return (
    <a
      href={social.href}
      aria-label={social.label}
      title={social.label}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className={cn(
        "grid size-9 place-items-center rounded-md text-muted transition-colors hover:bg-foreground/5 hover:text-foreground",
        className,
      )}
    >
      <SocialIcon kind={social.icon} />
    </a>
  );
}
