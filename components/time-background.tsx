"use client";

import { useEffect, useState } from "react";

import { useScene } from "@/components/scene-provider";
import { bgLqip, bgSrc, bgSrcSet } from "@/config/background-map";

type Layer = { key: string; id: number };

let layerId = 0;

export function TimeBackground() {
  const { index, scene } = useScene();
  const [layers, setLayers] = useState<Layer[]>([]);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (index < 0) return;
    setLayers((prev) => {
      if (prev.length && prev[prev.length - 1].key === scene.key) return prev;

      // Keep the previous layer underneath while the new one fades in
      return [...prev.slice(-1), { key: scene.key, id: ++layerId }];
    });
  }, [index, scene.key]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0b0d17]"
    >
      {layers.map((layer, i) => {
        const isTop = i === layers.length - 1;

        return (
          <div key={layer.id} className="absolute inset-0">
            {isTop && !loaded[layer.id] && (
              <div
                className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
                style={{ backgroundImage: `url(${bgLqip(layer.key)})` }}
              />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="bg-drift absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out"
              decoding="async"
              {...{ fetchpriority: isTop ? "high" : "low" }}
              sizes="100vw"
              src={bgSrc(layer.key, 1280)}
              srcSet={bgSrcSet(layer.key)}
              style={{ opacity: loaded[layer.id] ? 1 : 0 }}
              onLoad={() => setLoaded((s) => ({ ...s, [layer.id]: true }))}
            />
          </div>
        );
      })}

      {/* Legibility veil, tuned per theme in globals.css */}
      <div className="veil absolute inset-0" />
    </div>
  );
}
