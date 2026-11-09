"use client";

import type { ReactNode } from "react";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { SCENES, Scene, sceneIndexForHour } from "@/config/background-map";

type SceneContextValue = {
  index: number;
  scene: Scene;
  live: boolean;
  /** Pick a scene manually; pass null to go back to following the clock */
  setIndex: (index: number | null) => void;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [clockIndex, setClockIndex] = useState<number | null>(null);
  const [manualIndex, setManualIndex] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setClockIndex(sceneIndexForHour(new Date().getHours()));

    tick();
    const t = window.setInterval(tick, 60_000);

    return () => window.clearInterval(t);
  }, []);

  const index = manualIndex ?? clockIndex ?? -1;
  const scene = SCENES[index] ?? SCENES[0];

  useEffect(() => {
    if (index < 0) return;
    const root = document.documentElement;

    root.dataset.theme = scene.theme;
    root.dataset.scene = scene.key;
  }, [index, scene]);

  const value = useMemo<SceneContextValue>(
    () => ({
      index,
      scene,
      live: manualIndex === null,
      setIndex: setManualIndex,
    }),
    [index, scene, manualIndex],
  );

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
}

export function useScene() {
  const ctx = useContext(SceneContext);

  if (!ctx) throw new Error("useScene must be used inside SceneProvider");

  return ctx;
}
