"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year. Static prerendered HTML shows nothing until
 * hydration fills it in — `new Date()` is an unstable value that Next.js
 * forbids during prerendering.
 */
export function YearStamp() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
