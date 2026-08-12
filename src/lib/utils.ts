/** Tiny class-name joiner. Avoids pulling in clsx for a one-liner. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Splits a headline into words that can each be animated independently. */
export function toWords(text: string) {
  return text.split(" ").filter(Boolean);
}
