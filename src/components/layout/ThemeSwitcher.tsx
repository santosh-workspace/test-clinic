"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck, FiDroplet, FiX } from "react-icons/fi";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type ThemeId,
  themes,
} from "@/config/themes";
import { cn } from "@/lib/utils";

/**
 * Theme picker.
 *
 * This is a review tool — it exists so the two brand directions can be compared
 * on the real site rather than in a mockup. Once a theme is chosen, set
 * DEFAULT_THEME in src/config/themes.ts and delete this component from the
 * layout; nothing else depends on it.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Mirror whatever ThemeScript already applied to <html>.
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    const found = themes.find((t) => t.attr === attr);
    if (found && found.id !== DEFAULT_THEME) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(found.id);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  const apply = useCallback((id: ThemeId) => {
    const theme = themes.find((t) => t.id === id)!;
    if (theme.attr) document.documentElement.setAttribute("data-theme", theme.attr);
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setActive(id);
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-3 max-lg:bottom-27"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-[var(--radius-xl2)] border border-ink-200 bg-white shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-5 py-3.5">
              <div>
                <p className="text-[0.86rem] font-bold tracking-tight text-ink-950">
                  Choose a theme
                </p>
                <p className="text-[0.72rem] text-ink-500">
                  Both built from the hospital logo
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close theme picker"
                className="grid size-8 place-items-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:text-ink-950"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <ul className="p-2.5">
              {themes.map((theme) => {
                const isActive = active === theme.id;
                return (
                  <li key={theme.id}>
                    <button
                      type="button"
                      onClick={() => apply(theme.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "group flex w-full items-start gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-300",
                        isActive
                          ? "border-brand-300 bg-brand-50"
                          : "border-transparent hover:bg-ink-50",
                      )}
                    >
                      {/* Palette preview */}
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex shrink-0 overflow-hidden rounded-lg border border-ink-200/70"
                      >
                        {theme.swatches.map((c) => (
                          <span
                            key={c}
                            style={{ background: c }}
                            className="size-5"
                          />
                        ))}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[0.88rem] font-bold tracking-tight text-ink-950">
                            {theme.name}
                          </span>
                          {isActive && (
                            <FiCheck
                              aria-hidden="true"
                              className="shrink-0 text-brand-600"
                            />
                          )}
                        </span>
                        <span className="mt-0.5 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
                          {theme.tagline}
                        </span>
                        <span className="mt-1.5 block text-[0.78rem] leading-relaxed text-ink-600">
                          {theme.description}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Choose a theme"
        className="flex h-12 items-center gap-2.5 rounded-full border border-ink-200 bg-white px-4 text-[0.85rem] font-semibold text-ink-800 shadow-[var(--shadow-lift)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
      >
        <FiDroplet aria-hidden="true" className="text-brand-600" />
        <span className="max-sm:hidden">Theme</span>
        <span
          aria-hidden="true"
          className="flex overflow-hidden rounded-full border border-ink-200/70"
        >
          {themes
            .find((t) => t.id === active)!
            .swatches.slice(1, 4)
            .map((c) => (
              <span key={c} style={{ background: c }} className="size-3.5" />
            ))}
        </span>
      </button>
    </div>
  );
}
