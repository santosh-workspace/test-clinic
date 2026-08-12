import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language.
 *
 * One easing curve and three durations across the whole site — that
 * consistency is most of what separates "animated" from "designed".
 * Everything animates transform + opacity only, so it stays on the compositor.
 */

type Cubic = [number, number, number, number];

export const EASE: Cubic = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: Cubic = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

/** Viewport config used by every scroll reveal — fires slightly before entry. */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition },
};

/** Blur-to-focus — used for hero imagery and pull quotes. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(14px)", scale: 1.03 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

/** Clip-path wipe from the bottom — for image reveals. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Per-word headline reveal. Pair with `wordChild`. */
export const wordParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};

export const wordChild: Variants = {
  hidden: { y: "108%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: EASE },
  },
};

/** Card hover — subtle lift, never a bounce. */
export const cardHover = {
  y: -6,
  transition: { duration: DURATION.fast, ease: EASE_SMOOTH },
} as const;

export const variantMap = {
  up: fadeUp,
  down: fadeDown,
  left: fadeLeft,
  right: fadeRight,
  in: fadeIn,
  scale: scaleIn,
  blur: blurIn,
  clip: clipReveal,
} as const;

export type RevealVariant = keyof typeof variantMap;
