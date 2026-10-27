/**
 * Shared content types. All portfolio content lives in `src/data/*.ts`
 * and is typed here so pages and components stay strictly typed.
 */

export type SocialKind =
  | "email"
  | "phone"
  | "github"
  | "linkedin"
  | "website"
  | "whatsapp";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialKind;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type Profile = {
  name: string;
  role: string;
  /** One-line headline shown under the name in the hero. */
  headline: string;
  /** Short hero introduction (2–3 sentences). */
  intro: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  /** Only publish socials that exist — unfilled entries are simply omitted. */
  socials: SocialLink[];
  location?: string;
  profilePhoto?: ImageAsset;
  about: {
    paragraphs: string[];
    /** Optional "beyond work" list; hidden when empty. */
    interests: string[];
  };
};

export type Education = {
  institution: string;
  degree: string;
  field?: string;
  period: string;
  details?: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  responsibilities?: string[];
  technologies?: string[];
  highlights?: string[];
};

export type SkillGroup = {
  title: string;
  /** Icon key resolved to a lucide icon in the Skills component. */
  icon: "code" | "server" | "database" | "tools";
  blurb?: string;
  skills: string[];
};

export type ProjectLinks = {
  demo?: string;
  client?: string;
  server?: string;
};

export type ProjectChallenge = {
  challenge: string;
  solution: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One-liner used on cards, social previews and search results. */
  summary: string;
  tech: string[];
  thumbnail: ImageAsset;
  screenshots?: ImageAsset[];
  overview?: string;
  problem?: string;
  role?: string;
  features?: string[];
  challenges?: ProjectChallenge[];
  improvements?: string[];
  links?: ProjectLinks;
  /**
   * Marks a demo/placeholder entry; it gets a visible "Demo" badge.
   * Do not set it on real client work.
   */
  isDemo?: boolean;
};

/** Shared between the client form and the server action. */
export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};
