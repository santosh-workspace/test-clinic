/**
 * The two brand themes, both derived from the hospital logo.
 *
 * `id` is written to `<html data-theme>`; the default theme has no attribute,
 * so its palette is simply the one declared on `:root` in globals.css.
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
    tagline: "Warm · soft · airy",
    description:
      "Warm ivory ground with the logo's own cornflower iris blue and pillow rose. Generous corners, diffuse shadows. Reads gentle and family-facing.",
    swatches: ["#fcfaf6", "#7fb2e8", "#2a6ab2", "#ee93b2", "#0e1723"],
  },
  {
    id: "porcelain",
    attr: "porcelain",
    name: "Porcelain & Midnight",
    tagline: "Cool · crisp · deep",
    description:
      "Cool porcelain ground, the primary dropped to the deep navy of the logo's outer ring, and a hotter rose accent. Tighter corners, crisper shadows. Reads clinical and premium.",
    swatches: ["#f4f7fa", "#5286bd", "#14365e", "#e4517f", "#060d16"],
  },
];

export const getTheme = (id: ThemeId) => themes.find((t) => t.id === id)!;
