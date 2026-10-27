export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-4 w-40 rounded bg-foreground/10" />
      <div className="mt-8 h-9 w-2/3 rounded bg-foreground/10" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full max-w-lg rounded bg-foreground/10" />
        <div className="h-4 w-1/2 rounded bg-foreground/10" />
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <div className="aspect-video rounded-xl bg-foreground/10" />
          <div className="h-28 rounded-xl bg-foreground/10" />
        </div>
        <div className="h-40 rounded-xl bg-foreground/10" />
      </div>
    </div>
  );
}
