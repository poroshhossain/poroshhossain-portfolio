import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent-soft">
        404 — Project not found
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        This project doesn't exist
      </h1>
      <p className="mt-3 max-w-md text-muted">
        It may have been renamed or is not published yet.
      </p>
      <Link
        href="/#projects"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to all projects
      </Link>
    </div>
  );
}
