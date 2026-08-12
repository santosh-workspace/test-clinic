import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/config/themes";

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
 */
export function ThemeScript() {
  const js = `
(function(){
  try {
    var t = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (t && t !== ${JSON.stringify(DEFAULT_THEME)}) {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
  document.documentElement.setAttribute('data-theme-ready','');
})();`.trim();

  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
