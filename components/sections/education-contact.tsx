import { Glass } from "@/components/glass";
import { GithubIcon } from "@/components/icons";
import { Reveal, SectionHeading } from "@/components/reveal";
import { education, profile } from "@/config/resume";

export function Education() {
  return (
    <section className="py-24" id="education">
      <SectionHeading eyebrow="Education" title="Foundations." />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08}>
            <Glass interactive className="h-full rounded-[28px] p-7">
              <p className="eyebrow">{e.period}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{e.credential}</h3>
              <p className="mt-1 text-[15px] text-white/70">
                {e.school} - {e.location}
              </p>
            </Glass>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="py-24" id="contact">
      <Reveal>
        <Glass strong className="mx-auto max-w-4xl rounded-[40px] px-8 py-14 text-center md:px-16 md:py-20">
          <p className="eyebrow">Contact</p>
          <h2 className="text-gradient mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Full-time, contract, or a conversation about a hard problem. I&apos;m in {profile.location}
            {" "}and work remote or on-site.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              className="rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black transition hover:bg-white/85"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <Glass
              interactive
              as="a"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-white"
              href={profile.github}
              rel="noreferrer"
              target="_blank"
            >
              <GithubIcon size={18} /> GitHub
            </Glass>
            <Glass
              interactive
              as="a"
              className="rounded-full px-6 py-3 text-[15px] font-medium text-white"
              href={profile.resume}
              rel="noreferrer"
              target="_blank"
            >
              Resume (PDF)
            </Glass>
          </div>
        </Glass>
      </Reveal>
      <p className="mt-12 text-center text-[13px] text-white/50">
        (c) {new Date().getFullYear()} {profile.name}. Background changes with the time of day.
      </p>
    </section>
  );
}
