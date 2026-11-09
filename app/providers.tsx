"use client";

import type { ReactNode } from "react";

import { MotionConfig } from "framer-motion";

import { SceneProvider } from "@/components/scene-provider";
import { SkillFocusProvider } from "@/components/skill-focus";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SceneProvider>
        <SkillFocusProvider>{children}</SkillFocusProvider>
      </SceneProvider>
    </MotionConfig>
  );
}
