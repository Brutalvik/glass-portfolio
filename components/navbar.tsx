"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Glass } from "@/components/glass";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/config/resume";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = siteConfig.navItems.map((i) => i.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
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

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <Glass
        strong
        as="nav"
        className="flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-5 pr-2"
      >
        <a
          className="text-[15px] font-semibold tracking-tight text-white"
          href="#top"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {siteConfig.navItems.map((item) => {
            const isActive = active === item.href.slice(1);

            return (
              <li key={item.href} className="relative">
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  className={clsx(
                    "relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                    isActive ? "text-white" : "text-white/70 hover:text-white",
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
            aria-label="GitHub"
            className="hidden rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white sm:block"
            href={profile.github}
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon size={18} />
          </a>
          <a
            className="hidden rounded-full bg-white px-4 py-1.5 text-[13px] font-medium text-black transition hover:bg-white/85 sm:block"
            href={profile.resume}
            rel="noreferrer"
            target="_blank"
          >
            Resume
          </a>
          <button
            aria-expanded={open}
            aria-label="Menu"
            className="rounded-full p-2 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24" width="20">
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
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            <Glass strong className="rounded-3xl p-2">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  className="block rounded-2xl px-4 py-3 text-white/90 hover:bg-white/10"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="mt-1 block rounded-2xl bg-white px-4 py-3 text-center font-medium text-black"
                href={profile.resume}
                rel="noreferrer"
                target="_blank"
              >
                Download Resume
              </a>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
