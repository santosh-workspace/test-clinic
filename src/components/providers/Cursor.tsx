"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Desktop cursor accent: a soft ring that trails the pointer and scales up over
 * anything interactive.
 *
 * The *native* cursor stays visible — this is layered around it, not instead of
 * it. Hiding the system pointer costs more than it gains: it breaks the arrow /
 * hand / text-caret affordances people rely on to tell what a thing does, and
 * it is disorienting for anyone using pointer-accuracy assistance.
 *
 * Mounted only for fine pointers, and never under prefers-reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnabled(fine.matches && !reduced.matches);
    decide();
    fine.addEventListener("change", decide);
    reduced.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduced.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, [role='button'], input, textarea, select")));
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      {/* Ring only. A dot at the pointer tip would sit under the native arrow
          and read as a glitch, so the trailing ring carries the whole effect. */}
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: hidden ? 0 : active ? 0.9 : 0.4,
          scale: active ? 1.9 : 1,
        }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -ml-5 -mt-5 block size-10 rounded-full border border-brand-500/70 bg-brand-500/5 backdrop-blur-[1px]"
      />
    </div>
  );
}
