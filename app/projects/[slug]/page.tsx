import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Glass } from "@/components/glass";
import { Reveal } from "@/components/reveal";
import { caseStudies, caseStudyBySlug, CaseStudy } from "@/config/case-studies";
import { siteConfig } from "@/config/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);

  if (!cs) return {};
  const title = `${cs.name} - Case study`;
  const image = `/og/${cs.slug}.jpg`;

  return {
    title,
    description: cs.tagline,
    alternates: { canonical: `/projects/${cs.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${cs.slug}`,
      siteName: siteConfig.name,
      title,
      description: cs.tagline,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cs.tagline,
      images: [image],
    },
  };
}

const Arrow = ({ back = false }: { back?: boolean }) => (
  <svg
    aria-hidden
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth="1.8"
    style={back ? { transform: "rotate(180deg)" } : undefined}
    viewBox="0 0 24 24"
    width="14"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <Reveal className="scrim mb-6 max-w-2xl">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 className="text-gradient text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function Flow({ flow }: { flow: NonNullable<CaseStudy["flow"]> }) {
  return (
    <Glass className="rounded-[28px] p-6 md:p-8">
      <p className="text-[15px] font-semibold text-ink">{flow.title}</p>
      <ol className="mt-6 grid gap-3 md:grid-flow-col md:auto-cols-fr">
        {flow.nodes.map((n, i) => (
          <li key={n.title} className="relative flex md:flex-col">
            <div className="flex-1 rounded-2xl border border-ink/10 bg-ink/5 p-4">
              <span className="text-[11px] font-semibold tabular-nums text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-[15px] font-semibold text-ink">
                {n.title}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-ink/70">
                {n.detail}
              </p>
            </div>
            {i < flow.nodes.length - 1 && (
              <span
                aria-hidden
                className="hidden text-ink/40 md:absolute md:-right-2.5 md:top-1/2 md:block md:-translate-y-1/2"
              >
                <Arrow />
              </span>
            )}
          </li>
        ))}
      </ol>
      {flow.note && <p className="mt-5 text-[12px] text-ink/55">{flow.note}</p>}
    </Glass>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = caseStudyBySlug(slug);

  if (!cs) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="pb-24 pt-32">
      <Reveal>
        <Link
          className="chip w-fit px-4 py-1.5 hover:bg-ink/15"
          href="/#projects"
        >
          <Arrow back /> All projects
        </Link>
      </Reveal>

      <header className="mt-8">
        <Reveal className="scrim max-w-3xl">
          <p className="eyebrow">{cs.eyebrow}</p>
          <h1 className="text-gradient mt-3 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {cs.name}
          </h1>
          <p className="text-glow mt-5 text-xl text-ink/85 md:text-2xl">
            {cs.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Glass className="mt-10 grid gap-6 rounded-[28px] p-6 md:grid-cols-[1.4fr_1fr_1fr] md:p-8">
            <p className="text-[16px] leading-relaxed text-ink/85 md:col-span-3">
              {cs.summary}
            </p>
            <div>
              <p className="eyebrow">Role</p>
              <p className="mt-1.5 text-[15px] text-ink">{cs.role}</p>
            </div>
            <div>
              <p className="eyebrow">Timeline</p>
              <p className="mt-1.5 text-[15px] text-ink">{cs.timeline}</p>
            </div>
            <div>
              <p className="eyebrow">Team</p>
              <p className="mt-1.5 text-[15px] text-ink">{cs.team}</p>
            </div>
            <div className="md:col-span-3">
              <p className="eyebrow">Stack</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {(cs.links?.length || cs.confidentiality) && (
              <div className="flex flex-wrap items-center gap-3 md:col-span-3">
                {cs.links?.map((l) => (
                  <a
                    key={l.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition hover:opacity-85"
                    href={l.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {l.label} <Arrow />
                  </a>
                ))}
                {cs.confidentiality && (
                  <span className="text-[13px] text-ink/60">
                    {cs.confidentiality}
                  </span>
                )}
              </div>
            )}
          </Glass>
        </Reveal>
      </header>

      {cs.shots?.[0] && (
        <Reveal className="mt-10">
          <figure>
            <Glass className="overflow-hidden rounded-[28px] p-2">
              <Image
                priority
                alt={cs.shots[0].alt}
                className="h-auto w-full rounded-[22px]"
                height={cs.shots[0].height}
                sizes="(min-width: 1152px) 1120px, 100vw"
                src={cs.shots[0].src}
                width={cs.shots[0].width}
              />
            </Glass>
            <figcaption className="text-glow mt-3 text-center text-[13px] text-ink/70">
              {cs.shots[0].caption}
            </figcaption>
          </figure>
        </Reveal>
      )}

      <Section eyebrow="01" title="The problem">
        <Glass className="rounded-[28px] p-6 md:p-8">
          <div className="max-w-3xl space-y-4 text-[17px] leading-relaxed text-ink/85">
            {cs.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Glass>
      </Section>

      <Section eyebrow="02" title="My role">
        <Glass className="rounded-[28px] p-6 md:p-8">
          <ul className="max-w-3xl space-y-3">
            {cs.myRole.map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[16px] leading-relaxed text-ink/85"
              >
                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
                {r}
              </li>
            ))}
          </ul>
        </Glass>
      </Section>

      <Section eyebrow="03" title="Design">
        <div className="grid gap-5 md:grid-cols-3">
          {cs.design.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.06}>
              <Glass interactive className="h-full rounded-[28px] p-6">
                <h3 className="text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {d.body}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>
        {cs.shots && cs.shots.length > 1 && (
          <div className="mt-6 grid gap-6">
            {cs.shots.slice(1).map((s) => (
              <Reveal key={s.src}>
                <figure>
                  <Glass className="overflow-hidden rounded-[28px] p-2">
                    <Image
                      alt={s.alt}
                      className="h-auto w-full rounded-[22px]"
                      height={s.height}
                      sizes="(min-width: 1152px) 1120px, 100vw"
                      src={s.src}
                      width={s.width}
                    />
                  </Glass>
                  <figcaption className="text-glow mt-3 text-center text-[13px] text-ink/70">
                    {s.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <Section eyebrow="04" title="Engineering">
        {cs.flow && (
          <Reveal className="mb-5">
            <Flow flow={cs.flow} />
          </Reveal>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          {cs.engineering.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <Glass interactive className="h-full rounded-[28px] p-6">
                <h3 className="text-lg font-semibold text-ink">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                  {e.body}
                </p>
              </Glass>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="05" title="Results">
        <Glass className="grid rounded-[28px] md:grid-cols-3">
          {cs.results.map((r) => (
            <div key={r.label} className="px-6 py-7">
              <div className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {r.value}
              </div>
              <div className="mt-1 text-[14px] text-ink/65">{r.label}</div>
            </div>
          ))}
        </Glass>
        <Glass className="mt-5 rounded-[28px] p-6 md:p-8">
          <ul className="max-w-3xl space-y-3">
            {cs.resultNotes.map((r) => (
              <li
                key={r}
                className="flex gap-3 text-[16px] leading-relaxed text-ink/85"
              >
                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {r}
              </li>
            ))}
          </ul>
        </Glass>
      </Section>

      <nav
        aria-label="More case studies"
        className="mt-20 grid gap-5 md:grid-cols-2"
      >
        <Glass
          interactive
          as={Link}
          className="rounded-[28px] p-6"
          href="/#contact"
        >
          <p className="eyebrow">Work with me</p>
          <p className="mt-2 text-xl font-semibold text-ink">Get in touch</p>
        </Glass>
        <Glass
          interactive
          as={Link}
          className="rounded-[28px] p-6 md:text-right"
          href={`/projects/${next.slug}`}
        >
          <p className="eyebrow">Next case study</p>
          <p className="mt-2 text-xl font-semibold text-ink">{next.name}</p>
        </Glass>
      </nav>
    </article>
  );
}
