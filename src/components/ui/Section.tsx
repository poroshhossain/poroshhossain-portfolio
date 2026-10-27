import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Standard page section: uniform vertical rhythm + anchored `id` for navbar
 * links. `aria-labelledby` ties it to its heading for screen readers.
 */
export function Section({
  id,
  title,
  lead,
  children,
  className,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-16 sm:py-24", className)}
    >
      <Container>
        <header className="mb-10 max-w-2xl sm:mb-14">
          <h2
            id={headingId}
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {title}
          </h2>
          {lead ? (
            <p className="mt-3 text-base leading-7 text-muted">{lead}</p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
