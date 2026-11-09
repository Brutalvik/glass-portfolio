"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Glass } from "@/components/glass";
import { Reveal, SectionHeading } from "@/components/reveal";
import { experience, Role } from "@/config/resume";

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);

  return (
    <Glass interactive className="rounded-[28px] p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{role.company}</h3>
          <p className="text-[15px] text-white/80">{role.title}</p>
        </div>
        <div className="text-[13px] text-white/60 md:text-right">
          <div className="font-medium text-white/80">{role.period}</div>
          {role.location && <div>{role.location}</div>}
        </div>
      </div>

      <p className="mt-4 text-[15px] text-white/70">{role.summary}</p>

      <ul className="mt-4 space-y-2.5">
        {role.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
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
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            {role.more.map((h, i) => (
              <li key={h} className={`flex gap-3 text-[15px] leading-relaxed text-white/75 ${i === 0 ? "pt-2.5" : ""}`}>
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                {h}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {role.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
        {role.more && (
          <button
            aria-expanded={open}
            className="ml-auto rounded-full px-3 py-1.5 text-[13px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
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
        <div className="absolute bottom-4 left-[11px] top-4 hidden w-px bg-gradient-to-b from-white/50 via-white/20 to-transparent md:block" />
        <div className="space-y-5">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={Math.min(i * 0.04, 0.2)}>
              <div className="md:pl-12">
                <span className="absolute left-[5px] mt-9 hidden h-[13px] w-[13px] rounded-full border border-white/70 bg-white/30 shadow-[0_0_14px_rgba(255,255,255,0.6)] md:block" />
                <RoleCard role={role} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
