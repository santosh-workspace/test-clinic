"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";

/**
 * Branded first-paint overlay.
 *
 * Deliberately constrained:
 *  - Shows once per browser session (sessionStorage), never on internal navigation.
 *  - Skipped entirely under prefers-reduced-motion.
 *  - The real page renders underneath immediately — this only covers it — so it
 *    delays perceived load, not actual load.
 *  - Capped at ~1.1s, then lifts as a curtain.
 *
 * A loader that gates content behind a spinner would cost more in LCP than the
 * branding is worth; this one is a veil, not a gate.
 */
const KEY = "yh-intro-shown";

export function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(KEY)) return;

    // Reading sessionStorage and matchMedia has to happen after mount — they
    // do not exist during SSR, and deciding at render time would desync
    // hydration. This runs once, on mount, and never re-runs.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 1150);

    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoLockup priority className="w-52 md:w-60" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 font-display text-xl tracking-tight text-ink-900"
          >
            {siteConfig.name}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="mt-2 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-ink-400"
          >
            {siteConfig.tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
