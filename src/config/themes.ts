/**
 * The two brand themes, both derived from the hospital logo.
 *
 * `id` is written to `<html data-theme>`; the default theme has no attribute,
 * so its palette is simply the one declared on `:root` in globals.css. The
 * dark theme keeps the internal id/attr "porcelain" from an earlier palette
 * iteration — renaming it would mean touching the stored localStorage value,
 * the `?theme=` query param and every reference to it for no visible benefit,
 * since only `name`/`description`/`swatches` below are ever shown to anyone.
 *
 * The swatches are the ones shown in the theme switcher — keep them in step
 * with the ramps in globals.css.
 */

export type ThemeId = "ivory" | "porcelain";

export const THEME_STORAGE_KEY = "yh-theme";
export const DEFAULT_THEME: ThemeId = "ivory";

export type Theme = {
  id: ThemeId;
  /** Value for <html data-theme>. Null means "use the :root default". */
  attr: string | null;
  name: string;
  tagline: string;
  description: string;
  swatches: string[];
};

export const themes: Theme[] = [
  {
    id: "ivory",
    attr: null,
    name: "Ivory & Iris",
    tagline: "Light · warm · airy",
    description:
      "The white theme. Warm ivory ground with the logo's own cornflower iris blue and pillow rose. Generous corners, diffuse shadows. Reads gentle and family-facing.",
    swatches: ["#fcfaf6", "#7fb2e8", "#2a6ab2", "#ee93b2", "#0e1723"],
  },
  {
    id: "porcelain",
    attr: "porcelain",
    name: "Midnight",
    tagline: "Dark · crisp · premium",
    description:
      "The dark theme. Near-black canvas, elevated dark-navy cards, near-white text — a genuine dark mode, not just a cooler light palette. Square corners and contained shadows. Reads clinical and premium.",
    swatches: ["#060c14", "#0f1a26", "#6fa1cf", "#ef94b4", "#eef3f8"],
  },
];

export const getTheme = (id: ThemeId) => themes.find((t) => t.id === id)!;
