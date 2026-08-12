"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Route transition. A short fade-and-rise on the incoming page, keyed on
 * pathname.
 *
 * Intentionally *not* an AnimatePresence exit transition: holding the outgoing
 * page on screen while the next one loads delays LCP on every navigation. A
 * fast enter-only animation gives the same sense of continuity for free.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Still a <main> — the skip link and landmark navigation depend on it.
  if (reduced) return <main id="main">{children}</main>;

  return (
    <motion.main
      key={pathname}
      id="main"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}
