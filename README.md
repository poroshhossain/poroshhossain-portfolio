# Porosh Hossain — Portfolio

[![Live site](https://img.shields.io/badge/live-poroshhossain--portfolio.vercel.app-0A66C2?logo=vercel&logoColor=white)](https://poroshhossain-portfolio.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Code style: Biome](https://img.shields.io/badge/code_style-Biome-60A5FA)](https://biomejs.dev)

Personal portfolio for **Porosh Hossain — Full-Stack Web Engineer**. Fast,
SEO-tuned single-page site with project detail pages, a validated contact form,
dynamic Open-Graph metadata, sitemap and RSS-free robots configuration. OS-level
dark/light mode, fully responsive, no third-party UI kit.

> 🔗 **Live:** <https://poroshhossain-portfolio.vercel.app/>

## ✨ Features

- **App Router + React 19** with React Compiler auto-memoization
- **Typed content model** — every section renders from pure-data files, the UI
  adapts automatically (empty arrays hide sections gracefully)
- **Project detail pages** with overview, problem/role copy, screenshots,
  feature lists and challenge/solution write-ups
- **Contact form** with client + server validation, honeypot and per-instance
  in-memory rate limiting (Resend delivery, no SDK)
- **SEO ready** — canonical URLs, Open Graph/Twitter metadata,
  `sitemap.xml`, `robots.txt`
- **Zero-config theming** — Tailwind v4 tokens in CSS, `prefers-color-scheme`
  dark mode, `next/font` wired via `@theme inline`

## 🚀 Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | `biome check` — lint + format + import order |
| `npm run format` | `biome format --write` (lint fixes: `npx biome check --write`)[^1] |
| `npx tsc --noEmit` | Type-check only |

> [!NOTE]
> This is a single package — **npm** is the package manager
> (`package-lock.json`), no monorepo tooling.

## ✏️ Editing content

All page content lives in typed, pure-data files under `src/data/` — the UI
adapts automatically to what you add:

| File | Controls |
| --- | --- |
| `src/data/profile.ts` | Name, role, hero copy, email/socials/photo, about text, interests, experience array |
| `src/data/skills.ts` | Skill categories and chips |
| `src/data/projects.ts` | Featured projects, detail-page copy, screenshots, links |

Notes:

- The three projects shipped are **demo builds** (`isDemo: true`, rendered
  with a visible Demo badge). Replace them with real client work as it comes
  in — swap the data, screenshots and links, remove the flag.
- The `experience` array can stay empty; the section then renders a
  professional empty state pointing readers at project work (examples are in
  comments inside the file).
- The hero photo renders an initials roundel until
  `profile.profilePhoto` is set (drop the file in `public/images/`).
- Replace `public/resume.pdf` with the real resume (keep the filename).

### Project structure

```
src/
├── actions/           # Server actions (contact form delivery)
├── app/               # Routes, layout, metadata, sitemap, robots
│   └── globals.css    # Tailwind v4 theme tokens (@theme inline)
├── components/
│   ├── layout/        # Navbar, footer, shared shells
│   └── sections/      # Hero, About, Skills, Experience, Projects, Contact
├── data/              # Typed content — edit these, not the UI
└── lib/               # Site config, types, utils
```

## 📮 Contact form

The form ships with client+server validation, a honeypot and in-memory rate
limiting, but delivery is disabled until an email service is configured:

1. Create a [Resend](https://resend.com) account and verify a sender.
2. Set env vars (see `.env.example`): `RESEND_API_KEY`, optionally
   `CONTACT_TO_EMAIL` (defaults to `profile.email`) and `CONTACT_FROM`.
3. Redeploy. Until then, submissions return a clear "not configured" message
   pointing visitors at the direct email/LinkedIn links.

The action lives in `src/actions/contact.ts` (Resend REST calls via `fetch`,
no SDK installed — swap the provider there if you prefer something else).
Rate limiting is per-instance in-memory; add a durable store if you scale out.

## ☁️ Deployment

The site is deployed on **Vercel**:

> <https://poroshhossain-portfolio.vercel.app/>

Required environment variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production domain — canonical URLs, Open Graph, `sitemap.xml`, `robots.txt` |

For this deployment, set `NEXT_PUBLIC_SITE_URL=https://poroshhossain-portfolio.vercel.app`
(see `.env.example` for the full template). Any Node host works too:
`npm run build && npm run start`.
