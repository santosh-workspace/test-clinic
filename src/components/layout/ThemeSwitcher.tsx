"use client";

import { useCallback, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type ThemeId,
  getTheme,
  themes,
} from "@/config/themes";

const other = (id: ThemeId): ThemeId =>
  themes.find((t) => t.id !== id)!.id;

/**
 * Theme toggle.
 *
 * A single button that flips between the site's two themes — no picker, no
 * panel. Shows the icon for the theme a click would switch *to* (sun while
 * dark is active, moon while light is active), which is the common
 * convention and reads unambiguously at a glance.
 */
export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);

  /**
   * Re-assert the stored theme after hydration, and mirror it into local state.
   *
   * ThemeScript sets the attribute before paint and <html> carries
   * suppressHydrationWarning so React leaves it alone — but re-applying here is
   * a cheap safety net: if anything ever does reconcile the attribute away, the
   * theme survives instead of silently snapping back to the default.
   */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      /* private mode */
    }
    const attr = document.documentElement.getAttribute("data-theme");
    const found =
      themes.find((t) => t.id === stored) ?? themes.find((t) => t.attr === attr);
    if (!found) return;

    if (found.attr) document.documentElement.setAttribute("data-theme", found.attr);
    else document.documentElement.removeAttribute("data-theme");

    if (found.id !== DEFAULT_THEME) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(found.id);
    }
  }, []);

  const toggle = useCallback(() => {
    setActive((current) => {
      const next = other(current);
      const theme = getTheme(next);
      if (theme.attr) document.documentElement.setAttribute("data-theme", theme.attr);
      else document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* private mode — the choice just won't persist */
      }
      return next;
    });
  }, []);

  const next = getTheme(other(active));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next.name} theme`}
      title={`Switch to ${next.name} theme`}
      /* z-45: above page content and the sticky header (z-40), but below the
         mobile menu (z-71) and the booking dialog (z-95) so it never floats
         on top of them. */
      className="fixed bottom-5 right-4 z-[45] grid size-12 place-items-center rounded-full border border-edge bg-surface-2 text-fg shadow-[var(--shadow-lift)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 max-lg:bottom-27"
    >
      {active === "porcelain" ? (
        <FiSun aria-hidden="true" className="text-[1.15rem]" />
      ) : (
        <FiMoon aria-hidden="true" className="text-[1.15rem]" />
      )}
    </button>
  );
}
