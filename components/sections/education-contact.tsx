import { ContactForm } from "@/components/contact-form";
import { Glass } from "@/components/glass";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
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
              <h3 className="mt-3 text-xl font-semibold text-ink">
                {e.credential}
              </h3>
              <p className="mt-1 text-[15px] text-ink/75">
                {e.school} - {e.location}
              </p>
            </Glass>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const links = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: profile.github, Icon: GithubIcon },
];

export function Contact() {
  return (
    <section className="py-24" id="contact">
      <Reveal>
        <Glass
          strong
          className="mx-auto grid max-w-5xl gap-10 rounded-[40px] p-8 md:grid-cols-2 md:p-12"
        >
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="text-gradient mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Let&apos;s build something.
            </h2>
            <p className="mt-5 text-lg text-ink/75">
              Full-time, contract, or a conversation about a hard problem.
              I&apos;m in {profile.location} and work remote or on-site.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                className="inline-flex w-fit items-center rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-paper transition hover:opacity-85"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-2">
                {links.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    className="chip px-4 py-2 hover:bg-ink/15"
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon size={16} /> {label}
                  </a>
                ))}
                <a
                  className="chip px-4 py-2 hover:bg-ink/15"
                  href={profile.resume}
                  rel="noreferrer"
                  target="_blank"
                >
                  Resume (PDF)
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
        </Glass>
      </Reveal>
      <div className="mt-12 flex justify-center">
        <Glass className="rounded-full px-5 py-2 text-center text-[13px] text-ink/70">
          (c) {new Date().getFullYear()} {profile.name}. The background follows
          your local time of day.
        </Glass>
      </div>
    </section>
  );
}
