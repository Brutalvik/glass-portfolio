"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Glass } from "@/components/glass";
import { Reveal, SectionHeading } from "@/components/reveal";
import { skillGroups } from "@/config/resume";

const icons: Record<string, JSX.Element> = {
  uiux: <path d="M4 5h16v10H4zM8 19h8M12 15v4M7 9h4M7 12h7" />,
  frontend: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  mobile: <path d="M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2" />,
  backend: <path d="M4 6h16v5H4zM4 13h16v5H4zM7.5 8.5h.01M7.5 15.5h.01" />,
  data: <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />,
  cloud: <path d="M7 18h10a4 4 0 00.6-7.96A6 6 0 006.2 9.1 4.5 4.5 0 007 18z" />,
  security: <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3zM9 12l2 2 4-4" />,
  quality: <path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6" />,
  ai: <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />,
};

const filters = [{ id: "all", title: "All" }, ...skillGroups.map((g) => ({ id: g.id, title: g.title }))];

export function Skills() {
  const [filter, setFilter] = useState("all");
  const groups = filter === "all" ? skillGroups : skillGroups.filter((g) => g.id === filter);
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section className="py-24" id="skills">
      <SectionHeading
        eyebrow="Skills"
        sub={`${total} tools and practices across design, frontend, mobile, backend, data, cloud, security, testing, and AI.`}
        title="The whole stack, in one place."
      />

      <Reveal>
        <Glass
          strong
          className="mb-8 flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]"
          role="tablist"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              aria-selected={filter === f.id}
              className={clsx(
                "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                filter === f.id ? "text-black" : "text-white/75 hover:text-white",
              )}
              role="tab"
              onClick={() => setFilter(f.id)}
            >
              {filter === f.id && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.4)]"
                  layoutId="skill-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{f.title}</span>
            </button>
          ))}
        </Glass>
      </Reveal>

      <motion.div layout className="grid grid-flow-row-dense gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                    <svg fill="none" height="22" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="22">
                      {icons[g.id]}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-white/65">{g.blurb}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
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
