"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ProjectError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  // Contentful detail pages are static; surface the error for local devs and
  // keep a digest identifier for production logs. Never show raw messages.
  console.error("Project detail failed to render:", error);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        This project page hit an error
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Something went wrong while loading this project. You can try again or
        head back to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
