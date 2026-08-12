"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress bar, pinned under the header.
 * Purely decorative — hidden from assistive tech.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-linear-to-r from-brand-600 via-brand-500 to-teal-400"
    />
  );
}
