"use client";

import type { ReactNode } from "react";

import { MotionConfig } from "framer-motion";

import { BookingProvider } from "@/components/booking";
import { SceneProvider } from "@/components/scene-provider";
import { SkillFocusProvider } from "@/components/skill-focus";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SceneProvider>
        <SkillFocusProvider>
          <BookingProvider>{children}</BookingProvider>
        </SkillFocusProvider>
      </SceneProvider>
    </MotionConfig>
  );
}
