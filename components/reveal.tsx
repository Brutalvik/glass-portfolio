"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  // No CSS filter here: a filtered ancestor stops child backdrop-filter from seeing the page
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, delay, ease: [0.32, 0.72, 0, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="scrim mb-10 max-w-2xl">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-gradient text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {sub && <p className="text-glow mt-4 text-lg text-ink/80">{sub}</p>}
    </Reveal>
  );
}
