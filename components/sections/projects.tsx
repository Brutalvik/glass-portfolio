"use client";

import clsx from "clsx";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Glass } from "@/components/glass";
import { Reveal, SectionHeading } from "@/components/reveal";
import { useSkillFocus } from "@/components/skill-focus";
import { SkillChip } from "@/components/sections/skills";
import { Project, projects } from "@/config/resume";

const kinds = ["All", "Web", "Mobile", "AI", "Enterprise"] as const;

const Arrow = () => (
  <svg
    aria-hidden
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    width="14"
  >
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

function ProjectCard({ project }: { project: Project }) {
  const { stateFor } = useSkillFocus();
  const state = stateFor("project", project.id);

  return (
    <Glass
      interactive
      as="article"
      className={clsx(
        "flex h-full flex-col rounded-[28px] p-6 md:p-7",
        state === "match" && "is-match",
        state === "dim" && "is-dimmed",
      )}
      id={`project-${project.id}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{project.kind}</span>
        <span className="rounded-full bg-ink/10 px-2.5 py-1 text-[11px] font-medium text-ink/75">
          {project.status}
        </span>
      </div>
      <h3
        className={clsx(
          "mt-3 font-semibold tracking-tight text-ink",
          project.featured ? "text-2xl" : "text-xl",
        )}
      >
        {project.name}
      </h3>
      <p className="mt-1 text-[15px] text-ink/85">{project.tagline}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-ink/70">
        {project.summary}
      </p>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((h) => (
          <li
            key={h}
            className="flex gap-3 text-[14px] leading-relaxed text-ink/85"
          >
            <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/55" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <SkillChip key={s} skill={s} />
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        {project.caseStudy && (
          <Link
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper transition hover:opacity-85"
            href={`/projects/${project.caseStudy}`}
          >
            Read case study
            <Arrow />
          </Link>
        )}
        {project.links?.map((l) => (
          <a
            key={l.href}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition",
              project.caseStudy
                ? "bg-ink/10 text-ink hover:bg-ink/15"
                : "bg-ink text-paper hover:opacity-85",
            )}
            href={l.href}
            rel="noreferrer"
            target="_blank"
          >
            {l.label}
            <Arrow />
          </a>
        ))}
        {project.note && (
          <span className="text-[12px] text-ink/55">{project.note}</span>
        )}
      </div>
    </Glass>
  );
}

export function Projects() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const list =
    kind === "All" ? projects : projects.filter((p) => p.kind === kind);

  return (
    <section className="py-24" id="projects">
      <SectionHeading
        eyebrow="Projects"
        sub="Products I have built for my own businesses, for clients, and in production at work."
        title="Things I have built."
      />

      <Reveal>
        <div
          aria-label="Filter projects"
          className="mb-6 flex flex-wrap gap-2"
          role="group"
        >
          {kinds.map((k) => (
            <button
              key={k}
              aria-pressed={kind === k}
              className="chip px-4 py-1.5"
              type="button"
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.id}
              layout
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
