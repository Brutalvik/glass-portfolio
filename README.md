# Vikram Kumar - Portfolio

Single-page portfolio with an Apple-style liquid glass UI over a time-of-day landscape.

## Stack

- Next.js 15 (App Router), React 18, TypeScript
- Tailwind CSS 4, Framer Motion
- Self-hosted Inter (`@fontsource-variable/inter`), SF Pro on Apple devices

## Structure

```
app/
  layout.tsx            Background, navbar, metadata
  page.tsx              Section composition
components/
  glass.tsx             <Glass> surface with pointer-following highlight
  time-background.tsx   Hour-based background with crossfade
  navbar.tsx            Floating glass nav with active-section pill
  reveal.tsx            Scroll reveal + section heading
  sections/             hero, about, skills, experience, education-contact
config/
  resume.ts             All content: profile, skill groups, roles, education
  background-map.ts     Hour -> background mapping
  site.ts               Site name and nav
public/
  bg/                   2560px WebP backgrounds + LQIP placeholders
  Vikram_Kumar_Resume.pdf
styles/globals.css      Glass tokens and utilities (.glass, .chip, .text-gradient)
```

## Editing content

Everything shown on the page lives in `config/resume.ts`. Add a skill to a group's `skills` array, or a role to `experience`, and the page updates.

## Glass notes

- `.glass` uses `backdrop-filter: blur() saturate()` plus a masked gradient rim and inset highlights.
- Do not put a CSS `filter`, `opacity < 1` animation wrapper with `filter`, or another `backdrop-filter` on an ancestor of a `.glass` element; it stops the blur from sampling the page.
- Body has no background on purpose: it would paint over the fixed `-z-10` backdrop.

## Scripts

```bash
npm install
npm run dev
npm run build && npm start
```
