# poroshhossain-portfolio

Personal portfolio for **Porosh Hossain — Full-Stack Web Engineer**, built with
Next.js (App Router), React 19, TypeScript and Tailwind CSS v4. OS-level dark
and light mode, Biome for lint/format.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
npm run lint    # biome check — lint + format + import order
npm run format  # biome format --write (import fixes: npx biome check --write)
```

## Editing content

All page content lives in typed, pure-data files under `src/data/` — the UI
adapts automatically to what you add:

| File | Controls |
| --- | --- |
| `src/data/profile.ts` | Name, role, hero copy, email/socials/photo, about text, interests, education & experience arrays |
| `src/data/skills.ts` | Skill categories and chips |
| `src/data/projects.ts` | Featured projects, detail-page copy, screenshots, links |

Notes:

- The three projects shipped are **demo builds** (`isDemo: true`, rendered
  with a visible Demo badge). Replace them with real client work as it comes
  in — swap the data, screenshots and links, remove the flag.
- `education` / `experience` arrays are empty on purpose — the sections render
  a professional empty state until entries are added (examples are in comments
  inside the files).
- The hero photo renders an initials roundel until
  `profile.profilePhoto` is set (drop the file in `public/images/`).
- Replace `public/resume.pdf` with the real resume (keep the filename).

## Contact form

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

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs,
Open Graph, `sitemap.xml` and `robots.txt`).
