/**
 * Canonical site URL, used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. "https://poroshhossain.dev").
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
