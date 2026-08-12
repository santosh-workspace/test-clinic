"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer-tracking card: a few degrees of tilt plus a cursor-following glow.
 *
 * The tilt is deliberately restrained (max ~6°) — anything more reads as a
 * gimmick on a medical site. Disabled entirely for coarse pointers and for
 * anyone who has asked for reduced motion.
 */
export function TiltCard({
  children,
  className,
  glow = "rgb(42 111 240 / 0.14)",
  intensity = 6,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const op = useMotionValue(0);

  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });
  const sop = useSpring(op, { stiffness: 160, damping: 26 });

  const background = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, ${glow}, transparent 70%)`;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry.set((px - 0.5) * intensity * 2);
      rx.set((0.5 - py) * intensity * 2);
      gx.set(px * 100);
      gy.set(py * 100);
      op.set(1);
    },
    [reduced, intensity, rx, ry, gx, gy, op],
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    op.set(0);
  }, [rx, ry, op]);

  if (reduced) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={cn("relative gpu", className)}
    >
      <motion.span
        aria-hidden="true"
        style={{ background, opacity: sop }}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
      />
      {children}
    </motion.div>
  );
}
