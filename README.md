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

## Editing content

Everything on the page comes from `config/resume.ts`.

- **Skills to experience links**: clicking a skill highlights the roles and projects that mention it. Matching uses the skill name; for descriptive skills, add search terms in `lib/skill-index.ts`. A role's `keywords` array adds resume terms used for matching without displaying them.
- **Company logos**: drop official logo files (SVG preferred) into `public/logos/` and set `logo: "/logos/ibm.svg"` on the company. Logos are rendered monochrome and adapt to light and dark glass. Without a logo, a neutral wordmark is shown.

## Environment

Copy `.env.example` to `.env.local` for local overrides.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, Open Graph, and email links. Falls back to the Vercel production URL. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | SMTP server. Gmail: `smtp.gmail.com`, `465`, `true`. |
| `SMTP_USER`, `SMTP_PASS` | SMTP login. For Gmail use an App Password, not your normal password. |
| `MAIL_FROM` | Sender shown on both emails, e.g. `Vikram Kumar <you@gmail.com>`. |
| `CONTACT_TO` | Where new-message notifications go. Defaults to the profile email. |

### Contact form flow

1. Visitor submits the form; `POST /api/contact` validates it (zod), checks a honeypot, and rate-limits per IP.
2. A notification is emailed to `CONTACT_TO` with the visitor as Reply-To.
3. Only if that succeeds, the visitor gets a branded confirmation email with a copy of their message and a signature.

Without SMTP variables the API returns 503 and the form tells the visitor to email directly.

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
npm run images -- <dir>   # rebuild background sizes from source images named <scene>.png
```

CI (`.github/workflows/ci.yml`) runs lint, typecheck, and build on every pull request.
