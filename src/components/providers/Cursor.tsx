"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Custom desktop cursor: a small dot with a trailing ring that scales up over
 * interactive elements.
 *
 * Mounted only when the device has a fine pointer AND the user has not asked
 * for reduced motion. On anything else the component renders nothing and the
 * native cursor is untouched — replacing the system cursor on a touch device
 * or for a motion-sensitive user is a straight accessibility regression.
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
    if (!enabled) {
      document.body.removeAttribute("data-cursor");
      return;
    }
    document.body.setAttribute("data-cursor", "on");

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
      document.body.removeAttribute("data-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.span
        style={{ x, y }}
        animate={{ opacity: hidden ? 0 : 1, scale: active ? 0 : 1 }}
        transition={{ duration: 0.18 }}
        className="absolute -ml-[3px] -mt-[3px] block size-1.5 rounded-full bg-brand-600"
      />
      <motion.span
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: hidden ? 0 : active ? 1 : 0.5,
          scale: active ? 1.7 : 1,
        }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -ml-4 -mt-4 block size-8 rounded-full border border-brand-500/70 bg-brand-500/5 backdrop-blur-[1px]"
      />
    </div>
  );
}
