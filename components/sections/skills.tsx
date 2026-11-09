"use client";

import type { KeyboardEvent } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import { Glass } from "@/components/glass";
import { Reveal, SectionHeading } from "@/components/reveal";
import { useSkillFocus } from "@/components/skill-focus";
import { experience, projects, skillGroups } from "@/config/resume";
import { skillUsage, usageCount } from "@/lib/skill-index";

const icons: Record<string, JSX.Element> = {
  uiux: <path d="M4 5h16v10H4zM8 19h8M12 15v4M7 9h4M7 12h7" />,
  frontend: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  mobile: (
    <path d="M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2" />
  ),
  backend: <path d="M4 6h16v5H4zM4 13h16v5H4zM7.5 8.5h.01M7.5 15.5h.01" />,
  data: (
    <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  ),
  cloud: (
    <path d="M7 18h10a4 4 0 00.6-7.96A6 6 0 006.2 9.1 4.5 4.5 0 007 18z" />
  ),
  security: (
    <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3zM9 12l2 2 4-4" />
  ),
  quality: <path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6" />,
  ai: (
    <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />
  ),
};

/** "Mercor 2026" when a company has several roles, otherwise just the company */
const roleLabel = (r: (typeof experience)[number]) =>
  experience.filter((e) => e.company === r.company).length > 1
    ? `${r.company} ${r.period.split(" - ")[0].split(" ").pop()}`
    : r.company;

const filters = [
  { id: "all", title: "All" },
  ...skillGroups.map((g) => ({ id: g.id, title: g.title })),
];

/** Clickable skill chip; skills with no recorded usage render as plain chips */
export function SkillChip({ skill }: { skill: string }) {
  const { skill: active, setSkill } = useSkillFocus();
  const count = usageCount(skill);

  if (!count) return <span className="chip">{skill}</span>;

  const pressed = active === skill;

  return (
    <button
      aria-pressed={pressed}
      className="chip"
      title={pressed ? "Clear filter" : `Show where I used ${skill}`}
      type="button"
      onClick={() => setSkill(pressed ? null : skill)}
    >
      {skill}
      <span
        className={clsx(
          "text-[11px] tabular-nums",
          pressed ? "text-paper/60" : "text-ink/45",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function UsagePanel() {
  const { skill, setSkill } = useSkillFocus();
  const usage = skill ? skillUsage[skill] : null;

  return (
    <AnimatePresence>
      {skill && usage && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-20 z-30 mb-6"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          <Glass
            strong
            aria-live="polite"
            className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-3xl px-5 py-4"
          >
            <p className="text-[15px] text-ink">
              <span className="font-semibold">{skill}</span>
              <span className="text-ink/65"> - used in</span>
            </p>
            <ul className="flex flex-1 flex-wrap gap-2">
              {usage.roles.map((id) => {
                const r = experience.find((e) => e.id === id)!;

                return (
                  <li key={id}>
                    <a className="chip hover:bg-ink/15" href={`#role-${id}`}>
                      {roleLabel(r)}
                    </a>
                  </li>
                );
              })}
              {usage.projects.map((id) => {
                const p = projects.find((e) => e.id === id)!;

                return (
                  <li key={id}>
                    <a className="chip hover:bg-ink/15" href={`#project-${id}`}>
                      {p.name}
                      <span className="text-[11px] text-ink/50">project</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              className="rounded-full bg-ink/10 px-3 py-1.5 text-[13px] font-medium text-ink transition hover:bg-ink/20"
              type="button"
              onClick={() => setSkill(null)}
            >
              Clear
            </button>
          </Glass>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Skills() {
  const [filter, setFilter] = useState("all");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const groups =
    filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter);
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = filters.length - 1;
    let next = -1;

    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next < 0) return;
    e.preventDefault();
    setFilter(filters[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section className="py-24" id="skills">
      <SectionHeading
        eyebrow="Skills"
        sub={`${total} tools and practices. Tap a skill with a number to see where I used it.`}
        title="The whole stack, in one place."
      />

      <Reveal>
        <Glass
          strong
          aria-label="Skill categories"
          className="mb-6 flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]"
          role="tablist"
        >
          {filters.map((f, i) => {
            const selected = filter === f.id;

            return (
              <button
                key={f.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                aria-controls="skill-panel"
                aria-selected={selected}
                className={clsx(
                  "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                  selected ? "text-paper" : "text-ink/75 hover:text-ink",
                )}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
                onClick={() => setFilter(f.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {selected && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-ink shadow-[0_4px_14px_-4px_rgba(0,0,0,0.4)]"
                    layoutId="skill-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f.title}</span>
              </button>
            );
          })}
        </Glass>
      </Reveal>

      <UsagePanel />

      <motion.div
        layout
        className="grid grid-flow-row-dense gap-5 md:grid-cols-2 lg:grid-cols-3"
        id="skill-panel"
        role="tabpanel"
      >
        <AnimatePresence mode="popLayout">
          {groups.map((g) => (
            <motion.div
              key={g.id}
              layout
              animate={{ opacity: 1, scale: 1 }}
              className={clsx(
                filter === "all" && g.span === "wide" && "lg:col-span-2",
                filter === "all" && g.span === "tall" && "lg:row-span-2",
                filter !== "all" && "md:col-span-2 lg:col-span-3",
              )}
              exit={{ opacity: 0, scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              <Glass interactive className="h-full rounded-[28px] p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink/10 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                    <svg
                      aria-hidden
                      fill="none"
                      height="22"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      viewBox="0 0 24 24"
                      width="22"
                    >
                      {icons[g.id]}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink/70">
                      {g.blurb}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <SkillChip key={s} skill={s} />
                  ))}
                </div>
              </Glass>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
