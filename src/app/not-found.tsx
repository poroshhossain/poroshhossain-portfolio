import { Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <span
        aria-hidden="true"
        className="grid size-14 place-items-center rounded-xl border border-border bg-surface text-accent-soft"
      >
        <Compass className="size-6" />
      </span>
      <p className="mt-6 font-mono text-xs font-medium uppercase tracking-widest text-accent-soft">
        404 — Page not found
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        That page doesn't exist
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The link may be broken, or the project may have been moved or renamed.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          href="/#projects"
          className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          Browse projects
        </Link>
      </div>
    </div>
  );
}
