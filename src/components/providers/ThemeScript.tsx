import { DEFAULT_THEME, THEME_STORAGE_KEY, themes } from "@/config/themes";

/**
 * Applies the stored theme before first paint.
 *
 * This has to be a blocking inline script in <head>, not an effect: the page is
 * statically prerendered with the default palette, so anything that runs after
 * hydration would show one theme and then snap to the other. Setting the
 * attribute here means the very first paint is already correct.
 *
 * `data-theme-ready` is stamped afterwards so the colour transition in
 * globals.css only applies to *later* theme changes, never to this initial one.
 *
 * A `?theme=<id>` query parameter overrides the stored value, which makes each
 * theme shareable as a plain link during review. Only ids declared in
 * config/themes.ts are accepted, so the attribute can never be set from
 * arbitrary user input.
 */
export function ThemeScript() {
  const allowed = JSON.stringify(themes.map((t) => t.id));

  const js = `
(function(){
  var ALLOWED = ${allowed};
  var KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
  var DEFAULT = ${JSON.stringify(DEFAULT_THEME)};
  var pick = null;
  try {
    // ?theme=<id> wins, so a theme can be shared as a plain link for review.
    // It is also persisted, so navigating onward keeps the chosen theme.
    var q = new URLSearchParams(location.search).get('theme');
    if (q && ALLOWED.indexOf(q) !== -1) {
      pick = q;
      localStorage.setItem(KEY, q);
    } else {
      var stored = localStorage.getItem(KEY);
      if (stored && ALLOWED.indexOf(stored) !== -1) pick = stored;
    }
  } catch (e) {}
  if (pick && pick !== DEFAULT) {
    document.documentElement.setAttribute('data-theme', pick);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  document.documentElement.setAttribute('data-theme-ready','');
})();`.trim();

  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
