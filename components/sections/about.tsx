import { Glass } from "@/components/glass";
import { Reveal, SectionHeading } from "@/components/reveal";
import { profile } from "@/config/resume";

const pillars = [
  {
    title: "Design-minded frontend",
    body: "Reusable components, responsive layouts, and data-heavy screens that stay fast and forgiving.",
  },
  {
    title: "Solid backends and data",
    body: "Typed APIs, clear contracts, tuned SQL, and NoSQL where it fits the access pattern.",
  },
  {
    title: "Production on the cloud",
    body: "Containers, pipelines, secrets, and monitoring on Azure and AWS, so releases are boring.",
  },
];

export function About() {
  return (
    <section className="py-24" id="about">
      <SectionHeading eyebrow="About" title="Full stack, end to end." />

      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Glass className="h-full rounded-[32px] p-8 md:p-10">
            <div className="space-y-5 text-[17px] leading-relaxed text-ink/85">
              {profile.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <p className="eyebrow mb-3">Worked with</p>
              <ul className="flex flex-wrap gap-2">
                {profile.clients.map((c) => (
                  <li key={c} className="chip">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Glass>
        </Reveal>

        <div className="grid gap-5 lg:col-span-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * (i + 1)}>
              <Glass interactive className="h-full rounded-[28px] p-6">
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {p.body}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
