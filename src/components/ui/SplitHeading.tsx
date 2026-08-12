"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";
import { viewport, wordChild, wordParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Segment = { text: string; accent?: boolean };

/**
 * Word-by-word headline reveal.
 *
 * Each word sits in an overflow-hidden mask and slides up from below. The full
 * string is exposed to assistive tech via aria-label while the animated words
 * are hidden, so a screen reader hears one clean sentence rather than a
 * stuttered word list.
 */
export function SplitHeading({
  segments,
  as: Tag = "h2",
  className,
  accentClassName = "font-display italic text-gradient",
  delay = 0,
}: {
  segments: Segment[];
  as?: ElementType;
  className?: string;
  accentClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const label = segments.map((s) => s.text).join(" ");

  if (reduced) {
    return (
      <Tag className={className}>
        {segments.map((seg, i) => (
          <span key={i} className={seg.accent ? accentClassName : undefined}>
            {seg.text}
            {i < segments.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={label}>
      <motion.span
        data-reveal
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={wordParent}
        transition={{ delayChildren: delay }}
        className="inline"
      >
        {segments.map((seg, si) =>
          seg.text.split(" ").map((word, wi) => (
            <span
              key={`${si}-${wi}`}
              className="inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span
                variants={wordChild}
                className={cn(
                  "inline-block will-change-transform",
                  seg.accent && accentClassName,
                )}
              >
                {word}
              </motion.span>
              <span className="inline-block">&nbsp;</span>
            </span>
          )),
        )}
      </motion.span>
    </Tag>
  );
}
