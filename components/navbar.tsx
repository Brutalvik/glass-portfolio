"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Glass } from "@/components/glass";
import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/config/resume";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = siteConfig.navItems
      .map((i) => document.getElementById(i.href.slice(1)))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <Glass
        strong
        aria-label="Main"
        as="nav"
        className="flex w-full max-w-4xl items-center justify-between gap-2 rounded-full py-2 pl-5 pr-2"
      >
        <a
          className="text-[15px] font-semibold tracking-tight text-ink"
          href="#top"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = active === item.href.slice(1);

            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-ink/15"
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={clsx(
                    "relative block rounded-full px-3 py-1.5 text-[13px] transition-colors",
                    isActive ? "text-ink" : "text-ink/70 hover:text-ink",
                  )}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <a
            aria-label="LinkedIn"
            className="hidden rounded-full p-2 text-ink/80 transition hover:bg-ink/10 hover:text-ink sm:block"
            href={profile.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            aria-label="GitHub"
            className="hidden rounded-full p-2 text-ink/80 transition hover:bg-ink/10 hover:text-ink sm:block"
            href={profile.github}
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon size={18} />
          </a>
          <a
            className="hidden rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-paper transition hover:opacity-85 sm:block"
            href={profile.resume}
            rel="noreferrer"
            target="_blank"
          >
            Resume
          </a>
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-ink md:hidden"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              width="20"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </Glass>

      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute inset-x-4 top-16 md:hidden"
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            <Glass strong className="rounded-3xl p-2">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  className="block rounded-2xl px-4 py-3 text-ink/90 hover:bg-ink/10"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-1 grid grid-cols-2 gap-2">
                <a
                  className="rounded-2xl bg-ink/10 px-4 py-3 text-center font-medium text-ink"
                  href={profile.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="rounded-2xl bg-ink px-4 py-3 text-center font-medium text-paper"
                  href={profile.resume}
                  rel="noreferrer"
                  target="_blank"
                >
                  Resume
                </a>
              </div>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
