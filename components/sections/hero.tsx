import { Glass } from "@/components/glass";
import { Reveal } from "@/components/reveal";
import { profile } from "@/config/resume";

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
  return (
    <section
      className="flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-32 text-center"
      id="top"
    >
      <Reveal>
        <Glass className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] text-white/85">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to new roles - {profile.location}
        </Glass>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="text-gradient text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="text-shadow-soft mt-4 text-xl font-medium text-white/85 sm:text-2xl">
          {profile.title}
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="text-shadow-soft mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          {profile.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.32}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black shadow-[0_10px_30px_-10px_rgba(255,255,255,0.6)] transition hover:bg-white/85"
            href="#experience"
          >
            View my work
          </a>
          <Glass
            interactive
            as="a"
            className="rounded-full px-6 py-3 text-[15px] font-medium text-white"
            href={`mailto:${profile.email}`}
          >
            Get in touch
          </Glass>
        </div>
      </Reveal>

      <Reveal className="w-full" delay={0.4}>
        <Glass className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px rounded-[28px] md:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="px-6 py-6">
              <div className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[13px] text-white/60">{s.label}</div>
            </div>
          ))}
        </Glass>
      </Reveal>

      <Reveal delay={0.48}>
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
