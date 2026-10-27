# poroshhossain-portfolio

Next.js 16 App Router app, React 19, TypeScript strict. All code lives in `src/app/`; no other packages. npm is the package manager (`package-lock.json`) — one package, not a monorepo.

## Commands

- `npm run dev` / `npm run build` — Turbopack is the default bundler.
- `npm run lint` — runs `biome check`: lints **and** verifies formatting + import order (`organizeImports` is on). Run before finishing work; do not fix style by hand.
- `npm run format` — `biome format --write` only formats edits. To also fix lint issues and import order: `npx biome check --write`.
- Typecheck: `npx tsc --noEmit` (there is no `typecheck` script, no test suite, no CI).
- Fresh clone gotcha: `next-env.d.ts` and the route helper globals (`LayoutProps`, `PageProps`, typed in generated `.next/types/`) don't exist until the first `next dev` / `next build`, and both are gitignored — `tsc` will fail on a clean checkout. Don't commit `next-env.d.ts`; it's regenerated.

## Framework quirks — do not undo these `next.config.ts` flags

- `reactCompiler: true`: React Compiler auto-memoizes. Don't add `memo`/`useMemo` for performance, and never mutate props/state (the compiler assumes the Rules of React).
- `cacheComponents: true` + `partialPrefetching: true`: caching/prefetch semantics differ from stock Next.js — check `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` before adding any dynamic data fetching.
- Tailwind v4 with no config file: theme tokens are declared in `src/app/globals.css` under `@theme inline`, wired to `next/font` variables (`--font-geist-sans`, `--font-geist-mono`). CSS is processed by `@tailwindcss/turbopack`.
- Dark mode is media-query based (`prefers-color-scheme` in `globals.css`), not Tailwind class-based.
- Path alias: `@/*` → `src/*`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
