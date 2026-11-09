"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Glass } from "@/components/glass";
import { useScene } from "@/components/scene-provider";
import { SCENES } from "@/config/background-map";

const SunMoon = ({ light }: { light: boolean }) => (
  <svg
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth="1.7"
    viewBox="0 0 24 24"
    width="18"
  >
    {light ? (
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 16a4 4 0 100-8 4 4 0 000 8z" />
    ) : (
      <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
    )}
  </svg>
);

/** Floating control to scrub through the 12 time-of-day scenes */
export function TimeControl() {
  const { index, scene, live, setIndex } = useScene();
  const [open, setOpen] = useState(false);

  if (index < 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <Glass strong className="w-72 rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Time of day</p>
                  <p className="mt-1 text-[15px] font-semibold text-ink">
                    {scene.label}
                  </p>
                </div>
                <button
                  aria-pressed={live}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition",
                    live
                      ? "bg-ink text-paper"
                      : "bg-ink/10 text-ink hover:bg-ink/15",
                  )}
                  onClick={() => setIndex(null)}
                >
                  <span
                    className={clsx(
                      "h-1.5 w-1.5 rounded-full",
                      live ? "bg-emerald-400" : "bg-ink/40",
                    )}
                  />
                  Live
                </button>
              </div>
              <label className="mt-4 block">
                <span className="sr-only">Scene</span>
                <input
                  aria-valuetext={scene.label}
                  className="scene-range"
                  max={SCENES.length - 1}
                  min={0}
                  step={1}
                  type="range"
                  value={index}
                  onChange={(e) => setIndex(Number(e.target.value))}
                />
              </label>
              <div className="mt-2 flex justify-between text-[11px] text-ink/55">
                <span>Midnight</span>
                <span>Noon</span>
                <span>Dusk</span>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-ink/60">
                The background follows your local time. Drag to preview the
                other scenes.
              </p>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>

      <Glass
        interactive
        strong
        aria-expanded={open}
        aria-label={`Time of day: ${scene.label}. Change scene`}
        as="button"
        className="flex h-11 items-center gap-2 rounded-full px-4 text-[13px] font-medium text-ink"
        onClick={() => setOpen((v) => !v)}
      >
        <SunMoon light={scene.theme === "light"} />
        <span className="hidden sm:inline">{scene.label}</span>
      </Glass>
    </div>
  );
}
