# Vikram Kumar - Portfolio

Single-page portfolio with an Apple-style liquid glass UI over a landscape that follows the visitor's time of day. Daytime scenes switch to light glass, evening and night scenes to dark glass.

## Stack

- Next.js 15 (App Router, fully static), React 18, TypeScript
- Tailwind CSS 4 (CSS-first config in `styles/globals.css`), Framer Motion
- Self-hosted Inter (`@fontsource-variable/inter`), SF Pro on Apple devices

## Structure

```
app/
  layout.tsx            Metadata, JSON-LD, scene boot script, providers
  page.tsx              Section order
  api/contact/route.ts  Nodemailer: notifies me, sends the visitor a confirmation
  sitemap.ts, robots.ts SEO routes
  icon.svg, apple-icon.png
components/
  glass.tsx             <Glass> surface with pointer-following highlight
  scene-provider.tsx    Current scene (clock or manual) and light/dark theme
  time-background.tsx   Responsive background with crossfade
  skill-focus.tsx       Selected-skill state shared by skills, experience, projects
  company-mark.tsx      Company wordmarks and tiles (uses logo files when provided)
  contact-form.tsx      Contact form posting to /api/contact
  time-control.tsx      Live clock + time-of-day slider
  sections/             hero, about, skills, experience, projects, education-contact
config/
  resume.ts             All content: profile, companies, skills, roles, projects, education
  background-map.ts     Scenes, hours, and light/dark theme per scene
  site.ts               Site URL, title, nav
lib/
  skill-index.ts        Maps each skill to the roles and projects that use it
  email/                SMTP transport and Apple-style HTML email templates
public/
  bg/                   <scene>-1280.webp, <scene>-2560.webp, <scene>-lqip.webp
  og.jpg                Link preview image
  Vikram_Kumar_Resume.pdf
scripts/build-images.py Regenerates background sizes
```

## Case studies

Long-form pages live at `/projects/<slug>` and are defined in `config/case-studies.ts` (problem, role, design, engineering, results, screenshots or a flow diagram). Link a project card to one with `caseStudy: "<slug>"` in `config/resume.ts`. Screenshots go in `public/case-studies/<slug>/`. Link preview images are rendered by `npm run og` into `public/og/`.

## Editing content

Everything on the page comes from `config/resume.ts`.

- **Skills to experience links**: clicking a skill highlights the roles and projects that mention it. Matching uses the skill name; for descriptive skills, add search terms in `lib/skill-index.ts`. A role's `keywords` array adds resume terms used for matching without displaying them.
- **Company logos**: drop official logo files (SVG preferred) into `public/logos/` and set `logo: "/logos/ibm.svg"` on the company. Logos are rendered monochrome and adapt to light and dark glass. Without a logo, a neutral wordmark is shown.

## Environment

Copy `.env.example` to `.env.local` for local overrides.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, Open Graph, and email links. Falls back to the Vercel production URL. |
| `NEXT_PUBLIC_BOOKING_URL` | Cal.com or Calendly link for the "Book a call" modal. Button hidden until set. |
| `RESEND_API_KEY`, `MAIL_FROM` | Resend email (preferred). `MAIL_FROM` must be on a domain verified in Resend, e.g. `Vikram Kumar <hello@yourdomain.com>`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | SMTP fallback via Nodemailer (e.g. Gmail + App Password). Used when Resend is not configured. |
| `CONTACT_TO` | Where new-message notifications go. Defaults to the profile email. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile invisible bot check on the form. Skipped when unset. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Shared rate limit across serverless instances. Falls back to in-memory when unset. |
| `CONTACT_RATE_LIMIT` | Messages per IP per 10 minutes (default 5). |

### Contact form flow

1. `POST /api/contact` rate-limits by IP (Upstash or in-memory), validates with zod, checks a honeypot, and verifies the Turnstile token.
2. A notification is emailed to `CONTACT_TO` with the visitor as Reply-To (Resend, or SMTP).
3. Only if that succeeds, the visitor gets the branded confirmation email.

Without an email provider the API returns 503 and the form tells the visitor to email directly.

### Better deliverability with a custom domain

1. Buy a domain and add it to Vercel.
2. Create a Resend account, add the domain, and add the DNS records Resend shows (SPF, DKIM, optional DMARC).
3. Set `RESEND_API_KEY` and `MAIL_FROM="Vikram Kumar <hello@yourdomain.com>"` in Vercel and redeploy.

## Deploying to Vercel

1. Import `Brutalvik/glass-portfolio` at vercel.com/new. Framework preset: Next.js, no build settings needed.
2. Add the SMTP variables above (and `NEXT_PUBLIC_SITE_URL` if using a custom domain).
3. Deploy. Every push to `main` redeploys; pull requests get preview URLs.

## Glass notes

- `.glass` uses `backdrop-filter: blur() saturate()` plus a masked gradient rim and inset highlights. Colors come from CSS variables that switch with `data-theme`.
- Never put `filter`, `mask`, `backdrop-filter`, or a resting `opacity < 1` on an ancestor of a `.glass` element; it stops the blur from sampling the page. To dim a card, dim its children (`.is-dimmed > *`).
- Body has no background on purpose: it would paint over the fixed `-z-10` backdrop.
- `prefers-reduced-transparency` swaps glass for solid panels; `prefers-reduced-motion` disables drift and lift animations.

## Scripts

```bash
npm install
npm run dev          # local dev
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run test:e2e     # Playwright browser tests (after a build; CHROME_PATH=... to use local Chrome)
npm run og           # re-render Open Graph images (needs Chrome)
npm run images -- <dir>   # rebuild background sizes from source images named <scene>.png
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, build, and the Playwright tests on every pull request.

Printing the page (Cmd/Ctrl+P) produces a clean two-page resume generated from `config/resume.ts`.
