"use client";

import type { ReactNode } from "react";

import { createContext, useContext, useMemo, useState } from "react";

import { skillUsage } from "@/lib/skill-index";

type SkillFocusValue = {
  skill: string | null;
  setSkill: (skill: string | null) => void;
  /** "match" | "dim" | undefined for a role or project card */
  stateFor: (
    kind: "role" | "project",
    id: string,
  ) => "match" | "dim" | undefined;
};

const SkillFocusContext = createContext<SkillFocusValue | null>(null);

export function SkillFocusProvider({ children }: { children: ReactNode }) {
  const [skill, setSkill] = useState<string | null>(null);

  const value = useMemo<SkillFocusValue>(() => {
    const usage = skill ? skillUsage[skill] : null;

    return {
      skill,
      setSkill,
      stateFor: (kind, id) => {
        if (!usage) return undefined;
        const list = kind === "role" ? usage.roles : usage.projects;

        return list.includes(id) ? "match" : "dim";
      },
    };
  }, [skill]);

  return (
    <SkillFocusContext.Provider value={value}>
      {children}
    </SkillFocusContext.Provider>
  );
}

export function useSkillFocus() {
  const ctx = useContext(SkillFocusContext);

  if (!ctx)
    throw new Error("useSkillFocus must be used inside SkillFocusProvider");

  return ctx;
}
