import { CompanyMark } from "@/components/company-mark";
import { Glass } from "@/components/glass";
import { Reveal } from "@/components/reveal";
import { companies, profile } from "@/config/resume";

const focus = [
  "UI / UX",
  "React",
  "React Native",
  "Angular",
  "Node.js",
  "NestJS",
  "Spring Boot",
  "SQL and NoSQL",
  "Azure",
  "AWS",
];

export function Hero() {
  const featured = companies.filter((c) => c.featured);

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[100svh] flex-col items-center justify-center pb-12 pt-32 text-center"
      id="top"
    >
      <Reveal>
        <Glass className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] text-ink/85">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to new roles - {profile.location}
        </Glass>
      </Reveal>

      <div className="scrim">
        <Reveal delay={0.08}>
          <h1 className="text-gradient text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-glow mt-4 text-xl font-medium text-ink/90 sm:text-2xl">
            {profile.title}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <Glass className="mx-auto mt-7 max-w-2xl rounded-3xl px-6 py-4">
            <p className="text-base leading-relaxed text-ink/90 sm:text-lg">
              {profile.tagline}
            </p>
          </Glass>
        </Reveal>
      </div>

      <Reveal delay={0.32}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-paper shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition hover:opacity-85"
            href="#projects"
          >
            View my work
          </a>
          <Glass
            interactive
            as="a"
            className="rounded-full px-6 py-3 text-[15px] font-medium text-ink"
            href="#contact"
          >
            Get in touch
          </Glass>
        </div>
      </Reveal>

      <Reveal className="w-full" delay={0.4}>
        <Glass className="mx-auto mt-14 grid max-w-4xl grid-cols-2 rounded-[28px] md:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="px-5 py-6">
              <div className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[13px] leading-snug text-ink/65">
                {s.label}
              </div>
            </div>
          ))}
        </Glass>
      </Reveal>

      <Reveal className="w-full" delay={0.48}>
        <Glass className="mx-auto mt-5 flex max-w-5xl flex-col items-center gap-6 rounded-[28px] px-6 py-6 md:flex-row md:gap-8 md:px-8">
          <p className="eyebrow shrink-0 text-center leading-relaxed md:text-left">
            A few places
            <br className="hidden md:block" /> I&apos;ve made an impact
          </p>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-5 md:justify-between">
            {featured.map((c) => (
              <li key={c.id}>
                <CompanyMark company={c} />
              </li>
            ))}
          </ul>
        </Glass>
      </Reveal>

      <Reveal delay={0.56}>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {focus.map((f) => (
            <span key={f} className="chip">
              {f}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
