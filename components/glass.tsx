"use client";

import type { ElementType, PointerEvent, ReactNode } from "react";

import clsx from "clsx";
import { useCallback } from "react";

type GlassProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  strong?: boolean;
  interactive?: boolean;
  [key: string]: unknown;
};

export function Glass({
  as: Tag = "div",
  children,
  className,
  strong = false,
  interactive = false,
  ...rest
}: GlassProps) {
  const onMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();

    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--glow", "1");
  }, []);

  const onLeave = useCallback((e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--glow", "0");
  }, []);

  return (
    <Tag
      className={clsx(
        "glass",
        strong && "glass-strong",
        interactive && "glass-interactive",
        className,
      )}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}
