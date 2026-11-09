"use client";

import { useEffect, useState } from "react";

import {
  BackgroundKey,
  backgroundLqip,
  backgroundSrc,
  getBackgroundKey,
} from "@/config/background-map";

type Layer = { key: BackgroundKey; id: number };

export function TimeBackground() {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let id = 0;
    const apply = () => {
      const key = getBackgroundKey(new Date().getHours());

      setLayers((prev) => {
        if (prev.length && prev[prev.length - 1].key === key) return prev;

        // Keep the previous layer underneath while the new one fades in
        return [...prev.slice(-1), { key, id: ++id }];
      });
    };

    apply();
    const t = window.setInterval(apply, 60_000);

    return () => window.clearInterval(t);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#0b0d17]">
      {layers.map((layer) => (
        <div key={layer.id} className="absolute inset-0">
          {/* Tiny blurred placeholder shows instantly */}
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url(${backgroundLqip(layer.key)})` }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="bg-drift absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-out"
            decoding="async"
            src={backgroundSrc(layer.key)}
            style={{ opacity: loaded[layer.id] ? 1 : 0 }}
            onLoad={() => setLoaded((s) => ({ ...s, [layer.id]: true }))}
          />
        </div>
      ))}

      {/* Legibility veil: keeps white text readable on bright daytime frames */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
      <div className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_0%,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
