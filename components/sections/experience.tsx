"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CompanyTile } from "@/components/company-mark";
import { Glass } from "@/components/glass";
import { Reveal, SectionHeading } from "@/components/reveal";
import { useSkillFocus } from "@/components/skill-focus";
import { SkillChip } from "@/components/sections/skills";
import { companyById, experience, Role } from "@/config/resume";

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const { stateFor } = useSkillFocus();
  const state = stateFor("role", role.id);
  const company = companyById(role.companyId)!;
  const moreId = `role-${role.id}-more`;

  return (
    <Glass
      interactive
      as="article"
      className={clsx(
        "rounded-[28px] p-6 md:p-8",
        state === "match" && "is-match",
        state === "dim" && "is-dimmed",
      )}
      id={`role-${role.id}`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <CompanyTile company={company} />
          <div>
            <h3 className="text-xl font-semibold text-ink">{role.company}</h3>
            <p className="text-[15px] text-ink/85">
              {role.title}
              {role.type && <span className="text-ink/55"> - {role.type}</span>}
            </p>
          </div>
        </div>
        <div className="text-[13px] text-ink/65 md:text-right">
          <div className="font-medium text-ink/85">{role.period}</div>
          {role.location && <div>{role.location}</div>}
        </div>
      </div>

      <p className="mt-4 text-[15px] text-ink/75">{role.summary}</p>

      <ul className="mt-4 space-y-2.5">
        {role.highlights.map((h) => (
          <li
            key={h}
            className="flex gap-3 text-[15px] leading-relaxed text-ink/85"
          >
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
            {h}
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {open && role.more && (
          <motion.ul
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-2.5 overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id={moreId}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {role.more.map((h, i) => (
              <li
                key={h}
                className={clsx(
                  "flex gap-3 text-[15px] leading-relaxed text-ink/80",
                  i === 0 && "pt-2.5",
                )}
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                {h}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {role.stack.map((s) => (
          <SkillChip key={s} skill={s} />
        ))}
        {role.more && (
          <button
            aria-controls={moreId}
            aria-expanded={open}
            className="ml-auto rounded-full px-3 py-1.5 text-[13px] font-medium text-ink/85 transition hover:bg-ink/10 hover:text-ink"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </Glass>
  );
}

export function Experience() {
  return (
    <section className="py-24" id="experience">
      <SectionHeading
        eyebrow="Experience"
        sub="Government, energy regulation, aviation, banking, maritime, and AI."
        title="Twelve years of shipping."
      />

      <div className="relative">
        <div className="absolute bottom-4 left-[11px] top-4 hidden w-px bg-gradient-to-b from-ink/50 via-ink/20 to-transparent md:block" />
        <ol className="space-y-5">
          {experience.map((role, i) => (
            <li key={role.id} className="relative md:pl-12">
              <span className="absolute left-[5px] top-10 hidden h-[13px] w-[13px] rounded-full border border-ink/70 bg-ink/30 shadow-[0_0_14px_rgba(255,255,255,0.6)] md:block" />
              <Reveal delay={Math.min(i * 0.04, 0.2)}>
                <RoleCard role={role} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
