import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,color,opacity] duration-200 sm:py-2";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  outline:
    "border border-border bg-surface text-foreground hover:bg-foreground/5",
};

type ButtonLinkProps = {
  href: string;
  variant: Variant;
  children: ReactNode;
  className?: string;
  /** Turns on when the target must be downloaded (resume). */
  download?: boolean;
  icon?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href">;

/** Styled anchor used for CTAs, project links and resume downloads. */
export function ButtonLink({
  href,
  variant,
  children,
  className,
  download,
  icon,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(download ? { download: true } : undefined)}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
